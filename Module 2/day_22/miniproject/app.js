const API = "https://open.er-api.com/v6/latest/ETB";[cite: 1]
const KEY = "birrwatch";[cite: 1]

// Single source of truth[cite: 1]
const state = {
  base: "ETB",[cite: 1]
  rates: {},[cite: 1]
  watchlist: [],[cite: 1]
  amount: 100,[cite: 1]
  currency: "USD",[cite: 1]
};

// DOM Elements
const statusEl = document.querySelector("#status");[cite: 1]
const selectEl = document.querySelector("#currency");[cite: 1]
const formEl = document.querySelector("#convert-form");
const amountEl = document.querySelector("#amount");
const resultEl = document.querySelector("#result");
const watchUl = document.querySelector("#watchlist");
const addWatchBtn = document.querySelector("#add-watch-btn");

// Persistence[cite: 1]
function save() {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      watchlist: state.watchlist,[cite: 1]
      currency: state.currency,[cite: 1]
    })
  );
}

function load() {
  const saved = localStorage.getItem(KEY);[cite: 1]
  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));[cite: 1]
    } catch (err) {
      console.error("Corrupt state in local storage", err);[cite: 1]
    }
  }
}

// Fetch Rates[cite: 1]
async function loadRates() {
  statusEl.textContent = "Loading rates...";[cite: 1]
  try {
    const res = await fetch(API);[cite: 1]
    if (!res.ok) throw new Error(`HTTP ${res.status}`);[cite: 1]
    const data = await res.json();[cite: 1]
    
    state.rates = data.rates;[cite: 1]
    statusEl.textContent = "";[cite: 1]
    render();[cite: 1]
  } catch (err) {
    statusEl.textContent = "Could not load rates.";[cite: 1]
  }
}

// Render watchlist[cite: 1]
function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchUl.innerHTML = "<li>No currencies yet</li>";[cite: 1]
    return;
  }

  watchUl.innerHTML = state.watchlist
    .map((code) => {
      const rate = state.rates[code] || "N/A";[cite: 1]
      return `<li data-c="${code}">
        <span>1 ETB = ${rate} ${code}</span>
        <button class="rm">x</button>
      </li>`;[cite: 1]
    })
    .join("");
}

// Main Render Loop[cite: 1]
function render() {
  const codes = Object.keys(state.rates);[cite: 1]
  
  selectEl.innerHTML = codes
    .map((c) => `<option value="${c}">${c}</option>`)[cite: 1]
    .join("");

  if (state.rates[state.currency]) {
    selectEl.value = state.currency;
  }

  renderWatchlist();[cite: 1]
}

// Event Listeners
formEl.addEventListener("submit", (e) => {
  e.preventDefault();[cite: 1]
  const amt = Number(amountEl.value);[cite: 1]

  if (isNaN(amt) || amt <= 0) {[cite: 1]
    resultEl.textContent = "Enter a valid amount.";[cite: 1]
    return;
  }

  state.currency = selectEl.value;[cite: 1]
  state.amount = amt;
  save();[cite: 1]

  const rate = state.rates[state.currency];[cite: 1]
  if (rate) {
    const out = (amt * rate).toFixed(2);[cite: 1]
    resultEl.textContent = `${amt} ETB = ${out} ${state.currency}`;[cite: 1]
  }
});

addWatchBtn.addEventListener("click", () => {
  const selectedCurrency = selectEl.value;
  if (!selectedCurrency) return;

  if (!state.watchlist.includes(selectedCurrency)) {[cite: 1]
    state.watchlist.push(selectedCurrency);[cite: 1]
    save();[cite: 1]
    renderWatchlist();[cite: 1]
  }
});

watchUl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;[cite: 1]

  const li = e.target.closest("li");[cite: 1]
  const codeToRemove = li.dataset.c;[cite: 1]

  state.watchlist = state.watchlist.filter((c) => c !== codeToRemove);[cite: 1]
  save();[cite: 1]
  renderWatchlist();[cite: 1]
});

// Initialization Sequence[cite: 1]
async function init() {
  load();[cite: 1]
  await loadRates();[cite: 1]
}

init();