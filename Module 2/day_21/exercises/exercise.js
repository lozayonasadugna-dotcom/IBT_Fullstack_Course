// Ethiopian Phone Regex Pattern (Part 4 / Exercise 4)[cite: 1]
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;[cite: 1]

// DOM References
const themeToggleBtn = document.querySelector("#themeToggle");
const form = document.querySelector("#signupForm");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorArea = document.querySelector("#errorArea");
const userCountSpan = document.querySelector("#userCount");

// -------------------------------------------------------------
// Exercise 1: Theme toggle with localStorage save and restore[cite: 1]
// -------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem("app_theme");[cite: 1]
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("app_theme", isDark ? "dark" : "light");[cite: 1]
});

// -------------------------------------------------------------
// Exercise 2: Safe save() and load() helpers with try/catch[cite: 1]
// -------------------------------------------------------------
function save(key, dataArray) {
  try {
    localStorage.setItem(key, JSON.stringify(dataArray));[cite: 1]
  } catch (err) {
    console.error("Storage save failed:", err);
  }
}

function load(key) {
  try {
    const raw = localStorage.getItem(key);[cite: 1]
    return raw ? JSON.parse(raw) : [];[cite: 1]
  } catch (err) {
    console.error("Corrupt storage data, returning empty fallback array:", err);[cite: 1]
    return [];[cite: 1]
  }
}

// -------------------------------------------------------------
// Exercise 4 & 5: Validate inputs and return clear error message[cite: 1]
// -------------------------------------------------------------
function validate(name, phone) {
  if (name.length < 2) {
    return "Name must be at least two characters long.";[cite: 1]
  }
  if (!PHONE_REGEX.test(phone)) {
    return "Please enter a valid Ethiopian phone number.";[cite: 1]
  }
  return ""; // Returns empty string when valid[cite: 1]
}

// -------------------------------------------------------------
// Exercise 6: Display count of registered people on load[cite: 1]
// -------------------------------------------------------------
function updateCountUI() {
  const users = load("exercise_users");[cite: 1]
  userCountSpan.textContent = users.length;[cite: 1]
}

// -------------------------------------------------------------
// Exercise 3 & Submit Handling: preventDefault, trim, validate, store[cite: 1]
// -------------------------------------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload[cite: 1]
  errorArea.textContent = "";[cite: 1]

  const name = nameInput.value.trim();[cite: 1]
  const phone = phoneInput.value.trim();[cite: 1]

  const errorMessage = validate(name, phone);[cite: 1]

  if (errorMessage) {
    // Show error safely with textContent (Exercise 5)[cite: 1]
    errorArea.textContent = errorMessage;[cite: 1]
    return;
  }

  // Save entry to localStorage as JSON (Exercise 6)[cite: 1]
  const users = load("exercise_users");[cite: 1]
  users.push({ name, phone });
  save("exercise_users", users);[cite: 1]

  // Reset form and refresh display count[cite: 1]
  form.reset();
  updateCountUI();[cite: 1]
});

// Initialization on load
initTheme();
updateCountUI();[cite: 1]