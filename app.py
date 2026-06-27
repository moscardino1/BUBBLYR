from __future__ import annotations

import math
import os
import secrets
import time
from pathlib import Path

from flask import Flask, jsonify, render_template, request, session
from sqlalchemy import (
    Column,
    Float,
    Integer,
    MetaData,
    String,
    Table,
    Text,
    and_,
    create_engine,
    delete,
    func,
    insert,
    select,
    update,
)
from sqlalchemy.engine import Engine


BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "bubblyr.db"

BUBBLE_TTL_SECONDS = 24 * 60 * 60
MAX_DISCOVERY_METERS = 5000
SESSION_COOKIE_MAX_AGE = 8 * 60 * 60

CATEGORIES = {
    "Transit": {
        "label": "Transit",
        "label_it": "Trasporti",
        "prompt": "Trains, buses, traffic, airport, road closures",
        "prompt_it": "Treni, bus, traffico, aeroporto, strade chiuse",
        "color": "#f59e0b",
    },
    "Safety": {
        "label": "Safety",
        "label_it": "Sicurezza",
        "prompt": "Accidents, fire, police, medical help, unsafe areas",
        "prompt_it": "Incidenti, incendi, polizia, soccorsi, zone poco sicure",
        "color": "#ef4444",
    },
    "Weather": {
        "label": "Weather",
        "label_it": "Meteo",
        "prompt": "Earthquake, storm, smoke, flood, unusual weather",
        "prompt_it": "Terremoti, temporali, fumo, allagamenti, meteo insolito",
        "color": "#14b8a6",
    },
    "Utilities": {
        "label": "Utilities",
        "label_it": "Servizi",
        "prompt": "Power, water, internet, buildings, public services",
        "prompt_it": "Luce, acqua, internet, edifici, servizi pubblici",
        "color": "#6366f1",
    },
    "Crowds": {
        "label": "Crowds",
        "label_it": "Folla",
        "prompt": "Queues, events, protests, noise, unusual gatherings",
        "prompt_it": "Code, eventi, proteste, rumore, assembramenti insoliti",
        "color": "#a855f7",
    },
    "General": {
        "label": "General",
        "label_it": "Generale",
        "prompt": "Anything nearby people should understand quickly",
        "prompt_it": "Qualsiasi cosa vicina che le persone dovrebbero capire subito",
        "color": "#2563eb",
    },
}

ADJECTIVES = [
    "Seed",
    "Stealth",
    "Viral",
    "Runway",
    "Pivoted",
    "Ambient",
    "Fractional",
    "Tokenized",
    "Preseed",
    "Postmoat",
]
NOUNS = [
    "Founder",
    "Angel",
    "Syndicate",
    "Deck",
    "Moat",
    "Pilot",
    "Signal",
    "Memo",
    "Vibe",
    "Thesis",
]

metadata = MetaData()

bubbles = Table(
    "bubbles",
    metadata,
    Column("id", String(32), primary_key=True),
    Column("title", String(80), nullable=False),
    Column("description", String(220), nullable=False, default=""),
    Column("category", String(32), nullable=False),
    Column("lat", Float, nullable=False),
    Column("lng", Float, nullable=False),
    Column("radius_meters", Integer, nullable=False),
    Column("creator_token", String(128), nullable=False),
    Column("created_at", Integer, nullable=False),
    Column("last_active", Integer, nullable=False),
)

messages = Table(
    "messages",
    metadata,
    Column("id", String(32), primary_key=True),
    Column("bubble_id", String(32), nullable=False),
    Column("author_token", String(128), nullable=False),
    Column("author_name", String(80), nullable=False),
    Column("text", String(400), nullable=False),
    Column("created_at", Integer, nullable=False),
    Column("report_count", Integer, nullable=False, default=0),
)

