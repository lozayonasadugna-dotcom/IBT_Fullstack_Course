import { useFetch } from "../hooks/useFetch";

export function FeaturedDishes() {
  const { data: dishes, loading } = useFetch("/dishes.json");

  if (loading) return <p>Loading featured items...</p>;

  const featured = dishes ? dishes.slice(0, 2) : [];

  return (
    <div style={{ padding: "10px", backgroundColor: "#f4f4f9", borderRadius: "6px" }}>
      <h4>Featured Specials</h4>
      <ul>
        {featured.map((item) => (
          <li key={item.id}>
            {item.name} — {item.price} ETB
          </li>
        ))}
      </ul>
    </div>
  );
}