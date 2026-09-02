import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";

function DishList({ dishes, onAddToOrder }) {
  if (dishes.length === 0) {
    return <p className="empty-message">No dishes found in this category.</p>;
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} onOrder={onAddToOrder} />
        </Card>
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool
    })
  ).isRequired,
  onAddToOrder: PropTypes.func.isRequired
};

export default DishList;