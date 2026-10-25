export default function DishPage({ params }) {
  const { id } = params;

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Dish Details</h1>
      <p>You are viewing the delicious: <strong>{id}</strong></p>
    </main>
  );
}