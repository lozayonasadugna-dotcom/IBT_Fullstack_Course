import DishCard from "./DishCard";

export default function DishList({ dishes }) {
  return (
    <div style={{ display: "grid", gap: "15px" }}>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}