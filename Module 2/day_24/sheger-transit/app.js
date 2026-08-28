// Top-Level Lifted Named Constants
const STORAGE_KEY = "sheger_transit_favorites";
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
const DEFAULT_INTERVAL_MINS = 10;
const REFRESH_RATE_MS = 60000;

// Application Central State
const state = {
  routes: [],
  favorites: [],
  search: "",
  activeView: "home"
};

// Persistence Handlers
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
}

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state.favorites = JSON.parse(saved);
    } catch (err) {
      state.favorites = [];
    }
  }
}

// Helpers & Calculations
function getNextDeparture(interval) {
  const safeInterval = interval || DEFAULT_INTERVAL_MINS;
  const now = new Date();
  const minutes = now.getMinutes();
  const remaining = safeInterval - (minutes % safeInterval);
  return remaining === 0 ? safeInterval : remaining;
}

// Day 24 Pure Validation Function
function validate({ name, phone }) {
  if (!name.trim()) return "Please enter your full name.";
  if (!PHONE_REGEX.test(phone.trim())) return "Enter a valid Ethiopian phone number (e.g., 0911223344 or +251911223344).";
  if (state.favorites.length === 0) return "Your saved favorites list is empty. Add a route before checkout.";
  return "";
}

// Extracted Render Functions with Guard Clauses
function renderRoutes() {
  const container = document.querySelector("#routes-container");
  if (!container) return; // Guard clause

  const term = state.search.toLowerCase().trim();
  const filtered = state.routes.filter(r => {
    return (r.routeNumber?.toLowerCase().includes(term)) ||
           (r.origin?.toLowerCase().includes(term)) ||
           (r.destination?.toLowerCase().includes(term)) ||
           (r.via?.toLowerCase().includes(term));
  });

  // Guard clause for empty search results
  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty" style="grid-column: 1/-1; padding: 1rem; color: #64748b;">No transit routes found matching "${state.search}".</p>`;
    return;
  }

  container.innerHTML = filtered.map(r => {
    const isFav = state.favorites.some(f => f.id === r.id);
    const nextMins = getNextDeparture(r.scheduleMinutes);
    const viaText = r.via ? `<p class="route-via"><i class="fa-solid fa-map-pin"></i> Via: <span>${r.via}</span></p>` : "";
    
    return `
      <article class="card" data-id="${r.id}">
        <h3>${r.routeNumber}</h3>
        <p><strong>${r.origin}</strong> ➔ <strong>${r.destination}</strong></p>
        ${viaText}
        <p>Fare: <strong>${r.fare} ETB</strong></p>
        <div class="countdown-badge">
          <i class="fa-regular fa-clock"></i> Next bus in ${nextMins} mins
        </div>
        <button class="fav-btn" onclick="toggleFavorite(${r.id})">${isFav ? "★ Saved" : "☆ Save Favorite"}</button>
      </article>
    `;
  }).join("");
}

