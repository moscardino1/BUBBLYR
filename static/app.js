const state = {
  guest: "Guest",
  coords: null,
  category: "All",
  bubbles: [],
  activeBubbleId: null,
  selectedBubbleId: null,
  map: null,
  userMarker: null,
  userCircle: null,
  markers: new Map(),
  refreshTimer: null,
};

const els = {
  guestName: document.querySelector("#guestName"),
  enableLocation: document.querySelector("#enableLocation"),
  demoLocation: document.querySelector("#demoLocation"),
  seedDemo: document.querySelector("#seedDemo"),
  recenterMap: document.querySelector("#recenterMap"),
  locationGate: document.querySelector("#locationGate"),
  createButton: document.querySelector("#createButton"),
  createDialog: document.querySelector("#createDialog"),
  closeCreate: document.querySelector("#closeCreate"),
  createForm: document.querySelector("#createForm"),
  categoryInput: document.querySelector("#categoryInput"),
  titleInput: document.querySelector("#titleInput"),
  descriptionInput: document.querySelector("#descriptionInput"),
  radiusInput: document.querySelector("#radiusInput"),
  radiusValue: document.querySelector("#radiusValue"),
  bubbleList: document.querySelector("#bubbleList"),
  pulseTitle: document.querySelector("#pulseTitle"),
  pulseText: document.querySelector("#pulseText"),
  filters: document.querySelector("#filters"),
  chatDialog: document.querySelector("#chatDialog"),
  closeChat: document.querySelector("#closeChat"),
  chatTitle: document.querySelector("#chatTitle"),
  chatMeta: document.querySelector("#chatMeta"),
  chatMessages: document.querySelector("#chatMessages"),
  messageForm: document.querySelector("#messageForm"),
  messageInput: document.querySelector("#messageInput"),
  bubbleUp: document.querySelector("#bubbleUp"),
  bubbleDown: document.querySelector("#bubbleDown"),
  bubbleScore: document.querySelector("#bubbleScore"),
  toast: document.querySelector("#toast"),
};

init();

async function init() {
  initMap();
  bindEvents();

  const session = await api("/api/session");
  state.guest = session.guest;
  els.guestName.textContent = session.guest;
}

function initMap() {
  state.map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
  }).setView([45.4642, 9.19], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(state.map);
}

function bindEvents() {
  els.enableLocation.addEventListener("click", requestLocation);
  els.demoLocation.addEventListener("click", () => {
    setLocation({ lat: 37.7764, lng: -122.3948 }, "Demo location set near SF Caltrain.");
  });
  els.seedDemo.addEventListener("click", seedDemoBubbles);
  els.recenterMap.addEventListener("click", () => {
    if (!state.coords) {
      toast("Pick a location first.");
      return;
    }
    state.map.setView([state.coords.lat, state.coords.lng], 15);
  });
  els.createButton.addEventListener("click", () => {
    if (!state.coords) {
      toast("Turn on location first. The pitch requires proximity.");
      return;
    }
    els.createDialog.showModal();
    els.titleInput.focus();
  });
  els.closeCreate.addEventListener("click", () => els.createDialog.close());
  els.radiusInput.addEventListener("input", () => {
    els.radiusValue.textContent = els.radiusInput.value;
  });
  els.createForm.addEventListener("submit", createBubble);
  els.filters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    refreshBubbles();
  });
  els.closeChat.addEventListener("click", closeChat);
  els.messageForm.addEventListener("submit", sendMessage);
  els.bubbleUp.addEventListener("click", () => voteBubble("up"));
  els.bubbleDown.addEventListener("click", () => voteBubble("down"));
}

