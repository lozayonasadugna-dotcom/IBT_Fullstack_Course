// Ethiopian Phone Regex Pattern[cite: 1]
const PHONE_PATTERN = /^(?:\+251|0)9\d{8}$/;[cite: 1]

// DOM References
const form = document.querySelector("#miniSignupForm");
const nameInput = document.querySelector("#fullName");
const phoneInput = document.querySelector("#phoneNumber");
const errorDisplay = document.querySelector("#errorDisplay");
const countNum = document.querySelector("#countNum");

// Safe storage utilities[cite: 1]
function safeSave(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));[cite: 1]
  } catch (err) {
    console.error("Failed to save data to localStorage:", err);
  }
}

function safeLoad(key) {
  try {
    const raw = localStorage.getItem(key);[cite: 1]
    return raw ? JSON.parse(raw) : [];[cite: 1]
  } catch (err) {
    console.error("Corrupt data in storage. Falling back to empty array:", err);[cite: 1]
    return [];[cite: 1]
  }
}

// Validator function[cite: 1]
function validate(name, phone) {
  if (name.length < 2) return "Enter your full name.";[cite: 1]
  if (!PHONE_PATTERN.test(phone)) return "Enter a valid phone.";[cite: 1]
  return "";[cite: 1]
}

// Update counter display
function renderCount() {
  const members = safeLoad("project_members");[cite: 1]
  countNum.textContent = members.length;[cite: 1]
}

// Event handling[cite: 1]
form.addEventListener("submit", (e) => {
  e.preventDefault();[cite: 1]
  errorDisplay.textContent = "";[cite: 1]

  const name = nameInput.value.trim();[cite: 1]
  const phone = phoneInput.value.trim();[cite: 1]

  const error = validate(name, phone);[cite: 1]
  if (error) {
    errorDisplay.textContent = error; // Render error safely via textContent[cite: 1]
    return;
  }

  const members = safeLoad("project_members");[cite: 1]
  members.push({ name, phone });
  safeSave("project_members", members);[cite: 1]

  form.reset();
  renderCount();[cite: 1]
});

// Initial load check[cite: 1]
renderCount();[cite: 1]