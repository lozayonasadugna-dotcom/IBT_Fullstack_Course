import PropTypes from "prop-types";
import { Dish } from "./Dish";
import { Card } from "./Card";

export function Menu({ dishes = [], selectedCategory = "Main" }) {
  const filteredDishes = dishes.filter(
    (dish) => dish.category === selectedCategory
  );

  if (filteredDishes.length === 0) {
    return <p>No {selectedCategory} dishes available.</p>;
  }

  return (
    <div className="menu-list">
      <h2>{selectedCategory} Menu</h2>
      {filteredDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
          />
        </Card>
      ))}
    </div>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    })
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};