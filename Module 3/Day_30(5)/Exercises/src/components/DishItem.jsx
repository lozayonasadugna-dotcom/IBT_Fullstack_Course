import React from "react";
import PropTypes from "prop-types";

// React.memo skips re-rendering if props (name, price, spicy, onAdd) haven't changed
export const DishItem = React.memo(function DishItem({ name, price, spicy, onAdd }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        margin: "8px 0",
        borderRadius: "6px",
      }}
    >
      <h3>
        {name} {spicy && <span>🌶️</span>}
      </h3>
      <p>{price} ETB</p>
      <button onClick={onAdd}>Add to Cart</button>
    </div>
  );
});

DishItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
};