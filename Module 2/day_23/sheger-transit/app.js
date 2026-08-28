const state = {
  routes: [],
  favorites: [],
  search: "",
  activeView: "home"
};

function save() {
  localStorage.setItem("sheger_favorites", JSON.stringify(state.favorites));
}

function load() {
  const saved = localStorage.getItem("sheger_favorites");
  if (saved) state.favorites = JSON.parse(saved);
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
  const secPlanner = document.querySelector("#section-planner");
  const secMap = document.querySelector("#section-map");
  const secRoutes = document.querySelector("#section-routes");
  const secFavorites = document.querySelector("#section-favorites");

  [secPlanner, secMap, secRoutes, secFavorites].forEach(sec => sec?.classList.remove("hidden"));

  if (state.activeView === "routes") {
    secPlanner?.classList.add("hidden");
    secFavorites?.classList.add("hidden");
  } else if (state.activeView === "planner") {
    secMap?.classList.add("hidden");
    secRoutes?.classList.add("hidden");
    secFavorites?.classList.add("hidden");
  } else if (state.activeView === "favorites") {
    secPlanner?.classList.add("hidden");
    secMap?.classList.add("hidden");
    secRoutes?.classList.add("hidden");
  }
}

function render() {
  updateViewVisibility();

  const container = document.querySelector("#routes-container");
  const favContainer = document.querySelector("#favorites-container");
  const term = state.search.toLowerCase();

  const filtered = state.routes.filter(r => {
    return r.routeNumber.toLowerCase().includes(term) ||
           r.origin.toLowerCase().includes(term) ||
           r.destination.toLowerCase().includes(term) ||
           (r.via && r.via.toLowerCase().includes(term));
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty">No routes found matching search.</p>`;
  } else {
    container.innerHTML = filtered.map(r => {
      const isFav = state.favorites.some(f => f.id === r.id);
      const nextMins = getNextDeparture(r.scheduleMinutes || 10);
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
          <button class="fav-btn">${isFav ? "★ Saved" : "☆ Save Favorite"}</button>
        </article>
      `;
    }).join("");
  }

  if (state.favorites.length === 0) {
    favContainer.innerHTML = `<p class="empty">No saved routes yet.</p>`;
  } else {
    const totalFare = state.favorites.reduce((sum, item) => sum + item.fare, 0);
    favContainer.innerHTML = `
      <p style="margin-bottom: 0.5rem;">Total Fare: <strong>${totalFare} ETB</strong></p>
      ${state.favorites.map(f => `
        <div class="fav-item">
          • <strong>${f.routeNumber}</strong> (${f.origin} to ${f.destination})
        </div>
      `).join("")}
    `;
  }
}

// Sidebar View Handlers
document.querySelectorAll(".sidebar-menu .nav-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".sidebar-menu .nav-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    state.activeView = item.dataset.view;
    render();
  });
});

// Modal Handlers
const modal = document.querySelector("#auth-modal");
document.querySelector("#signin-btn")?.addEventListener("click", () => modal.classList.add("active"));
document.querySelector("#close-modal")?.addEventListener("click", () => modal.classList.remove("active"));
modal?.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

document.querySelector("#login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Signed in successfully!");
  modal.classList.remove("active");
});

// Trip Planner Calculation
document.querySelector("#calculate-btn")?.addEventListener("click", () => {
  const origin = document.querySelector("#origin-select").value;
  const destination = document.querySelector("#destination-select").value;
  const resultDiv = document.querySelector("#planner-result");

  if (!origin || !destination) {
    resultDiv.innerHTML = `<span style="color: #ef4444;">Please select both origin and destination.</span>`;
    return;
  }

  const match = state.routes.find(r => r.origin === origin && r.destination === destination);
  if (match) {
    const viaDetail = match.via ? ` (Via ${match.via})` : "";
    resultDiv.innerHTML = `Direct Route Found: <strong>${match.routeNumber}</strong>${viaDetail} | Standard Fare: <strong>${match.fare} ETB</strong>`;
  } else {
    resultDiv.innerHTML = `No direct bus found between ${origin} and ${destination}. Transfer may be required.`;
  }
});

// Search & Favorites Handlers
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

setInterval(render, 60000);

async function init() {
  load();
  try {
    const res = await fetch("data/routes.json");
    if (!res.ok) throw new Error("HTTP error " + res.status);
    state.routes = await res.json();
    setupPlannerOptions();
    render();
  } catch (err) {
    document.querySelector("#routes-container").textContent = "Could not load transit routes.";
  }
}

init();