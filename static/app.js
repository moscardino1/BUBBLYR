const DEMO_SEEN_KEY = "bubblyr_demo_seen_v1";

const state = {
  guest: "Guest",
  coords: null,
  category: "All",
  bubbles: [],
  demoBubbles: [],
  demoMode: false,
  activeBubbleId: null,
  selectedBubbleId: null,
  map: null,
  userMarker: null,
  userCircle: null,
  radiusPreview: null,
  markers: new Map(),
  refreshTimer: null,
};

const els = {
  guestName: document.querySelector("#guestName"),
  openManifesto: document.querySelector("#openManifesto"),
  closeManifesto: document.querySelector("#closeManifesto"),
  manifestoDialog: document.querySelector("#manifestoDialog"),
  enableLocation: document.querySelector("#enableLocation"),
  demoLocation: document.querySelector("#demoLocation"),
  exitDemo: document.querySelector("#exitDemo"),
  recenterMap: document.querySelector("#recenterMap"),
  createFromPanel: document.querySelector("#createFromPanel"),
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
  radiusBadge: document.querySelector("#radiusBadge"),
  radiusBadgeValue: document.querySelector("#radiusBadgeValue"),
  bubbleList: document.querySelector("#bubbleList"),
  pulseTitle: document.querySelector("#pulseTitle"),
  pulseText: document.querySelector("#pulseText"),
  modeLabel: document.querySelector("#modeLabel"),
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
  hideDemoIfSeen();

  const session = await api("/api/session");
  state.guest = session.guest;
  els.guestName.textContent = session.guest;
  refreshBubbles();
}

function initMap() {
  state.map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
  }).setView([45.4642, 9.19], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(state.map);

  state.map.on("moveend zoomend", () => {
    refreshBubbles();
  });
}

