import { useState, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { DishList } from "./DishList";

export function Menu() {
  const [category, setCategory] = useState("All");
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  const categories = ["All", "Main", "Vegan", "Grill", "Dessert"];

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    if (category === "All") return dishes;
    return dishes.filter((d) => d.category === category);
  }, [dishes, category]);

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            style={{
              backgroundColor: cat === category ? "#007bff" : "#e0e0e0",
              color: cat === category ? "#ffffff" : "#000000",
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading menu items...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <DishList dishes={filteredDishes} />
      )}
    </div>
  );
}