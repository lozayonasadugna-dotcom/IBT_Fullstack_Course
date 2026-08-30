const state = {
  routes: [
    { id: 1, routeNumber: "Route 12", origin: "Megenagna", destination: "Piazza", via: "Arat Kilo and English Church", fare: 15, scheduleMinutes: 10 },
    { id: 2, routeNumber: "Route 05", origin: "Bole", destination: "Mexico", fare: 10, scheduleMinutes: 15 },
    { id: 3, routeNumber: "Route 08", origin: "Ayat", destination: "Megenagna", via: "CMC and Summit Avenue", fare: 15, scheduleMinutes: 7 },
    { id: 4, routeNumber: "Route 14", origin: "Kera", destination: "Lafto", via: "Mexico Square and Sarbet", fare: 12, scheduleMinutes: 12 },
    { id: 5, routeNumber: "Route 22", origin: "Tulu Dimtu", destination: "Megenagna", via: "Gotera Interchange and Bole Road", fare: 20, scheduleMinutes: 15 },
    { id: 6, routeNumber: "Route 30", origin: "Mexico", destination: "Kality", via: "Saris and Meshualekia", fare: 18, scheduleMinutes: 10 },
    { id: 7, routeNumber: "Route 01", origin: "Mexico", destination: "Torhailoch", fare: 10, scheduleMinutes: 8 },
    { id: 8, routeNumber: "Route 02", origin: "Megenagna", destination: "Merkato", fare: 15, scheduleMinutes: 10 },
    { id: 9, routeNumber: "Route 03", origin: "Mexico", destination: "Jemo", fare: 15, scheduleMinutes: 12 },
    { id: 10, routeNumber: "Route 04", origin: "Stadium", destination: "Kality", via: "Saris", fare: 15, scheduleMinutes: 12 }
  ],
  favorites: [],
  history: [],
  search: "",
  activeView: "home"
};

function save() {
  localStorage.setItem("sheger_favorites", JSON.stringify(state.favorites));
  localStorage.setItem("sheger_history", JSON.stringify(state.history));
}

function load() {
  const savedFavs = localStorage.getItem("sheger_favorites");
  if (savedFavs) state.favorites = JSON.parse(savedFavs);

  const savedHist = localStorage.getItem("sheger_history");
  if (savedHist) state.history = JSON.parse(savedHist);
}

function getNextDeparture(interval) {
  const now = new Date();
  const minutes = now.getMinutes();
  const remaining = interval - (minutes % interval);
  return remaining === 0 ? interval : remaining;
}

function setupPlannerOptions() {
  const origins = [...new Set(state.routes.map(r => r.origin))];
  const destinations = [...new Set(state.routes.map(r => r.destination))];

  const originSelect = document.querySelector("#origin-select");
  const destSelect = document.querySelector("#destination-select");

  if (originSelect && destSelect) {
    originSelect.innerHTML = `<option value="">-- Select Origin --</option>` + 
      origins.map(o => `<option value="${o}">${o}</option>`).join("");

    destSelect.innerHTML = `<option value="">-- Select Destination --</option>` + 
      destinations.map(d => `<option value="${d}">${d}</option>`).join("");
  }
}

function updateViewVisibility() {
  const views = [
    { id: "#section-planner", view: ["home", "planner"] },
    { id: "#section-map", view: ["home"] },
    { id: "#section-routes", view: ["home", "routes"] },
    { id: "#section-favorites", view: ["favorites"] },
    { id: "#section-history", view: ["history"] },
    { id: "#section-payment", view: ["payment"] },
    { id: "#section-support", view: ["support"] },
    { id: "#section-profile", view: ["profile"] }
  ];

  views.forEach(v => {
    const el = document.querySelector(v.id);
    if (!el) return;
    if (v.view.includes(state.activeView)) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });
}

function render() {
  updateViewVisibility();

  const container = document.querySelector("#routes-container");
  const favContainer = document.querySelector("#favorites-container");
  const historyContainer = document.querySelector("#history-container");
  const term = state.search.toLowerCase();

  const filtered = state.routes.filter(r => {
    return r.routeNumber.toLowerCase().includes(term) ||
           r.origin.toLowerCase().includes(term) ||
           r.destination.toLowerCase().includes(term) ||
           (r.via && r.via.toLowerCase().includes(term));
  });

  if (container) {
    if (filtered.length === 0) {
      container.innerHTML = `<p class="empty">No routes found matching search.</p>`;
    } else {
      container.innerHTML = filtered.map(r => {
        const isFav = state.favorites.some(f => f.id === r.id);
        const nextMins = getNextDeparture(r.scheduleMinutes || 10);
        
        return `
          <article class="card" data-id="${r.id}">
            <h3>${r.routeNumber}</h3>
            <p><strong>${r.origin}</strong> ➔ <strong>${r.destination}</strong></p>
            ${r.via ? `<p class="route-via">Via: <span>${r.via}</span></p>` : ""}
            <p>Fare: <strong>${r.fare} ETB</strong></p>
            <div class="countdown-badge">
              <i class="fa-regular fa-clock"></i> Next bus in ${nextMins} mins
            </div>
            <button class="fav-btn">${isFav ? "★ Saved" : "☆ Save Favorite"}</button>
          </article>
        `;
      }).join("");
    }
  }

  if (favContainer) {
    if (state.favorites.length === 0) {
      favContainer.innerHTML = `<p class="empty">No saved routes yet.</p>`;
    } else {
      const totalFare = state.favorites.reduce((sum, item) => sum + item.fare, 0);
      favContainer.innerHTML = `
        <p style="margin-bottom: 0.5rem;">Total Fare: <strong>${totalFare} ETB</strong></p>
        ${state.favorites.map(f => `
          <div class="fav-item">
            • <strong>${f.routeNumber}</strong> (${f.origin} to ${f.destination}) ${f.via ? `- Via ${f.via}` : ""} - ${f.fare} ETB
          </div>
        `).join("")}
      `;
    }
  }

  if (historyContainer) {
    if (state.history.length === 0) {
      historyContainer.innerHTML = `<p class="empty" style="color: var(--text-muted);">No past orders found.</p>`;
    } else {
      historyContainer.innerHTML = state.history.map(h => `
        <div class="history-item">
          <p><strong>Pass Order #${h.id}</strong> - ${h.total} ETB</p>
          <p style="font-size: 0.8rem; color: var(--text-muted);">${new Date(h.placedAt).toLocaleString()}</p>
        </div>
      `).join("");
    }
  }
}

