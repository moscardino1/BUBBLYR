# BUBBLYR

Anonymous local bubbles for answering one surprisingly hard civic question:

> what is going on right here?

This is the Flask rebuild after a fictional 2028 VC buddy PM walked into the room, said "hyperlocal is back, but make it anonymous and board-deckable," and then left for a panel about AI-native sidewalks.

The roast is intentional. The code is still small.

## The 2028 PM Mandate

- Rename the vibe without renaming the database because velocity.
- Turn "nearby questions" into "local alpha."
- Make it feel like San Francisco invented asking a person next to you what happened.
- Keep it anonymous because even growth teams should occasionally experience restraint.
- Add voting so useful eyewitness info can beat confident nonsense.
- Keep Flask, SQLite, plain HTML, plain CSS, and plain JavaScript because the founder should understand the product before hiring a platform team.

## Product Idea

BUBBLYR is a local question layer. Someone near a place creates a temporary bubble with a practical question:

- Why is Caltrain doing performance art?
- Was that an earthquake or just another demo day?
- Where is the smoke coming from?
- Is this road closed, or did the city pivot to vibes?
- Why is there a huge queue and does it have TAM?

Other nearby people answer anonymously, vote useful information up or down, and report bad messages. Bubbles expire after 24 hours of inactivity.

## Privacy Stance

The prototype is anonymous first:

- No accounts.
- No profiles.
- No email or phone number.
- Anonymous guest name stored only in the browser session cookie.
- Public bubble coordinates are blurred before they are sent back to the browser.
- Bubbles and messages are deleted after 24 hours of inactivity.
- Posting is allowed only while physically near the bubble radius.

This is not production-grade anonymity yet. For production you would still need HTTPS, stricter rate limits, abuse controls, IP retention policy decisions, and a real privacy review from someone who does not say "data flywheel" before breakfast.

## Categories

The categories are now useful, but dressed like they just raised a chaotic seed round:

- `Transit` / Muni Meltdown: trains, buses, roads, airport, traffic
- `Safety` / Oh No: accident, fire, police, medical help, unsafe area
- `Earth` / Planet Bug: earthquake, storm, smoke, flood, unusual weather
- `Utilities` / Infra Oops: power, water, internet, buildings, public services
- `Crowd` / Crowd Alpha: queue, event, protest, noise, "what is happening here?"
- `General` / Unscoped Chaos: anything else nearby

## Run Locally

```bash
python3 -m venv venv
venv/bin/python -m pip install -r requirements.txt
venv/bin/python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

Browser geolocation usually works on `localhost` / `127.0.0.1`.

## File Map

- `app.py`: Flask app, SQLAlchemy tables, API routes, privacy/radius checks, VC-flavored category metadata.
- `templates/index.html`: single page HTML shell with the new BUBBLYR positioning.
- `static/app.js`: map, location, polling, forms, chat, voting, and the product roast copy.
- `static/styles.css`: responsive app styling with a warmer SF pitch-deck palette.
- `render.yaml`: one-click Render Blueprint for the web app and Postgres.
- `Procfile`: Heroku/Render-compatible process command.
- `data/bubblyr.db`: created automatically for local SQLite development only.

The old React/Vite prototype files were removed so deployment sees one app, not two competing realities.

## Deploy Recommendation

Use Render first.

Render is the better fit for this app because BUBBLYR is a real Flask web service with shared state, polling today, and likely WebSockets/Redis/Postgres tomorrow. Render's Flask docs use `pip install -r requirements.txt` and `gunicorn app:app`, and Render Blueprints can provision both the web service and a Postgres database from `render.yaml`.

Vercel can run Flask through Python Serverless Functions using WSGI, but that is a better fit for stateless endpoints. For a location chat app that will need shared state and possibly long-lived connections later, it adds architectural friction too early.

### Render Button Path

1. Push this repo to GitHub.
2. In Render, create a new Blueprint from the repo.
3. Render reads `render.yaml`, creates:
   - `bubblyr` web service
   - `bubblyr-db` Postgres database
   - generated `SECRET_KEY`
   - `DATABASE_URL` wired from Postgres
4. Every push to the linked branch deploys automatically.

For a tiny MVP, the current config is enough. When traffic grows, scale the Render web service plan/instances and then add Redis for rate limits and live presence.

## API Shape

- `GET /api/session`: returns anonymous guest name and category metadata.
- `GET /api/bubbles?lat=...&lng=...&category=All`: nearby bubbles.
- `POST /api/bubbles`: create a bubble at the current location.
- `GET /api/bubbles/<id>?lat=...&lng=...`: bubble detail and messages.
- `POST /api/bubbles/<id>/messages`: post if inside the radius.
- `POST /api/bubbles/<id>/vote`: vote a bubble up or down.
- `POST /api/messages/<id>/vote`: vote a message up or down.
- `POST /api/messages/<id>/report`: report abuse.

## Sensible Next Steps

## Usability Notes

The app now has a demo path because cold-start local apps are otherwise painfully empty:

- Use `Try SF demo spot` if browser geolocation is blocked or you want to test from your desk.
- Use `Seed demo bubbles` to create nearby sample conversations.
- Click `Show on map` to locate a bubble without opening chat.
- Click `Open chat` to enter the conversation.
- On the map, click a marker to select it, or double-click it to open chat.

These are prototype affordances. In production, `Seed demo bubbles` should become an onboarding/demo-only feature or disappear behind a development flag.

## Sensible Next Steps

1. Replace polling with Flask-SocketIO when the basic model feels clear.
2. Move from SQLite distance filtering to PostGIS or Redis GEO if usage grows.
3. Add stronger moderation: per-session rate limits, keyword filters, shadow hiding, admin review.
4. Rotate guest names more aggressively for sensitive categories.
5. Add verified external signals later: transit status APIs, earthquakes, weather alerts, fire department feeds.
6. Keep the satire in the copy, not in the privacy model.
