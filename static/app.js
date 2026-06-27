const DEMO_SEEN_KEY = "bubblyr_demo_seen_v1";
const LANGUAGE_KEY = "bubblyr_language_v1";

const I18N = {
  en: {
    "actions.createBubble": "Create bubble",
    "actions.exitDemo": "Exit demo",
    "actions.recenter": "Recenter",
    "brand.kicker": "Anonymous local awareness",
    "brand.subbrand": "local signal, anonymous first",
    "categories.all": "All",
    "chat.input": "What do you see?",
    "chat.inputMoveCloser": "Move closer to participate",
    "chat.inputShareLocation": "Share location to participate",
    "chat.inRange": "in range",
    "chat.noContext": "No extra context yet.",
    "chat.readOnly": "read only",
    "chat.send": "Send",
    "chat.title": "Local chat",
    "create.categoryLabel": "Category",
    "create.contextLabel": "Context",
    "create.contextPlaceholder": "Platform 4, no announcement yet",
    "create.helper": "Post one clear local question. Then move the pin if the event is not exactly where you are.",
    "create.kicker": "Create bubble",
    "create.panelAria": "Create bubble panel",
    "create.placeHelper": "Drag the \"Bubble here\" pin or tap the map. The circle shows who can reply.",
    "create.placeStep": "Place it on the map",
    "create.questionLabel": "Question people will see",
    "create.questionPlaceholder": "Why is the train stopped?",
    "create.radiusLabel": "Reply radius",
    "create.title": "Write what is happening",
    "create.writeStep": "Write the bubble",
    "distance.inView": "in view",
    "empty.create": "Start a bubble",
    "empty.demoBody": "Exit demo to use the real app.",
    "empty.demoTitle": "Demo has no bubbles here.",
    "empty.realBody": "Create one clear, useful question for people nearby.",
    "empty.realTitle": "No bubbles here yet.",
    "gate.body": "Browse public bubbles by moving the map. Share location only when you want to create or reply. The demo is isolated and never writes to the real database.",
    "gate.demo": "Preview demo",
    "gate.kicker": "Start here",
    "gate.share": "Share my location",
    "gate.title": "Find nearby bubbles",
    "ideas.accident": "Accident nearby?",
    "ideas.crowd": "Large crowd?",
    "ideas.earthquake": "Earthquake?",
    "ideas.fire": "Smoke or fire?",
    "ideas.train": "Train blocked?",
    "language.next": "IT",
    "manifesto.aiBody1": "The future idea is an AI news layer running in parallel: summarizing active bubbles, grouping related reports, highlighting uncertainty, and turning many anonymous local observations into a clear public brief.",
    "manifesto.aiBody2": "That layer is not in this free MVP yet. For now, BUBBLYR is the human signal layer: chat, proximity, voting, and ephemeral local context.",
    "manifesto.aiTitle": "AI comes later",
    "manifesto.kicker": "The BUBBLYR manifesto",
    "manifesto.lead": "BUBBLYR is an experiment in local, anonymous, real-time news: people on the ground create bubbles around what they see, ask what is happening, and compare signals with others nearby.",
    "manifesto.newBody": "A blocked train, a fire, an earthquake, a crowd, a power cut, a road closure. These are not abstract stories at first. They are local questions. BUBBLYR lets people create the event before a headline exists.",
    "manifesto.newTitle": "The new layer is participatory",
    "manifesto.oldBody": "News usually arrives after an event has already been filtered through platforms, feeds, institutions, incentives, and delay. But the first version of reality is often simpler: people standing near the thing, trying to understand it together.",
    "manifesto.oldTitle": "The old model is backwards",
    "manifesto.principle1": "Anonymous first, because reporting what you see should not require a personal brand.",
    "manifesto.principle2": "Local first, because proximity changes what you can know.",
    "manifesto.principle3": "Ephemeral by default, because not every local event deserves permanent storage.",
    "manifesto.principle4": "AI as editor, not witness: humans create the signal; machines may later summarize it.",
    "manifesto.principlesTitle": "Principles",
    "manifesto.title": "News should start where reality happens.",
    "map.aria": "Nearby map",
    "metrics.activeQuestion": "Active local question",
    "metrics.demoOnly": "demo only",
    "metrics.messages": "{count} message{plural}",
    "metrics.radius": "{radius}m radius",
    "metrics.votes": "{count} votes",
    "nav.manifesto": "Manifesto",
    "pulse.browse": "Browse the map",
    "pulse.closest": "{count} bubble{plural} nearby",
    "pulse.defaultText": "Create or join a bubble to understand what is happening nearby.",
    "pulse.demoEmpty": "Demo is empty",
    "pulse.demoEmptyText": "Demo data only exists in this browser tab.",
    "pulse.inView": "{count} bubble{plural} in view",
    "pulse.mode": "Local pulse",
    "pulse.modeDemo": "Demo mode",
    "pulse.nearbyText": "{count} message{plural}. Closest: {title}",
    "pulse.noBubbles": "No bubbles nearby",
    "pulse.noBubblesText": "Start a useful local question people nearby can answer.",
    "pulse.noLocationText": "{count} message{plural} in the current map window. Share location only if you want to post.",
    "pulse.panText": "Pan or zoom the map to browse public bubbles. Share location only to create or reply.",
    "toast.bubbleExpired": "That bubble expired or disappeared.",
    "toast.bubblePinMoved": "Bubble pin moved.",
    "toast.bubbleSelected": "Bubble selected. Double-click marker or use Open chat.",
    "toast.demoReport": "Demo report received. Real database untouched.",
    "toast.demoStarted": "Demo mode: no real data is being read or written.",
    "toast.dragPin": "Drag the bubble pin or click the map to choose the event spot.",
    "toast.locationBlocked": "Location permission was blocked.",
    "toast.locationUnsupported": "This browser has no location support.",
    "toast.recenterNeedsLocation": "Share location to recenter on yourself.",
    "toast.reportReceived": "Report received.",
    "toast.shareCreate": "Share location before creating a bubble.",
    "toast.shareReply": "Share location to participate in a bubble.",
    "actions.showMap": "Show on map",
    "actions.openChat": "Open chat",
    "message.noise": "Noise",
    "message.report": "Report",
    "message.useful": "Useful",
  },
  it: {
    "actions.createBubble": "Crea bubble",
    "actions.exitDemo": "Esci dalla demo",
    "actions.recenter": "Ricentra",
    "brand.kicker": "Consapevolezza locale anonima",
    "brand.subbrand": "segnale locale, anonimo prima di tutto",
    "categories.all": "Tutto",
    "chat.input": "Cosa vedi?",
    "chat.inputMoveCloser": "Avvicinati per partecipare",
    "chat.inputShareLocation": "Condividi la posizione per partecipare",
    "chat.inRange": "nel raggio",
    "chat.noContext": "Nessun contesto aggiuntivo.",
    "chat.readOnly": "solo lettura",
    "chat.send": "Invia",
    "chat.title": "Chat locale",
    "create.categoryLabel": "Categoria",
    "create.contextLabel": "Contesto",
    "create.contextPlaceholder": "Binario 4, nessun annuncio per ora",
    "create.helper": "Pubblica una domanda locale chiara. Poi sposta il pin se l'evento non e' esattamente dove sei tu.",
    "create.kicker": "Crea bubble",
    "create.panelAria": "Pannello per creare una bubble",
    "create.placeHelper": "Trascina il pin \"Bubble here\" o tocca la mappa. Il cerchio mostra chi puo' rispondere.",
    "create.placeStep": "Posizionala sulla mappa",
    "create.questionLabel": "Domanda che vedranno le persone",
    "create.questionPlaceholder": "Perche' il treno e' fermo?",
    "create.radiusLabel": "Raggio risposte",
    "create.title": "Scrivi cosa sta succedendo",
    "create.writeStep": "Scrivi la bubble",
    "distance.inView": "nella vista",
    "empty.create": "Avvia una bubble",
    "empty.demoBody": "Esci dalla demo per usare l'app reale.",
    "empty.demoTitle": "Qui la demo non ha bubble.",
    "empty.realBody": "Crea una domanda chiara e utile per chi e' vicino.",
    "empty.realTitle": "Qui non ci sono ancora bubble.",
    "gate.body": "Esplora le bubble pubbliche muovendo la mappa. Condividi la posizione solo quando vuoi creare o rispondere. La demo e' isolata e non scrive mai nel database reale.",
    "gate.demo": "Prova demo",
    "gate.kicker": "Inizia qui",
    "gate.share": "Condividi posizione",
    "gate.title": "Trova bubble vicine",
    "ideas.accident": "Incidente vicino?",
    "ideas.crowd": "Grande folla?",
    "ideas.earthquake": "Terremoto?",
    "ideas.fire": "Fumo o incendio?",
    "ideas.train": "Treno bloccato?",
    "language.next": "EN",
    "manifesto.aiBody1": "L'idea futura e' un livello di news AI in parallelo: riassumere bubble attive, raggruppare segnalazioni collegate, evidenziare l'incertezza e trasformare tante osservazioni locali anonime in un brief pubblico chiaro.",
    "manifesto.aiBody2": "Quel livello non e' ancora in questo MVP gratuito. Per ora BUBBLYR e' il livello del segnale umano: chat, prossimita', voto e contesto locale effimero.",
    "manifesto.aiTitle": "L'AI arriva dopo",
    "manifesto.kicker": "Il manifesto BUBBLYR",
    "manifesto.lead": "BUBBLYR e' un esperimento di news locali, anonime e in tempo reale: le persone sul posto creano bubble intorno a cio' che vedono, chiedono cosa sta succedendo e confrontano segnali con chi e' vicino.",
    "manifesto.newBody": "Un treno bloccato, un incendio, un terremoto, una folla, un blackout, una strada chiusa. All'inizio non sono storie astratte: sono domande locali. BUBBLYR permette alle persone di creare l'evento prima che esista un titolo.",
    "manifesto.newTitle": "Il nuovo livello e' partecipativo",
    "manifesto.oldBody": "Di solito le news arrivano dopo essere passate attraverso piattaforme, feed, istituzioni, incentivi e ritardi. Ma la prima versione della realta' e' spesso piu' semplice: persone vicine alla cosa che cercano di capirla insieme.",
    "manifesto.oldTitle": "Il vecchio modello e' al contrario",
    "manifesto.principle1": "Anonimo prima di tutto, perche' raccontare cio' che vedi non dovrebbe richiedere un personal brand.",
    "manifesto.principle2": "Locale prima di tutto, perche' la prossimita' cambia cio' che puoi sapere.",
    "manifesto.principle3": "Effimero di default, perche' non ogni evento locale merita memoria permanente.",
    "manifesto.principle4": "AI come editor, non testimone: gli umani creano il segnale; le macchine potranno riassumerlo.",
    "manifesto.principlesTitle": "Principi",
    "manifesto.title": "Le news dovrebbero iniziare dove succede la realta'.",
    "map.aria": "Mappa vicina",
    "metrics.activeQuestion": "Domanda locale attiva",
    "metrics.demoOnly": "solo demo",
    "metrics.messages": "{count} messagg{plural}",
    "metrics.radius": "raggio {radius}m",
    "metrics.votes": "{count} voti",
    "nav.manifesto": "Manifesto",
    "pulse.browse": "Esplora la mappa",
    "pulse.closest": "{count} bubble vicine",
    "pulse.defaultText": "Crea o entra in una bubble per capire cosa succede vicino.",
    "pulse.demoEmpty": "La demo e' vuota",
    "pulse.demoEmptyText": "I dati demo esistono solo in questa scheda.",
    "pulse.inView": "{count} bubble nella vista",
    "pulse.mode": "Pulse locale",
    "pulse.modeDemo": "Modalita' demo",
    "pulse.nearbyText": "{count} messagg{plural}. Piu' vicina: {title}",
    "pulse.noBubbles": "Nessuna bubble vicina",
    "pulse.noBubblesText": "Avvia una domanda locale utile a cui chi e' vicino puo' rispondere.",
    "pulse.noLocationText": "{count} messagg{plural} nella finestra della mappa. Condividi la posizione solo se vuoi postare.",
    "pulse.panText": "Muovi o zooma la mappa per esplorare bubble pubbliche. Condividi la posizione solo per creare o rispondere.",
    "toast.bubbleExpired": "Questa bubble e' scaduta o sparita.",
    "toast.bubblePinMoved": "Pin della bubble spostato.",
    "toast.bubbleSelected": "Bubble selezionata. Doppio clic sul marker oppure usa Apri chat.",
    "toast.demoReport": "Segnalazione demo ricevuta. Database reale intatto.",
    "toast.demoStarted": "Modalita' demo: nessun dato reale viene letto o scritto.",
    "toast.dragPin": "Trascina il pin della bubble o clicca la mappa per scegliere il punto dell'evento.",
    "toast.locationBlocked": "Permesso posizione bloccato.",
    "toast.locationUnsupported": "Questo browser non supporta la posizione.",
    "toast.recenterNeedsLocation": "Condividi la posizione per ricentrare su di te.",
    "toast.reportReceived": "Segnalazione ricevuta.",
    "toast.shareCreate": "Condividi la posizione prima di creare una bubble.",
    "toast.shareReply": "Condividi la posizione per partecipare a una bubble.",
    "actions.showMap": "Mostra sulla mappa",
    "actions.openChat": "Apri chat",
    "message.noise": "Rumore",
    "message.report": "Segnala",
    "message.useful": "Utile",
  },
};

