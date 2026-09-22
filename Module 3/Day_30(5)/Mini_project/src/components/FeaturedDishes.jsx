import { useFetch } from "../hooks/useFetch";

export function FeaturedDishes() {
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) return <p style={{ color: "#888" }}>Loading featured dishes...</p>;
  if (error) return null;

  // Take the first 2 dishes as featured specials
  const featured = dishes ? dishes.slice(0, 2) : [];

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f4f4f9",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        color: "#1e293b",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>🌟 Today's Featured Specials</h3>
      <ul style={{ margin: 0, paddingLeft: "20px" }}>
        {featured.map((item) => (
          <li key={item.id} style={{ marginBottom: "4px", fontWeight: "500" }}>
            {item.name} — <span style={{ color: "#16a34a" }}>{item.price} ETB</span>
          </li>
        ))}
      </ul>
    </div>
  );
}