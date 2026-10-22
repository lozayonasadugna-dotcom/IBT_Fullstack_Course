export default function DishCard({ dish, inCart, onAdd, onOpen }) {
  return (
    <article className="card">
      <h3>
        <button type="button" className="card-link" onClick={() => onOpen(dish)}>
          {dish.name}
        </button>
      </h3>
      <p>{dish.price} birr</p>
      <button
        type="button"
        className="add"
        aria-label={inCart ? `${dish.name} is in your cart` : `Add ${dish.name} to cart`}
        onClick={() => onAdd(dish)}
      >
        {inCart ? "Added" : "Add"}
      </button>
    </article>
  )
}
