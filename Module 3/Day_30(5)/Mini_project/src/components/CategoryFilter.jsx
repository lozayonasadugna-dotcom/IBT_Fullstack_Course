import PropTypes from "prop-types";

export function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          style={{
            backgroundColor: cat === activeCategory ? "#007bff" : "#e0e0e0",
            color: cat === activeCategory ? "#ffffff" : "#000000",
            padding: "6px 14px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: cat === activeCategory ? "bold" : "normal",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};