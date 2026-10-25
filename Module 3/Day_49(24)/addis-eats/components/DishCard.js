import Image from "next/image"

export default function DishCard({ dish, inCart, onAdd, onOpen, index }) {
  return (
    <li className="card" style={{ "--card-index": index }}>
      <button type="button" className="dish-image-button" onClick={() => onOpen(dish)} aria-label={`View ${dish.name} details`}>
        <Image src={dish.image} alt={`${dish.name} Ethiopian dish`} fill sizes="(max-width: 620px) 50vw, (max-width: 900px) 50vw, 25vw" />
        <span className="dish-image-label">View dish</span>
        <small>{dish.category}</small>
      </button>
      <div className="dish-details">
        <div className="dish-heading">
          <button type="button" className="dish-name-button" onClick={() => onOpen(dish)}>{dish.name}</button>
          <p className="price">{dish.price} <small>birr</small></p>
        </div>
        <p className="dish-description">{dish.desc}</p>
        <button
          type="button"
          className={inCart ? "button button-added" : "button button-outline"}
          aria-label={inCart ? `${dish.name} is in your cart` : `Add ${dish.name} to cart`}
          onClick={() => onAdd(dish)}
        >
          {inCart ? "In your bag ✓" : "Add to bag"} <span aria-hidden="true">+</span>
        </button>
      </div>
    </li>
  )
}
