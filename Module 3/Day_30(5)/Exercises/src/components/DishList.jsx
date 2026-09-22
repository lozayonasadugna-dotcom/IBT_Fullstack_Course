import { useCallback } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";
import { DishItem } from "./DishItem";

export function DishList({ dishes }) {
  const { dispatch } = useCart();

  // useCallback stabilizes the function identity passed down to DishItem
  const handleAdd = useCallback(
    (dish) => {
      dispatch({ type: "add", dish });
    },
    [dispatch]
  );

  return (
    <div>
      {dishes.map((dish) => (
        <DishItem
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
          onAdd={() => handleAdd(dish)}
        />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
};