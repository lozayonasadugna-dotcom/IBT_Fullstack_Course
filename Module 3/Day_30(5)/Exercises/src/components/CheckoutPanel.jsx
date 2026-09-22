import { useCart } from "../context/CartContext";

export function CheckoutPanel() {
  const { items, dispatch, total } = useCart();

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ marginTop: "20px", borderTop: "2px solid #ccc", paddingTop: "12px" }}>
      <h2>Checkout Panel</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "6px" }}>
            {item.name} — {item.price} ETB{" "}
            <button onClick={() => dispatch({ type: "remove", index: idx })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total Cost: {total} ETB</h3>
      <button onClick={() => dispatch({ type: "clear" })}>Clear Cart</button>
    </div>
  );
}