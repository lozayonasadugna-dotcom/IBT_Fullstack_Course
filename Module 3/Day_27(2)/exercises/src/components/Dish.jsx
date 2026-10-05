import PropTypes from "prop-types";

export function Dish({ name, price, currency = "ETB", spicy = false }) {
  return (
    <div className="dish">
      <h3>
        {name} {Boolean(spicy) && <span>• Spicy</span>}
      </h3>
      <p>
        {price} {currency}
      </p>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};