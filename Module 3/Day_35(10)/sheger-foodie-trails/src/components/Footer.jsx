import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{
      backgroundColor: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-color)",
      padding: "4rem 2.5rem 2rem 2.5rem",
      marginTop: "5rem"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "3rem",
        marginBottom: "3rem"
      }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d4af37, #8a6d1c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f0e0c"
            }}>
              <Sparkles size={18} />
            </div>
            <span style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.2rem",
              fontWeight: "bold",
              letterSpacing: "0.5px"
            }}>
              SHEGER <span className="gold-accent">FOODIE</span>
            </span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>
            Curating secret supper clubs, artisanal coffee walks, and culinary discovery trails across Addis Ababa.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <span className="category-label" style={{ display: "block", marginBottom: "1rem" }}>EXPLORE</span>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.92rem" }}>
            <li><Link to="/trails" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Neighborhood Trails</Link></li>
            <li><Link to="/favorites" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Saved Favorites</Link></li>
            <li><a href="/#popups" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Pop-Up Calendar</a></li>
          </ul>
        </div>

        {/* Neighborhoods Column */}
        <div>
          <span className="category-label" style={{ display: "block", marginBottom: "1rem" }}>NEIGHBORHOODS</span>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.92rem", color: "var(--text-muted)" }}>
            <li>Bole & Atlas</li>
            <li>Kazanchis & Menelik II</li>
            <li>Piassa & Arada</li>
            <li>Old Airport & Bisrate Gabriel</li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <span className="category-label" style={{ display: "block", marginBottom: "1rem" }}>VIP INVITATIONS</span>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem", lineHeight: "1.5" }}>
            Subscribe to receive private invitations for unlisted pop-up dining events.
          </p>
          {subscribed ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-gold)", fontSize: "0.9rem" }}>
              <Check size={16} /> You are on the invitation list.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "9999px",
                  padding: "0.6rem 1rem",
                  color: "var(--text-primary)",
                  fontSize: "0.85rem",
                  outline: "none",
                  width: "100%"
                }}
              />
              <button type="submit" className="btn-pill-gold" style={{ padding: "0.6rem 1rem", display: "flex", alignItems: "center" }}>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.8rem",
        color: "var(--text-muted)"
      }}>
        <span>© 2026 Sheger Foodie Trails. All rights reserved.</span>
        <span>Addis Ababa, Ethiopia</span>
      </div>
    </footer>
  );
}