import { useCart } from "../context/CartContext";

export function CartBadge() {
  const { items } = useCart();

  return (
    <div
      style={{
        backgroundColor: "#2563eb",
        color: "#ffffff",
        padding: "8px 16px",
        borderRadius: "20px",
        fontWeight: "600",
        fontSize: "0.95rem",
      }}
    >
      🛒 Cart ({items.length})
    </div>
  );
}