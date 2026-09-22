import React from "react";
import PropTypes from "prop-types";

export const DishItem = React.memo(function DishItem({
  name,
  price,
  spicy,
  isInCart,
  onAdd,
  onRemove,
}) {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        padding: "14px",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        color: "#000000",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 4px 0" }}>
          {name} {spicy && <span>🌶️</span>}
        </h4>
        <span style={{ color: "#666", fontWeight: "600" }}>{price} ETB</span>
      </div>

      <div>
        {isInCart ? (
          <button
            onClick={onRemove}
            style={{
              padding: "8px 14px",
              backgroundColor: "#dc3545",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Remove
          </button>
        ) : (
          <button
            onClick={onAdd}
            style={{
              padding: "8px 14px",
              backgroundColor: "#28a745",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
});

DishItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  isInCart: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};