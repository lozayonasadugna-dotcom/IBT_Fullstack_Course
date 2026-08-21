// Step 1: Initial State & Constants[cite: 1]
const API = "https://open.er-api.com/v6/latest/ETB";[cite: 1]
const KEY = "birrwatch_exercises";[cite: 1]

const state = {
  base: "ETB",[cite: 1]
  rates: {},[cite: 1]
  watchlist: [],[cite: 1]
  amount: 100,[cite: 1]
  currency: "USD",[cite: 1]
};

// DOM Selectors[cite: 1]
const statusEl = document.querySelector("#status");[cite: 1]
const formEl = document.querySelector("#convert-form");
const amountEl = document.querySelector("#amount");
const selectEl = document.querySelector("#currency");[cite: 1]
const resultEl = document.querySelector("#result");
const watchUl = document.querySelector("#watchlist");
const addWatchBtn = document.querySelector("#add-watch-btn");

// Step 6: LocalStorage persistence helper functions[cite: 1]
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
      console.error("Failed to parse stored data", err);[cite: 1]
    }
  }
}

// Step 3: Fetching live rate data[cite: 1]
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

// Step 5: Render watchlist & handling empty state[cite: 1]
function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchUl.innerHTML = "<li>No currencies yet</li>";[cite: 1]
    return;
  }

  watchUl.innerHTML = state.watchlist
    .map((c) => {
      const rate = state.rates[c];[cite: 1]
      return `<li data-c="${c}">
        1 ETB = ${rate} ${c} 
        <button class="rm">x</button>
      </li>`;[cite: 1]
    })
    .join("");
}

// Step 2 & 3: Render dropdown and options from state[cite: 1]
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

// Step 4: Form submit conversion with validation[cite: 1]
formEl.addEventListener("submit", (e) => {
  e.preventDefault();[cite: 1]
  
  const amt = Number(amountEl.value);[cite: 1]
  
  if (isNaN(amt) || amt <= 0) {[cite: 1]
    resultEl.textContent = "Enter a valid amount.";[cite: 1]
    return;
  }

  state.currency = selectEl.value;[cite: 1]
  save(); // Persist active currency choice[cite: 1]

  const rate = state.rates[state.currency];[cite: 1]
  const out = (amt * rate).toFixed(2);[cite: 1]
  
  resultEl.textContent = `${amt} ETB = ${out} ${state.currency}`;[cite: 1]
});

// Step 5: Watchlist addition guarded against duplicates[cite: 1]
addWatchBtn.addEventListener("click", () => {
  const selectedCurrency = selectEl.value;
  
  if (selectedCurrency && !state.watchlist.includes(selectedCurrency)) {[cite: 1]
    state.watchlist.push(selectedCurrency);[cite: 1]
    save();[cite: 1]
    renderWatchlist();[cite: 1]
  }
});

// Step 5: Delegated click listener to remove watchlist item[cite: 1]
watchUl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;[cite: 1]
  
  const codeToRemove = e.target.closest("li").dataset.c;[cite: 1]
  state.watchlist = state.watchlist.filter((x) => x !== codeToRemove);[cite: 1]
  save();[cite: 1]
  renderWatchlist();[cite: 1]
});

// Step 6: App initialization loop[cite: 1]
async function init() {
  load();[cite: 1]
  await loadRates();[cite: 1]
}

init();