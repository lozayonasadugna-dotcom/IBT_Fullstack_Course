import { cookies } from "next/headers";

export default async function CheckoutPage() {
  // REQUIREMENT: Reading cookies() forces this route to be Dynamic (SSR) on every request
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value || "Guest Session";

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem 0" }}>
      <h2>Checkout & Order Summary</h2>
      <p style={{ marginTop: "1rem", color: "#444" }}>
        <strong>Current Session:</strong> {sessionToken}
      </p>
      
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #ddd" }}>
        <h3>Your Cart</h3>
        <p style={{ marginTop: "0.5rem", color: "#666" }}>1x Authentic Kitfo Special</p>
        <p style={{ fontWeight: "bold", marginTop: "1rem" }}>Total: 650 ETB</p>
        
        <button 
          style={{ marginTop: "1rem", padding: "0.6rem 1.2rem", background: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Confirm Order
        </button>
      </div>
      
      <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "1.5rem" }}>
        * Note: This route is rendered dynamically on every request because it accesses request-level cookies.
      </p>
    </div>
  );
}