votes = Table(
    "votes",
    metadata,
    Column("target_type", String(16), primary_key=True),
    Column("target_id", String(32), primary_key=True),
    Column("voter_token", String(128), primary_key=True),
    Column("value", Integer, nullable=False),
    Column("created_at", Integer, nullable=False),
)


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.update(
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev-change-me-for-production"),
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Lax",
        PERMANENT_SESSION_LIFETIME=SESSION_COOKIE_MAX_AGE,
    )
    app.engine = create_database_engine()
    metadata.create_all(app.engine)

    @app.before_request
    def before_request() -> None:
        ensure_guest()
        cleanup_expired(app.engine)

    @app.get("/")
    def index():
        return render_template("index.html", categories=CATEGORIES)

    @app.get("/healthz")
    def healthz():
        return jsonify({"ok": True, "service": "bubblyr"})

    @app.get("/api/session")
    def api_session():
        return jsonify(
            {
                "guest": session["guest_name"],
                "categories": CATEGORIES,
                "privacy": [
                    "No account or profile.",
                    "Anonymous guest identity rotates with the browser session.",
                    "Bubbles expire after 24 hours of inactivity.",
                    "Coordinates shown publicly are slightly blurred.",
                ],
            }
        )

    @app.get("/api/bubbles")
    def list_bubbles():
        lat = parse_float(request.args.get("lat"))
        lng = parse_float(request.args.get("lng"))
        north = parse_float(request.args.get("north"))
        south = parse_float(request.args.get("south"))
        east = parse_float(request.args.get("east"))
        west = parse_float(request.args.get("west"))
        category = request.args.get("category", "All")
        has_viewer_location = lat is not None and lng is not None
        has_bounds = all(value is not None for value in (north, south, east, west))

        with app.engine.begin() as conn:
            rows = conn.execute(select(bubbles).order_by(bubbles.c.last_active.desc())).mappings().all()
            payload = []
            for row in rows:
                if category != "All" and row["category"] != category:
                    continue
                if has_bounds and not is_in_bounds(row["lat"], row["lng"], north, south, east, west):
                    continue
                if has_viewer_location:
                    distance = haversine_meters(lat, lng, row["lat"], row["lng"])
                    if not has_bounds and distance > MAX_DISCOVERY_METERS:
                        continue
                    payload.append(serialize_bubble(conn, row, lat, lng, include_preview=True))
                elif has_bounds:
                    payload.append(serialize_bubble(conn, row, None, None, include_preview=True))

        payload.sort(key=lambda item: (item["distance_meters"] is None, item["distance_meters"] or 0, -item["score"]))
        return jsonify({"bubbles": payload})

    @app.post("/api/bubbles")
    def create_bubble():
        payload = request.get_json(silent=True) or {}
        title = clean_text(payload.get("title"), 80)
        description = clean_text(payload.get("description"), 220)
        category = payload.get("category") if payload.get("category") in CATEGORIES else "General"
        radius = parse_int(payload.get("radius_meters"), 100, 2000, default=600)
        lat = parse_float(payload.get("lat"))
        lng = parse_float(payload.get("lng"))

        if not title:
            return jsonify({"error": "Add a short question or title."}), 400
        if lat is None or lng is None:
            return jsonify({"error": "Location is required to create a local bubble."}), 400

        now = int(time.time())
        bubble_id = secrets.token_urlsafe(10)
        with app.engine.begin() as conn:
            conn.execute(
                insert(bubbles).values(
                    id=bubble_id,
                    title=title,
                    description=description,
                    category=category,
                    lat=lat,
                    lng=lng,
                    radius_meters=radius,
                    creator_token=session["guest_token"],
                    created_at=now,
                    last_active=now,
                )
            )
            bubble = get_bubble_payload(conn, bubble_id, lat, lng)
        return jsonify({"bubble": bubble}), 201

    @app.get("/api/bubbles/<bubble_id>")
    def get_bubble(bubble_id: str):
        lat = parse_float(request.args.get("lat"))
        lng = parse_float(request.args.get("lng"))

        with app.engine.begin() as conn:
            payload = get_bubble_payload(conn, bubble_id, lat, lng)
        if payload is None:
            return jsonify({"error": "Bubble not found."}), 404
        return jsonify({"bubble": payload})

    @app.post("/api/bubbles/<bubble_id>/messages")
    def add_message(bubble_id: str):
        payload = request.get_json(silent=True) or {}
        lat = parse_float(payload.get("lat"))
        lng = parse_float(payload.get("lng"))
        text = clean_text(payload.get("text"), 400)

        if not text:
            return jsonify({"error": "Write a message first."}), 400
        if looks_like_spam(text):
            return jsonify({"error": "That looks like spam. Try writing it normally."}), 400
        if lat is None or lng is None:
            return jsonify({"error": "Location is required to speak here."}), 400

        with app.engine.begin() as conn:
            bubble = conn.execute(select(bubbles).where(bubbles.c.id == bubble_id)).mappings().first()
            if bubble is None:
                return jsonify({"error": "Bubble not found."}), 404

            distance = haversine_meters(lat, lng, bubble["lat"], bubble["lng"])
            is_creator = bubble["creator_token"] == session["guest_token"]
            if not is_creator and distance > bubble["radius_meters"] + 75:
                return jsonify({"error": "You are outside this bubble."}), 403

            last = (
                conn.execute(
                    select(messages.c.text, messages.c.created_at)
                    .where(messages.c.author_token == session["guest_token"])
                    .order_by(messages.c.created_at.desc())
                    .limit(1)
                )
                .mappings()
                .first()
            )
            now = int(time.time())
            if last and now - last["created_at"] < 2:
                return jsonify({"error": "Slow mode: wait a moment."}), 429
            if last and last["text"].strip().lower() == text.strip().lower():
                return jsonify({"error": "Duplicate message blocked."}), 400

            conn.execute(
                insert(messages).values(
                    id=secrets.token_urlsafe(10),
                    bubble_id=bubble_id,
                    author_token=session["guest_token"],
                    author_name=session["guest_name"],
                    text=text,
                    created_at=now,
                    report_count=0,
                )
            )
            conn.execute(update(bubbles).where(bubbles.c.id == bubble_id).values(last_active=now))
            bubble_payload = get_bubble_payload(conn, bubble_id, lat, lng)
        return jsonify({"bubble": bubble_payload}), 201

    @app.post("/api/bubbles/<bubble_id>/vote")
    def vote_bubble(bubble_id: str):
        payload = request.get_json(silent=True) or {}
        value = 1 if payload.get("value") == "up" else -1
        with app.engine.begin() as conn:
            score = save_vote(conn, "bubble", bubble_id, value)
        return jsonify({"ok": True, "score": score})

    @app.post("/api/messages/<message_id>/vote")
    def vote_message(message_id: str):
        payload = request.get_json(silent=True) or {}
        value = 1 if payload.get("value") == "up" else -1
        with app.engine.begin() as conn:
            score = save_vote(conn, "message", message_id, value)
        return jsonify({"ok": True, "score": score})

    @app.post("/api/messages/<message_id>/report")
    def report_message(message_id: str):
        with app.engine.begin() as conn:
            conn.execute(
                update(messages)
                .where(messages.c.id == message_id)
                .values(report_count=messages.c.report_count + 1)
            )
            conn.execute(delete(messages).where(and_(messages.c.id == message_id, messages.c.report_count >= 3)))
        return jsonify({"ok": True})

    return app


