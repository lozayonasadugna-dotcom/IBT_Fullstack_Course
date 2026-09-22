import { useState, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { CategoryFilter } from "./CategoryFilter";
import { DishList } from "./DishList";

const CATEGORIES = ["All", "Main", "Vegan", "Grill", "Dessert"];

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dynamic API endpoint driving the fetch logic
  const fetchUrl =
    selectedCategory === "All"
      ? "/dishes.json"
      : `/dishes.json?category=${encodeURIComponent(selectedCategory)}`;

  const { data: dishes, loading, error } = useFetch(fetchUrl);

  // Filter client-side if API returns full dataset
  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    if (selectedCategory === "All") return dishes;
    return dishes.filter(
      (dish) => dish.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [dishes, selectedCategory]);

  return (
    <section style={{ marginTop: "20px" }}>
      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {loading && (
        <div style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
          Loading menu items...
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            borderRadius: "6px",
            border: "1px solid #fecaca",
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && (
        filteredDishes.length === 0 ? (
          <p>No dishes found for this category.</p>
        ) : (
          <DishList dishes={filteredDishes} />
        )
      )}
    </section>
  );
}