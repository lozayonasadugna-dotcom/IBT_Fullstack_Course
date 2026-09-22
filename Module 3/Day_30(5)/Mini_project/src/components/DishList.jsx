import { useCallback } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";
import { DishItem } from "./DishItem";

export function DishList({ dishes }) {
  const { items, dispatch } = useCart();

  const handleAdd = useCallback(
    (dish) => {
      // Check if item is already in the cart
      const isAlreadyAdded = items.some((item) => item.id === dish.id);

      if (isAlreadyAdded) {
        alert(`${dish.name} is already added to the cart!`);
        return;
      }

      dispatch({ type: "add", dish });
    },
    [items, dispatch]
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch({ type: "remove", id });
    },
    [dispatch]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {dishes.map((dish) => {
        const isInCart = items.some((item) => item.id === dish.id);

        return (
          <DishItem
            key={dish.id}
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            isInCart={isInCart}
            onAdd={() => handleAdd(dish)}
            onRemove={() => handleRemove(dish.id)}
          />
        );
      })}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      spicy: PropTypes.bool,
    })
  ).isRequired,
};