function requestLocation() {
  if (!navigator.geolocation) {
    toast("This browser has no location support.");
    return;
  }

  navigator.geolocation.watchPosition(
    (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    () => toast("Location permission was blocked. Respectable boundary, terrible demo."),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
  );
}

function setLocation(coords, message) {
  state.coords = coords;
  els.locationGate.style.display = "none";
  updateUserMarker();
  refreshBubbles();
  if (!state.refreshTimer) {
    state.refreshTimer = setInterval(refreshBubbles, 4000);
  }
  if (message) toast(message);
}

function updateUserMarker() {
  const latLng = [state.coords.lat, state.coords.lng];
  if (!state.userMarker) {
    state.userMarker = L.circleMarker(latLng, {
      radius: 8,
      color: "#ffffff",
      weight: 3,
      fillColor: "#0f766e",
      fillOpacity: 1,
    }).addTo(state.map);
    state.userCircle = L.circle(latLng, {
      radius: 1000,
      color: "#0f766e",
      fillColor: "#0f766e",
      fillOpacity: 0.06,
      weight: 1,
    }).addTo(state.map);
    state.map.setView(latLng, 15);
  } else {
    state.userMarker.setLatLng(latLng);
    state.userCircle.setLatLng(latLng);
  }
}

async function refreshBubbles() {
  if (!state.coords) return;
  try {
    const url = `/api/bubbles?lat=${state.coords.lat}&lng=${state.coords.lng}&category=${state.category}`;
    const data = await api(url);
    state.bubbles = data.bubbles;
    renderBubbles();
    renderMarkers();
    renderPulse();
    if (state.activeBubbleId) {
      refreshChat(state.activeBubbleId, false);
    }
  } catch (error) {
    toast(error.message);
  }
}

function renderPulse() {
  const count = state.bubbles.length;
  const messages = state.bubbles.reduce((total, bubble) => total + bubble.message_count, 0);
  if (!state.coords) {
    els.pulseTitle.textContent = "Waiting for location";
    return;
  }
  if (!count) {
    els.pulseTitle.textContent = "No alpha detected";
    els.pulseText.textContent = "The neighborhood is either peaceful or under-instrumented. Start with one useful question.";
    return;
  }
  const top = state.bubbles[0];
  els.pulseTitle.textContent = `${count} live bubble${count === 1 ? "" : "s"}`;
  els.pulseText.textContent = `${messages} anonymous datapoint${messages === 1 ? "" : "s"}. Closest chaos: ${top.title}`;
}

function renderBubbles() {
  if (!state.bubbles.length) {
    els.bubbleList.innerHTML = `
      <div class="empty">
        <strong>No bubbles here yet.</strong>
        <span>Classic cold-start problem. Create one, or seed demo bubbles to test the full loop.</span>
        <button type="button" data-create-empty>Start a bubble</button>
      </div>
    `;
    els.bubbleList.querySelector("[data-create-empty]").addEventListener("click", () => els.createButton.click());
    return;
  }

  els.bubbleList.innerHTML = state.bubbles
    .map((bubble) => {
      const category = window.PROXMUNITY_CATEGORIES[bubble.category];
      return `
        <article class="bubble-card ${state.selectedBubbleId === bubble.id ? "selected" : ""}">
          <button class="bubble-main" type="button" data-open-bubble="${bubble.id}">
            <div class="bubble-row">
              <span class="badge" style="background:${category.color}">${escapeHtml(category.label)}</span>
              <span class="metrics">${formatDistance(bubble.distance_meters)}</span>
            </div>
            <div class="bubble-title">${escapeHtml(bubble.title)}</div>
            <p class="bubble-text">${escapeHtml(bubble.description || bubble.latest_message || "Fresh local signal, pre-consensus")}</p>
            <div class="metrics">
              <span>${bubble.message_count} signals</span>
              <span>${bubble.score} votes</span>
              <span>${bubble.radius_meters}m radius</span>
            </div>
          </button>
          <div class="card-actions">
            <button type="button" data-focus-bubble="${bubble.id}">Show on map</button>
            <button type="button" data-open-bubble="${bubble.id}">Open chat</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.bubbleList.querySelectorAll("[data-open-bubble]").forEach((button) => {
    button.addEventListener("click", () => openChat(button.dataset.openBubble));
  });
  els.bubbleList.querySelectorAll("[data-focus-bubble]").forEach((button) => {
    button.addEventListener("click", () => focusBubble(button.dataset.focusBubble));
  });
}

function renderMarkers() {
  const ids = new Set(state.bubbles.map((bubble) => bubble.id));
  for (const [id, marker] of state.markers.entries()) {
    if (!ids.has(id)) {
      marker.remove();
      state.markers.delete(id);
    }
  }

  state.bubbles.forEach((bubble) => {
    const category = window.PROXMUNITY_CATEGORIES[bubble.category];
    const isSelected = state.selectedBubbleId === bubble.id;
    if (state.markers.has(bubble.id)) {
      const marker = state.markers.get(bubble.id);
      marker.setLatLng([bubble.lat, bubble.lng]);
      marker.setStyle(markerStyle(category.color, bubble.message_count, isSelected));
      marker.bindTooltip(bubble.title, { direction: "top", offset: [0, -8] });
      return;
    }

    const marker = L.circleMarker(
      [bubble.lat, bubble.lng],
      markerStyle(category.color, bubble.message_count, isSelected),
    ).addTo(state.map);
    marker.bindTooltip(bubble.title, { direction: "top", offset: [0, -8] });
    marker.on("click", () => focusBubble(bubble.id, true));
    marker.on("dblclick", () => openChat(bubble.id));
    state.markers.set(bubble.id, marker);
  });
}

function markerStyle(color, messageCount, selected) {
  return {
    radius: selected ? 18 : Math.max(8, Math.min(22, 8 + messageCount)),
    color: selected ? "#15120d" : "#ffffff",
    weight: selected ? 5 : 3,
    fillColor: color,
    fillOpacity: selected ? 1 : 0.88,
  };
}

function focusBubble(id, fromMap = false) {
  const bubble = state.bubbles.find((item) => item.id === id);
  if (!bubble) return;
  state.selectedBubbleId = id;
  state.map.setView([bubble.lat, bubble.lng], Math.max(state.map.getZoom(), 16));
  const marker = state.markers.get(id);
  if (marker) {
    marker.openTooltip();
  }
  renderBubbles();
  renderMarkers();
  if (fromMap) {
    toast("Bubble selected. Double-click the marker or use Open chat.");
  }
}

async function createBubble(event) {
  event.preventDefault();
  const payload = {
    title: els.titleInput.value,
    description: els.descriptionInput.value,
    category: els.categoryInput.value,
    radius_meters: Number(els.radiusInput.value),
    lat: state.coords.lat,
    lng: state.coords.lng,
  };

  const data = await api("/api/bubbles", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  els.createForm.reset();
  els.radiusInput.value = 600;
  els.radiusValue.textContent = "600";
  els.createDialog.close();
  await refreshBubbles();
  openChat(data.bubble.id);
}

async function seedDemoBubbles() {
  if (!state.coords) {
    toast("Pick a location first.");
    return;
  }

  const samples = [
    {
      title: "Why is the station frozen?",
      description: "People are waiting, no clear announcement yet.",
      category: "Transit",
      lat: state.coords.lat + 0.001,
      lng: state.coords.lng + 0.001,
      radius_meters: 900,
    },
    {
      title: "Smoke near the corner?",
      description: "Looks like it is coming from two blocks east.",
      category: "Safety",
      lat: state.coords.lat - 0.0009,
      lng: state.coords.lng + 0.0007,
      radius_meters: 700,
    },
    {
      title: "Huge queue outside",
      description: "Trying to figure out whether this is an event or just lunch.",
      category: "Crowd",
      lat: state.coords.lat + 0.0004,
      lng: state.coords.lng - 0.0011,
      radius_meters: 500,
    },
  ];

  try {
    for (const sample of samples) {
      await api("/api/bubbles", {
        method: "POST",
        body: JSON.stringify(sample),
      });
    }
    await refreshBubbles();
    toast("Demo bubbles seeded nearby.");
  } catch (error) {
    toast(error.message);
  }
}

async function openChat(id) {
  state.activeBubbleId = id;
  state.selectedBubbleId = id;
  await refreshChat(id, true);
  renderBubbles();
  renderMarkers();
  els.chatDialog.showModal();
}

function closeChat() {
  state.activeBubbleId = null;
  els.chatDialog.close();
}

async function refreshChat(id, scroll) {
  if (!state.coords) return;
  let data;
  try {
    data = await api(`/api/bubbles/${id}?lat=${state.coords.lat}&lng=${state.coords.lng}`);
  } catch (error) {
    if (state.activeBubbleId === id) closeChat();
    state.activeBubbleId = null;
    state.selectedBubbleId = null;
    toast("That bubble expired or disappeared.");
    refreshBubbles();
    return;
  }
  const bubble = data.bubble;
  els.chatTitle.textContent = bubble.title;
  els.chatMeta.textContent = `${bubble.category} · ${formatDistance(bubble.distance_meters)} · ${bubble.can_post ? "in the arena" : "read-only tourist"}`;
  els.bubbleScore.textContent = bubble.score;
  els.messageInput.disabled = !bubble.can_post;
  els.messageInput.placeholder = bubble.can_post ? "What do your human eyes report?" : "Move closer to participate";

  els.chatMessages.innerHTML = `
    <div class="empty">${escapeHtml(bubble.description || "No context yet. The MVP remains brave.")}</div>
    ${bubble.messages.map(renderMessage).join("")}
  `;

  els.chatMessages.querySelectorAll("[data-message-vote]").forEach((button) => {
    button.addEventListener("click", () => voteMessage(button.dataset.messageVote, button.dataset.value));
  });
  els.chatMessages.querySelectorAll("[data-report]").forEach((button) => {
    button.addEventListener("click", () => reportMessage(button.dataset.report));
  });

  if (scroll) {
    els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
  }
}

function renderMessage(message) {
  return `
    <div class="message ${message.is_mine ? "mine" : ""}">
      <div class="message-meta">
        <span>${escapeHtml(message.author)} · ${formatTime(message.created_at)}</span>
        <span>${message.score} votes</span>
      </div>
      <div class="message-body">${escapeHtml(message.text)}</div>
      <div class="message-actions">
        <button type="button" data-message-vote="${message.id}" data-value="up">Signal</button>
        <button type="button" data-message-vote="${message.id}" data-value="down">Noise</button>
        ${message.is_mine ? "" : `<button type="button" data-report="${message.id}">Report</button>`}
      </div>
    </div>
  `;
}

async function sendMessage(event) {
  event.preventDefault();
  if (!els.messageInput.value.trim() || !state.activeBubbleId) return;

  try {
    await api(`/api/bubbles/${state.activeBubbleId}/messages`, {
      method: "POST",
      body: JSON.stringify({
        text: els.messageInput.value,
        lat: state.coords.lat,
        lng: state.coords.lng,
      }),
    });
    els.messageInput.value = "";
    await refreshChat(state.activeBubbleId, true);
    await refreshBubbles();
  } catch (error) {
    toast(error.message);
  }
}

async function voteBubble(value) {
  if (!state.activeBubbleId) return;
  const data = await api(`/api/bubbles/${state.activeBubbleId}/vote`, {
    method: "POST",
    body: JSON.stringify({ value }),
  });
  els.bubbleScore.textContent = data.score;
  refreshBubbles();
}

async function voteMessage(id, value) {
  await api(`/api/messages/${id}/vote`, {
    method: "POST",
    body: JSON.stringify({ value }),
  });
  refreshChat(state.activeBubbleId, false);
}

async function reportMessage(id) {
  await api(`/api/messages/${id}/report`, { method: "POST" });
  toast("Report received.");
  refreshChat(state.activeBubbleId, false);
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.setTimeout(() => els.toast.classList.remove("visible"), 2400);
}

function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

function formatTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