const state = {
  guest: "Guest",
  lang: localStorage.getItem(LANGUAGE_KEY) === "it" ? "it" : "en",
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
  createPin: null,
  createCoords: null,
  markers: new Map(),
  refreshTimer: null,
};

const els = {
  guestName: document.querySelector("#guestName"),
  languageToggle: document.querySelector("#languageToggle"),
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
  applyTranslations();
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
  els.languageToggle.addEventListener("click", toggleLanguage);
  els.openManifesto.addEventListener("click", () => els.manifestoDialog.showModal());
  els.closeManifesto.addEventListener("click", () => els.manifestoDialog.close());
  els.enableLocation.addEventListener("click", requestLocation);
  els.demoLocation.addEventListener("click", startDemoMode);
  els.exitDemo.addEventListener("click", exitDemoMode);
  els.recenterMap.addEventListener("click", () => {
    if (!state.coords) {
      toast(t("toast.recenterNeedsLocation"));
      return;
    }
    state.map.setView([state.coords.lat, state.coords.lng], 15);
  });
  els.createButton.addEventListener("click", openCreateDialog);
  els.createFromPanel.addEventListener("click", openCreateDialog);
  els.closeCreate.addEventListener("click", closeCreateDialog);
  els.radiusInput.addEventListener("input", () => {
    els.radiusValue.textContent = els.radiusInput.value;
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

function toggleLanguage() {
  state.lang = state.lang === "en" ? "it" : "en";
  localStorage.setItem(LANGUAGE_KEY, state.lang);
  applyTranslations();
  renderPulse();
  renderBubbles();
  if (state.activeBubbleId) refreshChat(state.activeBubbleId, false);
}

function applyTranslations() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  els.languageToggle.textContent = t("language.next");
  els.languageToggle.setAttribute("aria-label", state.lang === "en" ? "Passa all'italiano" : "Switch to English");
  renderCategoryControls();
  updateCreatePinLanguage();
}

function renderCategoryControls() {
  document.querySelectorAll("[data-category]").forEach((node) => {
    const key = node.dataset.category;
    if (key === "All") {
      node.textContent = t("categories.all");
      return;
    }
    const category = categoryMeta(key);
    node.textContent = categoryLabel(category);
  });
  Array.from(els.categoryInput.options).forEach((option) => {
    const category = categoryMeta(option.value);
    option.textContent = `${categoryLabel(category)} - ${categoryPrompt(category)}`;
  });
}

function t(key, params = {}) {
  let value = I18N[state.lang]?.[key] || I18N.en[key] || key;
  Object.entries(params).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}

function plural(count, singular = "", pluralSuffix = "s") {
  if (state.lang === "it" && singular === "" && pluralSuffix === "s") {
    return count === 1 ? "o" : "i";
  }
  return count === 1 ? singular : pluralSuffix;
}

function createPinIcon() {
  return L.divIcon({
    className: "create-pin",
    html: `<div class="create-pin-label">${escapeHtml(state.lang === "it" ? "Bubble qui" : "Bubble here")}</div><div class="create-pin-inner"></div>`,
    iconSize: [96, 62],
    iconAnchor: [48, 58],
  });
}

function updateCreatePinLanguage() {
  if (!state.createPin) return;
  state.createPin.setIcon(createPinIcon());
  state.createPin.getTooltip()?.setContent(state.lang === "it" ? "Trascinami o clicca la mappa" : "Drag me or click the map");
}

function openCreateDialog() {
  if (!state.coords) {
    toast(t("toast.shareCreate"));
    return;
  }
  els.createDialog.classList.remove("hidden");
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
    toast(t("toast.locationUnsupported"));
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
    () => toast(t("toast.locationBlocked")),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
  );
}

function startDemoMode() {
  localStorage.setItem(DEMO_SEEN_KEY, "1");
  state.demoMode = true;
  state.demoBubbles = buildDemoBubbles();
  els.exitDemo.classList.remove("hidden");
  els.demoLocation.classList.add("hidden");
  setLocation({ lat: 37.7764, lng: -122.3948 }, t("toast.demoStarted"));
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
    if (state.radiusPreview && !state.createCoords) {
      state.radiusPreview.setLatLng(latLng);
    }
    state.map.setView(latLng, Math.max(state.map.getZoom(), 15));
  }
}