function bindEvents() {
  els.openManifesto.addEventListener("click", () => els.manifestoDialog.showModal());
  els.closeManifesto.addEventListener("click", () => els.manifestoDialog.close());
  els.enableLocation.addEventListener("click", requestLocation);
  els.demoLocation.addEventListener("click", startDemoMode);
  els.exitDemo.addEventListener("click", exitDemoMode);
  els.recenterMap.addEventListener("click", () => {
    if (!state.coords) {
      toast("Share location to recenter on yourself.");
      return;
    }
    state.map.setView([state.coords.lat, state.coords.lng], 15);
  });
  els.createButton.addEventListener("click", openCreateDialog);
  els.createFromPanel.addEventListener("click", openCreateDialog);
  els.closeCreate.addEventListener("click", closeCreateDialog);
  els.createDialog.addEventListener("close", hideRadiusPreview);
  els.radiusInput.addEventListener("input", () => {
    els.radiusValue.textContent = els.radiusInput.value;
    els.radiusBadgeValue.textContent = els.radiusInput.value;
    updateRadiusPreview();
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

function openCreateDialog() {
    if (!state.coords) {
      toast("Share location before creating a bubble.");
      return;
    }
    els.createDialog.showModal();
    showRadiusPreview();
    els.titleInput.focus();
}

function hideDemoIfSeen() {
  if (localStorage.getItem(DEMO_SEEN_KEY)) {
    els.demoLocation.classList.add("hidden");
  }
}

function requestLocation() {
  localStorage.setItem(DEMO_SEEN_KEY, "1");
  els.demoLocation.classList.add("hidden");
  if (!navigator.geolocation) {
    toast("This browser has no location support.");
    return;
  }

  navigator.geolocation.watchPosition(
    (position) => {
      state.demoMode = false;
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    () => toast("Location permission was blocked."),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
  );
}

function startDemoMode() {
  localStorage.setItem(DEMO_SEEN_KEY, "1");
  state.demoMode = true;
  state.demoBubbles = buildDemoBubbles();
  els.exitDemo.classList.remove("hidden");
  els.demoLocation.classList.add("hidden");
  setLocation({ lat: 37.7764, lng: -122.3948 }, "Demo mode: no real data is being read or written.");
}

function exitDemoMode() {
  state.demoMode = false;
  state.demoBubbles = [];
  state.bubbles = [];
  state.activeBubbleId = null;
  state.selectedBubbleId = null;
  els.exitDemo.classList.add("hidden");
  clearMarkers();
  closeChat();
  els.locationGate.style.display = "flex";
  state.coords = null;
  renderBubbles();
  renderPulse();
}

function setLocation(coords, message) {
  state.coords = coords;
  els.locationGate.style.display = "none";
  updateUserMarker();
  refreshBubbles();
  if (!state.refreshTimer && !state.demoMode) {
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
    if (state.radiusPreview) {
      state.radiusPreview.setLatLng(latLng);
    }
    state.map.setView(latLng, Math.max(state.map.getZoom(), 15));
  }
}

function closeCreateDialog() {
  els.createDialog.close();
  hideRadiusPreview();
}

function showRadiusPreview() {
  if (!state.coords) return;
  const latLng = [state.coords.lat, state.coords.lng];
  if (!state.radiusPreview) {
    state.radiusPreview = L.circle(latLng, {
      radius: Number(els.radiusInput.value),
      color: "#0f766e",
      fillColor: "#0f766e",
      fillOpacity: 0.13,
      weight: 2,
      dashArray: "8 8",
      interactive: false,
    }).addTo(state.map);
  }
  els.radiusBadgeValue.textContent = els.radiusInput.value;
  els.radiusBadge.classList.remove("hidden");
  updateRadiusPreview();
}

function updateRadiusPreview() {
  if (!state.coords || !state.radiusPreview) return;
  state.radiusPreview
    .setLatLng([state.coords.lat, state.coords.lng])
    .setRadius(Number(els.radiusInput.value));
}

function hideRadiusPreview() {
  els.radiusBadge.classList.add("hidden");
  if (!state.radiusPreview) return;
  state.radiusPreview.remove();
  state.radiusPreview = null;
}

async function refreshBubbles() {
  try {
    if (state.demoMode) {
      state.bubbles = filterDemoBubbles();
    } else {
      const url = buildBubbleListUrl();
      const data = await api(url);
      state.bubbles = data.bubbles;
    }
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
  els.modeLabel.textContent = state.demoMode ? "Demo mode" : "Local pulse";

  if (!state.coords) {
    els.pulseTitle.textContent = count ? `${count} bubble${count === 1 ? "" : "s"} in view` : "Browse the map";
    els.pulseText.textContent = count
      ? `${messages} message${messages === 1 ? "" : "s"} in the current map window. Share location only if you want to post.`
      : "Pan or zoom the map to browse public bubbles. Share location only to create or reply.";
    return;
  }
  if (!count) {
    els.pulseTitle.textContent = state.demoMode ? "Demo is empty" : "No bubbles nearby";
    els.pulseText.textContent = state.demoMode
      ? "Demo data only exists in this browser tab."
      : "Start a useful local question people nearby can answer.";
    return;
  }
  const top = state.bubbles[0];
  els.pulseTitle.textContent = `${count} bubble${count === 1 ? "" : "s"} nearby`;
  els.pulseText.textContent = `${messages} message${messages === 1 ? "" : "s"}. Closest: ${top.title}`;
}

function renderBubbles() {
  if (!state.bubbles.length) {
    els.bubbleList.innerHTML = `
      <div class="empty">
        <strong>${state.demoMode ? "Demo has no bubbles here." : "No bubbles here yet."}</strong>
        <span>${state.demoMode ? "Exit demo to use the real app." : "Create one clear, useful question for people nearby."}</span>
        ${state.coords ? '<button type="button" data-create-empty>Start a bubble</button>' : ""}
      </div>
    `;
    const createButton = els.bubbleList.querySelector("[data-create-empty]");
    if (createButton) createButton.addEventListener("click", () => els.createButton.click());
    return;
  }

  els.bubbleList.innerHTML = state.bubbles
    .map((bubble) => {
      const category = window.BUBBLYR_CATEGORIES[bubble.category] || window.BUBBLYR_CATEGORIES.General;
      return `
        <article class="bubble-card ${state.selectedBubbleId === bubble.id ? "selected" : ""}">
          <button class="bubble-main" type="button" data-open-bubble="${bubble.id}">
            <div class="bubble-row">
              <span class="badge" style="background:${category.color}">${escapeHtml(category.label)}</span>
              <span class="metrics">${formatDistance(bubble.distance_meters)}</span>
            </div>
            <div class="bubble-title">${escapeHtml(bubble.title)}</div>
            <p class="bubble-text">${escapeHtml(bubble.description || bubble.latest_message || "Active local question")}</p>
            <div class="metrics">
              <span>${bubble.message_count} messages</span>
              <span>${bubble.score} votes</span>
              <span>${bubble.radius_meters}m radius</span>
              ${state.demoMode ? "<span>demo only</span>" : ""}
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
  for (const [id, entry] of state.markers.entries()) {
    if (!ids.has(id)) {
      entry.group.remove();
      state.markers.delete(id);
    }
  }

  state.bubbles.forEach((bubble) => {
    const category = window.BUBBLYR_CATEGORIES[bubble.category] || window.BUBBLYR_CATEGORIES.General;
    const isSelected = state.selectedBubbleId === bubble.id;
    if (state.markers.has(bubble.id)) {
      const entry = state.markers.get(bubble.id);
      entry.aura.setLatLng([bubble.lat, bubble.lng]);
      entry.aura.setRadius(bubble.radius_meters);
      entry.aura.setStyle(auraStyle(category.color, isSelected));
      entry.pip.setLatLng([bubble.lat, bubble.lng]);
      entry.pip.setStyle(markerStyle(category.color, bubble.message_count, isSelected));
      entry.pip.bindTooltip(bubble.title, { direction: "top", offset: [0, -8] });
      return;
    }

    const group = L.layerGroup().addTo(state.map);
    const aura = L.circle([bubble.lat, bubble.lng], {
      ...auraStyle(category.color, isSelected),
      radius: bubble.radius_meters,
    }).addTo(group);
    const pip = L.circleMarker(
      [bubble.lat, bubble.lng],
      markerStyle(category.color, bubble.message_count, isSelected),
    ).addTo(group);
    pip.bindTooltip(bubble.title, { direction: "top", offset: [0, -8] });
    aura.on("click", () => focusBubble(bubble.id, true));
    pip.on("click", () => focusBubble(bubble.id, true));
    pip.on("dblclick", () => openChat(bubble.id));
    state.markers.set(bubble.id, { group, aura, pip });
  });
}

function clearMarkers() {
  for (const entry of state.markers.values()) {
    entry.group.remove();
  }
  state.markers.clear();
}

function auraStyle(color, selected) {
  return {
    color,
    fillColor: color,
    fillOpacity: selected ? 0.16 : 0.08,
    opacity: selected ? 0.95 : 0.45,
    weight: selected ? 3 : 1,
    interactive: true,
  };
}

function markerStyle(color, messageCount, selected) {
  return {
    radius: selected ? 18 : Math.max(8, Math.min(20, 8 + messageCount)),
    color: selected ? "#101828" : "#ffffff",
    weight: selected ? 5 : 3,
    fillColor: color,
    fillOpacity: selected ? 1 : 0.9,
  };
}

function focusBubble(id, fromMap = false) {
  const bubble = state.bubbles.find((item) => item.id === id);
  if (!bubble) return;
  state.selectedBubbleId = id;
  state.map.setView([bubble.lat, bubble.lng], Math.max(state.map.getZoom(), 16));
  const entry = state.markers.get(id);
  if (entry) entry.pip.openTooltip();
  renderBubbles();
  renderMarkers();
  if (fromMap) toast("Bubble selected. Double-click marker or use Open chat.");
}

async function createBubble(event) {
  event.preventDefault();
  if (!state.coords) {
    toast("Share location before creating a bubble.");
    return;
  }
  const payload = {
    title: els.titleInput.value,
    description: els.descriptionInput.value,
    category: els.categoryInput.value,
    radius_meters: Number(els.radiusInput.value),
    lat: state.coords.lat,
    lng: state.coords.lng,
  };

  let bubble;
  if (state.demoMode) {
    bubble = createDemoBubble(payload);
  } else {
    const data = await api("/api/bubbles", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    bubble = data.bubble;
  }

  els.createForm.reset();
  els.radiusInput.value = 600;
  els.radiusValue.textContent = "600";
  closeCreateDialog();
  await refreshBubbles();
  openChat(bubble.id);
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
  if (els.chatDialog.open) els.chatDialog.close();
}

async function refreshChat(id, scroll) {
  let bubble;
  if (state.demoMode) {
    bubble = state.demoBubbles.find((item) => item.id === id);
  } else {
    try {
      const data = await api(buildBubbleDetailUrl(id));
      bubble = data.bubble;
    } catch (error) {
      state.activeBubbleId = null;
      state.selectedBubbleId = null;
      if (els.chatDialog.open) closeChat();
      toast("That bubble expired or disappeared.");
      refreshBubbles();
      return;
    }
  }
  if (!bubble) return;

  els.chatTitle.textContent = bubble.title;
  els.chatMeta.textContent = `${bubble.category} · ${formatDistance(bubble.distance_meters)} · ${bubble.can_post ? "in range" : "read only"}${state.demoMode ? " · demo" : ""}`;
  els.bubbleScore.textContent = bubble.score;
  els.messageInput.disabled = !bubble.can_post;
  els.messageInput.placeholder = state.coords
    ? bubble.can_post ? "What do you see?" : "Move closer to participate"
    : "Share location to participate";

  els.chatMessages.innerHTML = `
    <div class="empty">${escapeHtml(bubble.description || "No extra context yet.")}</div>
    ${bubble.messages.map(renderMessage).join("")}
  `;

  els.chatMessages.querySelectorAll("[data-message-vote]").forEach((button) => {
    button.addEventListener("click", () => voteMessage(button.dataset.messageVote, button.dataset.value));
  });
  els.chatMessages.querySelectorAll("[data-report]").forEach((button) => {
    button.addEventListener("click", () => reportMessage(button.dataset.report));
  });

  if (scroll) els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
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
        <button type="button" data-message-vote="${message.id}" data-value="up">Useful</button>
        <button type="button" data-message-vote="${message.id}" data-value="down">Noise</button>
        ${message.is_mine ? "" : `<button type="button" data-report="${message.id}">Report</button>`}
      </div>
    </div>
  `;
}

async function sendMessage(event) {
  event.preventDefault();
  if (!els.messageInput.value.trim() || !state.activeBubbleId) return;
  if (!state.demoMode && !state.coords) {
    toast("Share location to participate in a bubble.");
    return;
  }

  try {
    if (state.demoMode) {
      addDemoMessage(state.activeBubbleId, els.messageInput.value.trim());
    } else {
      await api(`/api/bubbles/${state.activeBubbleId}/messages`, {
        method: "POST",
        body: JSON.stringify({
          text: els.messageInput.value,
          lat: state.coords.lat,
          lng: state.coords.lng,
        }),
      });
    }
    els.messageInput.value = "";
    await refreshChat(state.activeBubbleId, true);
    await refreshBubbles();
  } catch (error) {
    toast(error.message);
  }
}

async function voteBubble(value) {
  if (!state.activeBubbleId) return;
  if (state.demoMode) {
    const bubble = state.demoBubbles.find((item) => item.id === state.activeBubbleId);
    if (bubble) bubble.score += value === "up" ? 1 : -1;
    els.bubbleScore.textContent = bubble ? bubble.score : "0";
    refreshBubbles();
    return;
  }
  const data = await api(`/api/bubbles/${state.activeBubbleId}/vote`, {
    method: "POST",
    body: JSON.stringify({ value }),
  });
  els.bubbleScore.textContent = data.score;
  refreshBubbles();
}

async function voteMessage(id, value) {
  if (state.demoMode) {
    const message = state.demoBubbles.flatMap((bubble) => bubble.messages).find((item) => item.id === id);
    if (message) message.score += value === "up" ? 1 : -1;
    refreshChat(state.activeBubbleId, false);
    return;
  }
  await api(`/api/messages/${id}/vote`, {
    method: "POST",
    body: JSON.stringify({ value }),
  });
  refreshChat(state.activeBubbleId, false);
}

async function reportMessage(id) {
  if (state.demoMode) {
    toast("Demo report received. Real database untouched.");
    return;
  }
  await api(`/api/messages/${id}/report`, { method: "POST" });
  toast("Report received.");
  refreshChat(state.activeBubbleId, false);
}

function buildDemoBubbles() {
  const now = Math.floor(Date.now() / 1000);
  return [
    makeDemoBubble({
      id: "demo-transit",
      title: "Why is the train stopped?",
      description: "Platform 4 is packed and there has been no announcement for ten minutes.",
      category: "Transit",
      lat: 37.7772,
      lng: -122.3938,
      radius_meters: 900,
      score: 7,
      messages: [
        ["Nearby Signal 18", "Conductor said signal issue near the next station.", 8],
        ["Quiet Beacon 42", "Southbound is moving slowly but still moving.", 5],
        ["Fresh Point 11", "Board just changed to 18 minute delay.", 4],
      ],
      now,
    }),
    makeDemoBubble({
      id: "demo-safety",
      title: "Smoke near 3rd street?",
      description: "Visible smoke two blocks east, unclear if fire or construction.",
      category: "Safety",
      lat: 37.7755,
      lng: -122.3951,
      radius_meters: 700,
      score: 4,
      messages: [
        ["Local Echo 07", "Fire truck just arrived, people are being moved back.", 6],
        ["Hidden Node 31", "Looks contained to one building entrance.", 3],
      ],
      now,
    }),
    makeDemoBubble({
      id: "demo-crowds",
      title: "Huge queue outside the venue",
      description: "Line wraps around the block. Trying to understand if doors opened.",
      category: "Crowds",
      lat: 37.7769,
      lng: -122.396,
      radius_meters: 500,
      score: 3,
      messages: [
        ["Bright Trace 22", "Staff said doors open in 20 minutes.", 4],
        ["Kind Voice 59", "Back of the line is now on Townsend.", 2],
      ],
      now,
    }),
  ];
}

function makeDemoBubble({ id, title, description, category, lat, lng, radius_meters, score, messages, now }) {
  return {
    id,
    title,
    description,
    category,
    lat,
    lng,
    radius_meters,
    created_at: now - 600,
    last_active: now - 60,
    distance_meters: 0,
    can_post: true,
    message_count: messages.length,
    score,
    messages: messages.map(([author, text, messageScore], index) => ({
      id: `${id}-message-${index}`,
      author,
      text,
      created_at: now - 420 + index * 120,
      score: messageScore,
      is_mine: false,
    })),
  };
}

function filterDemoBubbles() {
  const bounds = state.map.getBounds();
  return state.demoBubbles
    .filter((bubble) => state.category === "All" || bubble.category === state.category)
    .filter((bubble) => bounds.contains([bubble.lat, bubble.lng]))
    .map((bubble) => ({
      ...bubble,
      distance_meters: state.coords ? Math.round(distanceMeters(state.coords, bubble)) : null,
      can_post: state.coords ? distanceMeters(state.coords, bubble) <= bubble.radius_meters + 75 : false,
      message_count: bubble.messages.length,
    }))
    .sort((a, b) => (a.distance_meters ?? 0) - (b.distance_meters ?? 0));
}

function createDemoBubble(payload) {
  const now = Math.floor(Date.now() / 1000);
  const bubble = {
    id: `demo-created-${now}`,
    title: payload.title.trim(),
    description: payload.description.trim(),
    category: payload.category,
    lat: payload.lat,
    lng: payload.lng,
    radius_meters: payload.radius_meters,
    created_at: now,
    last_active: now,
    distance_meters: 0,
    can_post: true,
    message_count: 0,
    score: 0,
    messages: [],
  };
  state.demoBubbles.unshift(bubble);
  return bubble;
}

function addDemoMessage(id, text) {
  const bubble = state.demoBubbles.find((item) => item.id === id);
  if (!bubble) return;
  bubble.messages.push({
    id: `demo-message-${Date.now()}`,
    author: state.guest,
    text,
    created_at: Math.floor(Date.now() / 1000),
    score: 0,
    is_mine: true,
  });
  bubble.last_active = Math.floor(Date.now() / 1000);
  bubble.message_count = bubble.messages.length;
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

function buildBubbleListUrl() {
  const bounds = state.map.getBounds();
  const params = new URLSearchParams({
    category: state.category,
    north: bounds.getNorth(),
    south: bounds.getSouth(),
    east: bounds.getEast(),
    west: bounds.getWest(),
  });
  if (state.coords) {
    params.set("lat", state.coords.lat);
    params.set("lng", state.coords.lng);
  }
  return `/api/bubbles?${params.toString()}`;
}

function buildBubbleDetailUrl(id) {
  const params = new URLSearchParams();
  if (state.coords) {
    params.set("lat", state.coords.lat);
    params.set("lng", state.coords.lng);
  }
  const query = params.toString();
  return `/api/bubbles/${id}${query ? `?${query}` : ""}`;
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.setTimeout(() => els.toast.classList.remove("visible"), 2400);
}

function distanceMeters(a, b) {
  const earthRadius = 6371000;
  const p1 = (a.lat * Math.PI) / 180;
  const p2 = (b.lat * Math.PI) / 180;
  const dp = ((b.lat - a.lat) * Math.PI) / 180;
  const dl = ((b.lng - a.lng) * Math.PI) / 180;
  const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return earthRadius * (2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}

function formatDistance(meters) {
  if (meters === null || meters === undefined) return "in view";
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