def create_database_engine() -> Engine:
    database_url = os.environ.get("DATABASE_URL")
    if database_url:
        if database_url.startswith("postgres://"):
            database_url = database_url.replace("postgres://", "postgresql+psycopg://", 1)
        elif database_url.startswith("postgresql://"):
            database_url = database_url.replace("postgresql://", "postgresql+psycopg://", 1)
        return create_engine(database_url, pool_pre_ping=True)

    DATA_DIR.mkdir(exist_ok=True)
    return create_engine(f"sqlite:///{DB_PATH}", connect_args={"check_same_thread": False})


def ensure_guest() -> None:
    session.permanent = True
    if "guest_token" not in session:
        session["guest_token"] = secrets.token_urlsafe(24)
    if "guest_name" not in session:
        session["guest_name"] = random_guest_name()


def cleanup_expired(engine: Engine) -> None:
    cutoff = int(time.time()) - BUBBLE_TTL_SECONDS
    with engine.begin() as conn:
        expired_bubble_ids = [
            row[0] for row in conn.execute(select(bubbles.c.id).where(bubbles.c.last_active < cutoff)).all()
        ]
        if not expired_bubble_ids:
            return
        conn.execute(delete(messages).where(messages.c.bubble_id.in_(expired_bubble_ids)))
        conn.execute(delete(votes).where(votes.c.target_id.in_(expired_bubble_ids)))
        conn.execute(delete(bubbles).where(bubbles.c.id.in_(expired_bubble_ids)))


def save_vote(conn, target_type: str, target_id: str, value: int) -> int:
    existing = conn.execute(
        select(votes).where(
            and_(
                votes.c.target_type == target_type,
                votes.c.target_id == target_id,
                votes.c.voter_token == session["guest_token"],
            )
        )
    ).first()
    if existing:
        conn.execute(
            update(votes)
            .where(
                and_(
                    votes.c.target_type == target_type,
                    votes.c.target_id == target_id,
                    votes.c.voter_token == session["guest_token"],
                )
            )
            .values(value=value, created_at=int(time.time()))
        )
    else:
        conn.execute(
            insert(votes).values(
                target_type=target_type,
                target_id=target_id,
                voter_token=session["guest_token"],
                value=value,
                created_at=int(time.time()),
            )
        )
    return vote_score(conn, target_type, target_id)