function closeCreateDialog() {
  els.createDialog.classList.add("hidden");
  hideRadiusPreview();
}

function showRadiusPreview() {
  if (!state.coords) return;
  state.createCoords = { ...state.coords };
  const latLng = [state.createCoords.lat, state.createCoords.lng];
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
  if (!state.createPin) {
    state.createPin = L.marker(latLng, {
      draggable: true,
      icon: createPinIcon(),
    }).addTo(state.map);
    state.createPin.bindTooltip(state.lang === "it" ? "Trascinami o clicca la mappa" : "Drag me or click the map", {
      direction: "top",
      offset: [0, -44],
      permanent: false,
    });
    state.createPin.on("drag", () => {
      const pos = state.createPin.getLatLng();
      setCreateCoords(pos.lat, pos.lng);
    });
    state.createPin.on("dragend", () => toast(t("toast.bubblePinMoved")));
  }
  state.map.on("click", handleCreateMapClick);
  updateRadiusPreview();
  state.map.setView(latLng, Math.max(state.map.getZoom(), 16), { animate: true });
  toast(t("toast.dragPin"));
}

function updateRadiusPreview() {
  if (!state.createCoords || !state.radiusPreview) return;
  state.radiusPreview
    .setLatLng([state.createCoords.lat, state.createCoords.lng])
    .setRadius(Number(els.radiusInput.value));
  if (state.createPin) {
    state.createPin.setLatLng([state.createCoords.lat, state.createCoords.lng]);
  }
}

