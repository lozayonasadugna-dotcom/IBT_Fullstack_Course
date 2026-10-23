export default function DishCard({ dish, inCart, onAdd }) {
  return (
    <li className="card">
      <h3>{dish.name}</h3>
      <p>{dish.desc}</p>
      <p className="price">{dish.price} birr</p>
      <button
        type="button"
        className="primary"
        aria-label={inCart ? `${dish.name} is in your cart` : `Add ${dish.name} to cart`}
        onClick={() => onAdd(dish)}
      >
        {inCart ? "Added" : "Add"}
      </button>
    </li>
  )
}
