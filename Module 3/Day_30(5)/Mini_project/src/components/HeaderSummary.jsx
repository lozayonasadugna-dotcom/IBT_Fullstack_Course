import { useCart } from "../context/CartContext";

export function HeaderSummary() {
  const { items, total } = useCart();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "0.95rem",
        fontWeight: "600",
      }}
    >
      <span
        style={{
          padding: "4px 10px",
          backgroundColor: "#007bff",
          color: "#ffffff",
          borderRadius: "20px",
          fontSize: "0.85rem",
        }}
      >
        🛒 {items.length} {items.length === 1 ? "Item" : "Items"}
      </span>
      <span>Total: {total} ETB</span>
    </div>
  );
}
