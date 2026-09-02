import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false, onOrder }) {
  return (
    <div className="dish">
      <h3>
        {name}
        {Boolean(spicy) && <span className="spicy-badge"> • Spicy</span>}
      </h3>
      <p>
        {price} {currency}
      </p>
      <button onClick={() => onOrder(price)}>Add to Order</button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  onOrder: PropTypes.func.isRequired
};

export default Dish;