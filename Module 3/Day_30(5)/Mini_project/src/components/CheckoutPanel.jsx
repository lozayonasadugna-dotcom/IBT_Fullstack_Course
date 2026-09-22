import { useCart } from "../context/CartContext";

export function CheckoutPanel() {
  const { items, dispatch, total } = useCart();

  return (
    <aside
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#f8fafc",
        marginTop: "24px",
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: "1.25rem" }}>Order Summary</h2>
      
      {items.length === 0 ? (
        <p style={{ color: "#64748b" }}>Your cart is empty. Select items from the menu.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0" }}>
            {items.map((item, idx) => (
              <li
                key={`${item.id}-${idx}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <span>
                  <strong>{item.name}</strong> — {item.price} ETB
                </span>
                <button
                  onClick={() => dispatch({ type: "remove", id: item.id })}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "16px",
            }}
          >
            <span>Total:</span>
            <span>{total} ETB</span>
          </div>

          <button
            onClick={() => dispatch({ type: "clear" })}
            style={{
              width: "100%",
              backgroundColor: "#64748b",
              color: "#ffffff",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Clear Cart
          </button>
        </>
      )}
    </aside>
  );
}