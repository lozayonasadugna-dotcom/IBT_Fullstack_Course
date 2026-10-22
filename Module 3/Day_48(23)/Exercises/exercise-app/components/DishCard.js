export default function DishCard({ dish, onAdd, onOpen }) {
  return (
    <article className="card">
      <h3>
        <button type="button" className="card-link" onClick={() => onOpen(dish)}>
          {dish.name}
        </button>
      </h3>
      <p>{dish.price} birr</p>
      <button type="button" className="add" onClick={() => onAdd(dish)}>
        Add
      </button>
    </article>
  )
}