function hideRadiusPreview() {
  state.map.off("click", handleCreateMapClick);
  if (state.radiusPreview) {
    state.radiusPreview.remove();
    state.radiusPreview = null;
  }
  if (state.createPin) {
    state.createPin.remove();
    state.createPin = null;
  }
  state.createCoords = null;
}

function handleCreateMapClick(event) {
  if (els.createDialog.classList.contains("hidden")) return;
  setCreateCoords(event.latlng.lat, event.latlng.lng);
  toast(t("toast.bubblePinMoved"));
}

function setCreateCoords(lat, lng) {
  state.createCoords = { lat, lng };
  updateRadiusPreview();
  if (state.map && !state.map.getBounds().pad(-0.25).contains([lat, lng])) {
    state.map.panTo([lat, lng], { animate: true });
  }
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
  els.modeLabel.textContent = state.demoMode ? t("pulse.modeDemo") : t("pulse.mode");

  if (!state.coords) {
    els.pulseTitle.textContent = count
      ? t("pulse.inView", { count, plural: plural(count) })
      : t("pulse.browse");
    els.pulseText.textContent = count
      ? t("pulse.noLocationText", { count: messages, plural: plural(messages) })
      : t("pulse.panText");
    return;
  }
  if (!count) {
    els.pulseTitle.textContent = state.demoMode ? t("pulse.demoEmpty") : t("pulse.noBubbles");
    els.pulseText.textContent = state.demoMode
      ? t("pulse.demoEmptyText")
      : t("pulse.noBubblesText");
    return;
  }
  const top = state.bubbles[0];
  els.pulseTitle.textContent = t("pulse.closest", { count, plural: plural(count) });
  els.pulseText.textContent = t("pulse.nearbyText", { count: messages, plural: plural(messages), title: top.title });
}

