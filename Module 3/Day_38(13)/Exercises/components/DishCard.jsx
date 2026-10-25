import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <span>{dish.price} ETB</span>
      <div style={{ marginTop: "10px" }}>
        <AddToCartButton dish={dish} />
      </div>
    </div>
  );
}