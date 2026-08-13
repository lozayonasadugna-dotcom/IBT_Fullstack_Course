// 1. Cache element references once on load
const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

// 2. Handle form submission[cite: 1]
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent full browser reload[cite: 1]

  const nameValue = nameInput.value.trim();
  const priceValue = Number(priceInput.value);

  // Input validation guard[cite: 1]
  if (!nameValue || isNaN(priceValue) || priceValue <= 0) return;

  // Add new element and update UI state[cite: 1]
  addRow(nameValue, priceValue);
  form.reset();
  updateTotal();
});

// 3. Single delegated listener on parent list container[cite: 1]
list.addEventListener("click", (e) => {
  // Option A: Clicked on delete button[cite: 1]
  if (e.target.matches(".del")) {
    e.target.closest("li").remove();
    updateTotal();
  } 
  // Option B: Clicked anywhere on the row (toggle bought class)[cite: 1]
  else if (e.target.closest("li")) {
    const row = e.target.closest("li");
    row.classList.toggle("bought");
  }
});

// 4. Function to create, build, and append DOM nodes[cite: 1]
function addRow(name, price) {
  const li = document.createElement("li");
  li.dataset.price = price; // Store price value on dataset attribute

  const infoSpan = document.createElement("span");
  infoSpan.className = "item-info";
  infoSpan.textContent = `${name} — `;

  const priceStrong = document.createElement("strong");
  priceStrong.className = "item-price";
  priceStrong.textContent = `${price.toFixed(2)} ETB`;
  infoSpan.append(priceStrong);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "del";
  deleteBtn.textContent = "✕";

  li.append(infoSpan, deleteBtn);
  list.append(li);
}

// 5. Calculate and display live running ETB total[cite: 1]
function updateTotal() {
  const allRows = list.querySelectorAll("li");
  let total = 0;

  allRows.forEach((row) => {
    total += Number(row.dataset.price) || 0;
  });

  totalEl.textContent = total.toFixed(2);
}