def get_bubble_payload(conn, bubble_id: str, lat: float | None, lng: float | None) -> dict | None:
    bubble = conn.execute(select(bubbles).where(bubbles.c.id == bubble_id)).mappings().first()
    if bubble is None:
        return None
    return serialize_bubble(conn, bubble, lat, lng, include_messages=True)


def serialize_bubble(
    conn,
    bubble,
    viewer_lat: float | None,
    viewer_lng: float | None,
    *,
    include_preview: bool = False,
    include_messages: bool = False,
) -> dict:
    message_rows = (
        conn.execute(select(messages).where(messages.c.bubble_id == bubble["id"]).order_by(messages.c.created_at.asc()))
        .mappings()
        .all()
    )
    has_viewer_location = viewer_lat is not None and viewer_lng is not None
    distance = (
        haversine_meters(viewer_lat, viewer_lng, bubble["lat"], bubble["lng"])
        if has_viewer_location
        else None
    )
    is_creator = bubble["creator_token"] == session["guest_token"]
    can_post = is_creator or bool(distance is not None and distance <= bubble["radius_meters"] + 75)
    payload = {
        "id": bubble["id"],
        "title": bubble["title"],
        "description": bubble["description"],
        "category": bubble["category"],
        "radius_meters": bubble["radius_meters"],
        "created_at": bubble["created_at"],
        "last_active": bubble["last_active"],
        "distance_meters": round(distance) if distance is not None else None,
        "can_post": can_post,
        "message_count": len(message_rows),
        "score": vote_score(conn, "bubble", bubble["id"]),
        "lat": blur_coord(bubble["lat"], 3),
        "lng": blur_coord(bubble["lng"], 3),
    }
    if include_preview and message_rows:
        payload["latest_message"] = message_rows[-1]["text"]
    if include_messages:
        payload["messages"] = [
            {
                "id": row["id"],
                "author": row["author_name"],
                "text": row["text"],
                "created_at": row["created_at"],
                "score": vote_score(conn, "message", row["id"]),
                "is_mine": row["author_token"] == session["guest_token"],
            }
            for row in message_rows
        ]
    return payload


def vote_score(conn, target_type: str, target_id: str) -> int:
    score = conn.execute(
        select(func.coalesce(func.sum(votes.c.value), 0)).where(
            and_(votes.c.target_type == target_type, votes.c.target_id == target_id)
        )
    ).scalar_one()
    return int(score or 0)


def is_in_bounds(lat: float, lng: float, north: float, south: float, east: float, west: float) -> bool:
    in_lat = south <= lat <= north
    if west <= east:
        in_lng = west <= lng <= east
    else:
        in_lng = lng >= west or lng <= east
    return in_lat and in_lng


def random_guest_name() -> str:
    adj = ADJECTIVES[secrets.randbelow(len(ADJECTIVES))]
    noun = NOUNS[secrets.randbelow(len(NOUNS))]
    number = secrets.randbelow(90) + 10
    return f"{adj} {noun} {number}"


def clean_text(value: object, limit: int) -> str:
    if not isinstance(value, str):
        return ""
    return " ".join(value.strip().split())[:limit]


def looks_like_spam(text: str) -> bool:
    lowered = text.lower()
    if len(text) > 12 and len(set(lowered.replace(" ", ""))) <= 3:
        return True
    for index in range(len(text) - 7):
        if len(set(text[index : index + 8])) == 1:
            return True
    return False


def parse_float(value: object) -> float | None:
    try:
        result = float(value)
    except (TypeError, ValueError):
        return None
    if not math.isfinite(result):
        return None
    return result


def parse_int(value: object, minimum: int, maximum: int, *, default: int) -> int:
    try:
        result = int(value)
    except (TypeError, ValueError):
        result = default
    return max(minimum, min(maximum, result))


def haversine_meters(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    earth_radius = 6371000
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lng2 - lng1)
    a = (
        math.sin(delta_phi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    )
    return earth_radius * (2 * math.atan2(math.sqrt(a), math.sqrt(1 - a)))


def blur_coord(value: float, decimals: int) -> float:
    return round(value, decimals)


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