// Collapsible Sidebar Drawer Handlers
const sidebar = document.querySelector("#left-sidebar");
const overlay = document.querySelector("#sidebar-overlay");

function toggleSidebar() {
  sidebar?.classList.toggle("active");
  overlay?.classList.toggle("active");
}

document.querySelector("#menu-toggle-btn")?.addEventListener("click", toggleSidebar);
document.querySelector("#close-sidebar-btn")?.addEventListener("click", toggleSidebar);
overlay?.addEventListener("click", toggleSidebar);

// Navigation View Switcher
document.querySelectorAll(".sidebar-menu .nav-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".sidebar-menu .nav-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    state.activeView = item.dataset.view;
    render();
    toggleSidebar();
  });
});

// Modal Handlers
const authModal = document.querySelector("#auth-modal");
const bookingModal = document.querySelector("#booking-modal");

document.querySelector("#signin-btn")?.addEventListener("click", () => authModal?.classList.add("active"));
document.querySelector("#close-modal")?.addEventListener("click", () => authModal?.classList.remove("active"));

document.querySelector("#open-booking-btn")?.addEventListener("click", () => bookingModal?.classList.add("active"));
document.querySelector("#close-booking-modal")?.addEventListener("click", () => bookingModal?.classList.remove("active"));

// Trip Planner Calculation
document.querySelector("#calculate-btn")?.addEventListener("click", () => {
  const origin = document.querySelector("#origin-select").value;
  const destination = document.querySelector("#destination-select").value;
  const resultDiv = document.querySelector("#planner-result");

  if (!origin || !destination) {
    resultDiv.innerHTML = `<span style="color: #ef4444;">Please select both origin and destination.</span>`;
    return;
  }

  const matches = state.routes.filter(r => r.origin === origin && r.destination === destination);
  if (matches.length > 0) {
    resultDiv.innerHTML = matches.map(m => 
      `Direct Route Found: <strong>${m.routeNumber}</strong> | Fare: <strong>${m.fare} ETB</strong> ${m.via ? `(Via ${m.via})` : ""}`
    ).join("<br>");
  } else {
    resultDiv.innerHTML = `No direct bus found between ${origin} and ${destination}.`;
  }
});

// Search & Favorites
document.querySelector("#search")?.addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

document.querySelector("#routes-container")?.addEventListener("click", (e) => {
  if (!e.target.matches(".fav-btn")) return;
  const card = e.target.closest(".card");
  const id = Number(card.dataset.id);
  const route = state.routes.find(r => r.id === id);
  const existingIndex = state.favorites.findIndex(f => f.id === id);

  if (existingIndex > -1) {
    state.favorites.splice(existingIndex, 1);
  } else {
    state.favorites.push(route);
  }

  save();
  render();
});

// Checkout Order Handler
document.querySelector("#checkout-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#passenger-name").value;
  const phone = document.querySelector("#passenger-phone").value;
  const errorEl = document.querySelector("#form-error");

  if (!name.trim() || !phone.trim()) {
    errorEl.textContent = "Please fill in all details.";
    return;
  }

  const order = {
    id: Math.floor(1000 + Math.random() * 9000),
    passengerName: name,
    phone: phone,
    items: [...state.favorites],
    total: state.favorites.reduce((sum, item) => sum + item.fare, 0),
    placedAt: new Date().toISOString()
  };

  state.history.unshift(order);
  state.favorites = [];
  save();
  render();

  bookingModal?.classList.remove("active");
  alert(`Pass booked successfully! Order #${order.id}`);
});

// Support Form Handler
document.querySelector("#support-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for reaching out! Your inquiry has been submitted.");
  e.target.reset();
});

function init() {
  load();
  setupPlannerOptions();
  render();
}
// Terms & Conditions Modal Handlers
const tcModal = document.querySelector("#tc-modal");
const openTcBtn = document.querySelector("#open-tc-footer");
const closeTcBtn = document.querySelector("#close-tc-modal");

openTcBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  tcModal?.classList.add("active");
});

closeTcBtn?.addEventListener("click", () => {
  tcModal?.classList.remove("active");
});

// Google Login Simulation
document.querySelector("#google-login-btn")?.addEventListener("click", () => {
  alert("Redirecting to Google Sign-In...");
});

// Promo Login & Signup Buttons
document.querySelector("#promo-login-btn")?.addEventListener("click", () => {
  document.querySelector("#auth-modal")?.classList.add("active");
});

document.querySelector("#promo-signup-btn")?.addEventListener("click", () => {
  document.querySelector("#auth-modal")?.classList.add("active");
});

init();