function renderBubbles() {
  if (!state.bubbles.length) {
    els.bubbleList.innerHTML = `
      <div class="empty">
        <strong>${state.demoMode ? t("empty.demoTitle") : t("empty.realTitle")}</strong>
        <span>${state.demoMode ? t("empty.demoBody") : t("empty.realBody")}</span>
        ${state.coords ? `<button type="button" data-create-empty>${t("empty.create")}</button>` : ""}
      </div>
    `;
    const createButton = els.bubbleList.querySelector("[data-create-empty]");
    if (createButton) createButton.addEventListener("click", () => els.createButton.click());
    return;
  }

  els.bubbleList.innerHTML = state.bubbles
    .map((bubble) => {
      const category = categoryMeta(bubble.category);
      return `
        <article class="bubble-card ${state.selectedBubbleId === bubble.id ? "selected" : ""}">
          <button class="bubble-main" type="button" data-open-bubble="${bubble.id}">
            <div class="bubble-row">
              <span class="badge" style="background:${category.color}">${escapeHtml(categoryLabel(category))}</span>
              <span class="metrics">${formatDistance(bubble.distance_meters)}</span>
            </div>
            <div class="bubble-title">${escapeHtml(bubble.title)}</div>
            <p class="bubble-text">${escapeHtml(bubble.description || bubble.latest_message || t("metrics.activeQuestion"))}</p>
            <div class="metrics">
              <span>${t("metrics.messages", { count: bubble.message_count, plural: plural(bubble.message_count) })}</span>
              <span>${t("metrics.votes", { count: bubble.score })}</span>
              <span>${t("metrics.radius", { radius: bubble.radius_meters })}</span>
              ${state.demoMode ? `<span>${t("metrics.demoOnly")}</span>` : ""}
            </div>
          </button>
          <div class="card-actions">
            <button type="button" data-focus-bubble="${bubble.id}">${t("actions.showMap")}</button>
            <button type="button" data-open-bubble="${bubble.id}">${t("actions.openChat")}</button>
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
  if (fromMap) toast(t("toast.bubbleSelected"));
}

async function createBubble(event) {
  event.preventDefault();
  if (!state.coords) {
    toast(t("toast.shareCreate"));
    return;
  }
  const payload = {
    title: els.titleInput.value,
    description: els.descriptionInput.value,
    category: els.categoryInput.value,
    radius_meters: Number(els.radiusInput.value),
    lat: (state.createCoords || state.coords).lat,
    lng: (state.createCoords || state.coords).lng,
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
      toast(t("toast.bubbleExpired"));
      refreshBubbles();
      return;
    }
  }
  if (!bubble) return;

  els.chatTitle.textContent = bubble.title;
  els.chatMeta.textContent = `${categoryLabel(categoryMeta(bubble.category))} · ${formatDistance(bubble.distance_meters)} · ${bubble.can_post ? t("chat.inRange") : t("chat.readOnly")}${state.demoMode ? ` · ${t("metrics.demoOnly")}` : ""}`;
  els.bubbleScore.textContent = bubble.score;
  els.messageInput.disabled = !bubble.can_post;
  els.messageInput.placeholder = state.coords
    ? bubble.can_post ? t("chat.input") : t("chat.inputMoveCloser")
    : t("chat.inputShareLocation");

  els.chatMessages.innerHTML = `
    <div class="empty">${escapeHtml(bubble.description || t("chat.noContext"))}</div>
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
        <span>${t("metrics.votes", { count: message.score })}</span>
      </div>
      <div class="message-body">${escapeHtml(message.text)}</div>
      <div class="message-actions">
        <button type="button" data-message-vote="${message.id}" data-value="up">${t("message.useful")}</button>
        <button type="button" data-message-vote="${message.id}" data-value="down">${t("message.noise")}</button>
        ${message.is_mine ? "" : `<button type="button" data-report="${message.id}">${t("message.report")}</button>`}
      </div>
    </div>
  `;
}

async function sendMessage(event) {
  event.preventDefault();
  if (!els.messageInput.value.trim() || !state.activeBubbleId) return;
  if (!state.demoMode && !state.coords) {
    toast(t("toast.shareReply"));
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
    toast(t("toast.demoReport"));
    return;
  }
  await api(`/api/messages/${id}/report`, { method: "POST" });
  toast(t("toast.reportReceived"));
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

function categoryMeta(key) {
  return window.BUBBLYR_CATEGORIES[key] || window.BUBBLYR_CATEGORIES.General;
}

function categoryLabel(category) {
  return state.lang === "it" ? category.label_it || category.label : category.label;
}

function categoryPrompt(category) {
  return state.lang === "it" ? category.prompt_it || category.prompt : category.prompt;
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || (state.lang === "it" ? "Richiesta non riuscita." : "Request failed."));
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
  if (meters === null || meters === undefined) return t("distance.inView");
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
