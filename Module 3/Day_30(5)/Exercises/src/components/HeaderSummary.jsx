import { useCart } from "../context/CartContext";

export function HeaderSummary() {
  const { items } = useCart();

  return (
    <div
      style={{
        padding: "6px 14px",
        backgroundColor: "#007bff",
        color: "#fff",
        borderRadius: "16px",
        fontWeight: "bold",
      }}
    >
      🛒 Items: {items.length}
    </div>
  );
}