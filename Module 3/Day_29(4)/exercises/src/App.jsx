import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Dish Component
function Dish({ name, price, spicy = false, onAddToCart }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
    onAddToCart(price);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "8px 0",
        borderRadius: "6px",
      }}
    >
      <h3>
        {name} {count > 0 && `(Ordered: ${count})`}{" "}
        {Boolean(spicy) && <span>🌶️ Spicy</span>}
      </h3>
      <p>{price} ETB</p>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  onAddToCart: PropTypes.func.isRequired,
};

// CategoryBar Component
function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          style={{
            backgroundColor: cat === selected ? "#007bff" : "#e0e0e0",
            color: cat === selected ? "#ffffff" : "#000000",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

// Main App Component
export default function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  // Exercise 7: useRef to focus search input on mount
  const searchInputRef = useRef(null);

  const categories = ["All", "Main", "Vegan", "Grill", "Dessert"];

  // Focus search input on mount
  // Note: DOM element is only available AFTER render, so focus call belongs in an effect
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Exercise 2, 3, 4, 5, 6: Data fetching with category dependency & AbortController
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function fetchDishes() {
      try {
        const res = await fetch("/dishes.json", { signal: controller.signal });

        // Exercise 4: Check res.ok and throw error on 404/500
        if (!res.ok) {
          throw new Error("Could not load the menu. Please try again later.");
        }

        const data = await res.json();

        // Filter data by category if not "All"
        const filtered =
          category === "All"
            ? data
            : data.filter((item) => item.category === category);

        setDishes(filtered);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();

    // Exercise 6: Cleanup function cancels previous request
    return () => {
      controller.abort();
    };
  }, [category]); // Exercise 5: category added to dependency array

  // Exercise 1: Update document.title based on length of displayed dishes
  useEffect(() => {
    document.title = `Addis Eats - ${dishes.length} items`;
  }, [dishes]);

  const handleAddToCart = (price) => {
    setOrderTotal((prev) => prev + price);
  };

  // Client-side search filtering
  const displayedDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Addis Eats Interactive Menu</h1>

      {/* Exercise 7: Search input with ref */}
      <div style={{ marginBottom: "16px" }}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      {/* Category Selection Bar */}
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      {/* Exercise 3 & 4: Early returns for loading, error, and empty state */}
      {loading ? (
        <p>Loading the menu...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : displayedDishes.length === 0 ? (
        <p>No dishes found for category "{category}".</p>
      ) : (
        displayedDishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            onAddToCart={handleAddToCart}
          />
        ))
      )}

      {/* Running order total */}
      <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
        Running Order Total: {orderTotal} ETB
      </div>
    </div>
  );
}