function renderFavorites() {
  const favContainer = document.querySelector("#favorites-container");
  if (!favContainer) return; // Guard clause

  // Guard clause for empty favorites cart
  if (state.favorites.length === 0) {
    favContainer.innerHTML = `<p class="empty" style="color: #64748b;">No saved favorites yet. Save routes to book a pass.</p>`;
    return;
  }

  const totalFare = state.favorites.reduce((sum, item) => sum + (item.fare || 0), 0);
  favContainer.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <p style="font-size: 1.1rem;">Total Saved Fare: <strong style="color: #2563eb;">${totalFare} ETB</strong></p>
      <button class="btn btn-primary" id="open-booking-btn" style="margin-top: 0.75rem;">Proceed to Checkout</button>
    </div>
    ${state.favorites.map(f => `
      <div class="fav-item">
        • <strong>${f.routeNumber}</strong> (${f.origin} to ${f.destination}) - ${f.fare} ETB
      </div>
    `).join("")}
  `;

  document.querySelector("#open-booking-btn")?.addEventListener("click", () => {
    document.querySelector("#booking-modal")?.classList.add("active");
  });
}

function updateViewVisibility() {
  const views = {
    home: ["#section-map", "#section-routes"],
    routes: ["#section-routes"],
    planner: ["#section-planner"],
    favorites: ["#section-favorites"]
  };

  document.querySelectorAll(".view-section").forEach(sec => sec.classList.add("hidden"));
  const activeSections = views[state.activeView] || views.home;
  activeSections.forEach(id => document.querySelector(id)?.classList.remove("hidden"));

  document.querySelectorAll(".nav-item").forEach(nav => {
    nav.classList.toggle("active", nav.dataset.view === state.activeView);
  });
}

function render() {
  updateViewVisibility();
  renderRoutes();
  renderFavorites();
}

// Global Actions
window.toggleFavorite = function(routeId) {
  const route = state.routes.find(r => r.id === routeId);
  if (!route) return;

  const existsIndex = state.favorites.findIndex(f => f.id === routeId);
  if (existsIndex > -1) {
    state.favorites.splice(existsIndex, 1);
  } else {
    state.favorites.push(route);
  }
  
  save();
  render();
};

function setupPlannerOptions() {
  const originSelect = document.querySelector("#origin-select");
  const destSelect = document.querySelector("#destination-select");
  if (!originSelect || !destSelect) return;

  const origins = [...new Set(state.routes.map(r => r.origin))];
  const dests = [...new Set(state.routes.map(r => r.destination))];

  originSelect.innerHTML = `<option value="">-- Select Origin --</option>` + origins.map(o => `<option value="${o}">${o}</option>`).join("");
  destSelect.innerHTML = `<option value="">-- Select Destination --</option>` + dests.map(d => `<option value="${d}">${d}</option>`).join("");
}

// Event Listeners
document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    state.activeView = item.dataset.view;
    render();
  });
});

document.querySelector("#search")?.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderRoutes();
});

document.querySelector("#calculate-btn")?.addEventListener("click", () => {
  const origin = document.querySelector("#origin-select")?.value;
  const dest = document.querySelector("#destination-select")?.value;
  const resultEl = document.querySelector("#planner-result");

  if (!origin || !dest) {
    resultEl.textContent = "Please select both origin and destination.";
    return;
  }

  const found = state.routes.find(r => r.origin === origin && r.destination === dest);
  if (found) {
    resultEl.innerHTML = `Direct Route Available: <strong>${found.routeNumber}</strong> | Fare: <strong>${found.fare} ETB</strong>`;
  } else {
    resultEl.textContent = "No direct route found between selected points.";
  }
});

// Day 24 Checkout Form & Modal Handlers
const bookingModal = document.querySelector("#booking-modal");
document.querySelector("#close-booking-modal")?.addEventListener("click", () => {
  bookingModal?.classList.remove("active");
});

document.querySelector("#checkout")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#passenger-name").value;
  const phone = document.querySelector("#passenger-phone").value;
  const errorEl = document.querySelector("#form-error");

  const errorMsg = validate({ name, phone });
  if (errorMsg) {
    errorEl.textContent = errorMsg;
    return; // Stop execution on error
  }

  errorEl.textContent = "";

  const order = {
    name: name.trim(),
    phone: phone.trim(),
    items: state.favorites,
    total: state.favorites.reduce((sum, item) => sum + (item.fare || 0), 0),
    placedAt: new Date().toISOString()
  };

  // State mutation, local persistence, and user feedback
  alert(`Pass Booked Successfully!\n\nPassenger: ${order.name}\nPhone: ${order.phone}\nTotal Paid: ${order.total} ETB`);
  
  state.favorites = [];
  save();
  bookingModal?.classList.remove("active");
  render();
});

// App Initialization
async function init() {
  load();
  try {
    const res = await fetch("data/routes.json");
    if (!res.ok) throw new Error("HTTP error " + res.status);
    state.routes = await res.json();
    setupPlannerOptions();
    render();
  } catch (err) {
    const container = document.querySelector("#routes-container");
    if (container) {
      container.innerHTML = `<p style="color: #ef4444; padding: 1rem;">Could not load transit routes. Check local data file connection.</p>`;
    }
  }
}

setInterval(render, REFRESH_RATE_MS);
init();