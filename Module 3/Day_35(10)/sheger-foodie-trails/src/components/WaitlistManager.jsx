import React, { useState } from "react";
import { Bell, Users, CheckCircle2 } from "lucide-react";

export default function WaitlistManager({ availableSeats = 0, eventName = "Kazanchis Secret Supper" }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoinWaitlist = (e) => {
    e.preventDefault();
    if (!email) return;
    setJoined(true);
  };

  const isSoldOut = availableSeats === 0;

  return (
    <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "20px", padding: "2rem", border: "1px solid var(--border-color)", marginTop: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
        <div style={{ backgroundColor: isSoldOut ? "rgba(255, 107, 107, 0.1)" : "rgba(46, 204, 113, 0.1)", padding: "0.6rem", borderRadius: "50%", color: isSoldOut ? "#ff6b6b" : "#2ecc71" }}>
          <Users size={20} />
        </div>
        <div>
          <span className="category-label">CAPACITY & INVENTORY</span>
          <h3 className="serif-heading" style={{ fontSize: "1.4rem", margin: 0 }}>
            {isSoldOut ? "Supper Sold Out - Join Waitlist" : `${availableSeats} Seats Remaining`}
          </h3>
        </div>
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
        {isSoldOut 
          ? `All passes for ${eventName} have been claimed. Join the priority waitlist to receive instant alerts if any seats open up.`
          : `Secure your seats quickly before this secret supper reaches full capacity.`
        }
      </p>

      {isSoldOut && (
        <div>
          {!joined ? (
            <form onSubmit={handleJoinWaitlist} style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                style={{
                  flex: 1,
                  minWidth: "240px",
                  padding: "0.8rem 1rem",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border-color)",
                  color: "inherit",
                  fontSize: "0.9rem"
                }}
                required
              />
              <button type="submit" className="btn-pill-gold" style={{ padding: "0.8rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Bell size={16} /> Join Priority Waitlist
              </button>
            </form>
          ) : (
            <div style={{ padding: "1rem", backgroundColor: "rgba(46, 204, 113, 0.1)", borderRadius: "12px", color: "#2ecc71", display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem" }}>
              <CheckCircle2 size={18} /> You're on the priority waitlist! We'll notify you immediately if a cancellation occurs.
            </div>
          )}
        </div>
      )}
    </div>
  );
}