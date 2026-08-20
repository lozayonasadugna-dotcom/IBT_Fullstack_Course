const searchInput = document.querySelector("#country-input");
const searchBtn = document.querySelector("#search-btn");
const out = document.querySelector("#facts");

function renderFact(parent, label, value) {
  const p = document.createElement("p");
  p.className = "fact-item";
  
  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;
  
  p.appendChild(strong);
  p.appendChild(document.createTextNode(value));
  parent.appendChild(p);
}

async function showCountry(name) {
  if (!name.trim()) return;

  out.textContent = "Loading…";

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name.trim())}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Country not found");
      }
      throw new Error("Unable to fetch data. Please try again later.");
    }

    const [c] = await res.json();
    out.innerHTML = "";

    // Capital
    const capital = c.capital && c.capital.length > 0 ? c.capital[0] : "N/A";
    renderFact(out, "Capital", capital);

    // Population
    const population = c.population ? c.population.toLocaleString() : "N/A";
    renderFact(out, "Population", population);

    // Region
    renderFact(out, "Region", c.region || "N/A");

    // Currencies
    let currencyText = "N/A";
    if (c.currencies) {
      currencyText = Object.values(c.currencies)
        .map((curr) => `${curr.name} (${curr.symbol || ""})`)
        .join(", ");
    }
    renderFact(out, "Currencies", currencyText);

    // Flag
    if (c.flags && (c.flags.svg || c.flags.png)) {
      const img = document.createElement("img");
      img.src = c.flags.svg || c.flags.png;
      img.alt = c.flags.alt || `Flag of ${c.name.common}`;
      img.className = "flag-img";
      out.appendChild(img);
    }

  } catch (err) {
    out.textContent = err.message;
  }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
  showCountry(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    showCountry(searchInput.value);
  }
});

// Default to Ethiopia on first load
showCountry("ethiopia");