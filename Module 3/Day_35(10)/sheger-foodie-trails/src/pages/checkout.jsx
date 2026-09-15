import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Checkout() {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const { addBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
    return sum + numericPrice * item.quantity;
  }, 0);

  const handlePayment = (e) => {
    e.preventDefault();

    cart.forEach((item) => {
      addBooking({
        ...item,
        bookingId: "SHG-" + Math.floor(100000 + Math.random() * 900000),
        bookingDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      });
    });

    setConfirmed(true);
    clearCart();
  };

  if (confirmed) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <h2 className="serif-heading" style={{ fontSize: "2.5rem", color: "var(--accent-gold)" }}>
          Seat Reserved!
        </h2>
        <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
          Your payment was processed and your pass is active in your profile.
        </p>
        <button onClick={() => navigate("/profile")} className="btn-pill-gold" style={{ marginTop: "2rem" }}>
          View My Bookings
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "650px", margin: "2rem auto" }}>
      <h2 className="serif-heading" style={{ fontSize: "2.2rem", marginBottom: "1.5rem" }}>
        Payment & Reservation
      </h2>

      {cart.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>Your cart is empty. Pick a secret supper experience first!</p>
      ) : (
        <div style={{ backgroundColor: "var(--bg-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Order Summary</h3>
          
          {cart.map((item) => {
            const itemPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
            const rowTotal = itemPrice * item.quantity;

            return (
              <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{item.title}</h4>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{item.price} per seat</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: "none", border: "none", color: "#ff6b6b", cursor: "pointer", padding: "0.2rem" }}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {/* Seat Quantity Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Seats:</span>
                    
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        border: "1px solid var(--accent-gold)",
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--accent-gold)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.4rem",
                        fontWeight: "bold",
                        lineHeight: "1"
                      }}
                      title="Decrease seats"
                    >
                      −
                    </button>
                    
                    <span style={{ fontWeight: "700", fontSize: "1.2rem", minWidth: "24px", textAlign: "center", color: "var(--text-primary)" }}>
                      {item.quantity}
                    </span>
                    
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        border: "1px solid var(--accent-gold)",
                        backgroundColor: "var(--accent-gold)",
                        color: "#000000",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.4rem",
                        fontWeight: "bold",
                        lineHeight: "1"
                      }}
                      title="Increase seats"
                    >
                      +
                    </button>
                  </div>

                  {/* Calculated Price */}
                  <span className="gold-accent" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {rowTotal.toLocaleString()} ETB
                  </span>
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "bold", marginTop: "1rem", marginBottom: "2rem" }}>
            <span>Grand Total:</span>
            <span className="gold-accent" style={{ fontSize: "1.4rem" }}>{total.toLocaleString()} ETB</span>
          </div>

          <h3 style={{ marginBottom: "1rem" }}>Select Payment Method</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2rem" }}>
            {["Telebirr", "CBE Birr", "Credit / Debit Card"].map((method) => {
              const val = method.toLowerCase().replace(/[^a-z]/g, "");
              return (
                <label key={val} style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: paymentMethod === val ? "var(--bg-primary)" : "transparent" }}>
                  <input
                    type="radio"
                    name="payment"
                    value={val}
                    checked={paymentMethod === val}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ accentColor: "var(--accent-gold)", transform: "scale(1.2)" }}
                  />
                  <span style={{ fontWeight: paymentMethod === val ? "bold" : "normal" }}>{method}</span>
                </label>
              );
            })}
          </div>

          <button onClick={handlePayment} className="btn-pill-gold" style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}>
            Confirm & Pay {total.toLocaleString()} ETB
          </button>
        </div>
      )}
    </div>
  );
}