import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { MapPin, Calendar, Clock, User, ArrowLeft } from "lucide-react";

export default function PopUpDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    fetch("/data/popups.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === id);
        setPopup(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch event details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBookNow = () => {
    if (!popup) return;
    addToCart(popup, seats);
    
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading event details...</p>
      </div>
    );
  }

  if (!popup) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h2 className="serif-heading" style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Event Not Found
        </h2>
        <button onClick={() => navigate("/")} className="btn-pill-gold">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "3rem" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          color: "var(--text-muted)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.95rem",
        }}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid var(--border-color)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <img
          src={popup.image}
          alt={popup.title}
          style={{ width: "100%", height: "360px", objectFit: "cover" }}
        />

        <div style={{ padding: "2rem" }}>
          <span className="category-label">{popup.neighborhood} • EXCLUSIVE</span>
          <h1 className="serif-heading" style={{ fontSize: "2.5rem", margin: "0.5rem 0 1rem" }}>
            {popup.title}
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              marginBottom: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Calendar size={16} className="gold-accent" /> {popup.date}
            </span>
            {popup.time && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Clock size={16} className="gold-accent" /> {popup.time}
              </span>
            )}
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <MapPin size={16} className="gold-accent" /> {popup.neighborhood}
            </span>
            {popup.host && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <User size={16} className="gold-accent" /> {popup.host}
              </span>
            )}
          </div>

          <p
            style={{
              lineHeight: "1.8",
              color: "var(--text-primary)",
              fontSize: "1.05rem",
              marginBottom: "2rem",
            }}
          >
            {popup.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              backgroundColor: "var(--bg-primary)",
              padding: "1.2rem 1.5rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
            }}
          >
            <div>
              <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                PRICE PER SEAT
              </span>
              <span className="gold-accent" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {popup.price}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Seats:
                <select
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  style={{
                    marginLeft: "0.5rem",
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "var(--bg-card)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "6px",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>

              <button onClick={handleBookNow} className="btn-pill-gold">
                Reserve {seats} {seats > 1 ? "Seats" : "Seat"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}