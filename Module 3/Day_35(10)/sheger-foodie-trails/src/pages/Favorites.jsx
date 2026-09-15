import React from "react";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { Heart, Calendar, MapPin, Trash2, Compass } from "lucide-react";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "5rem 1rem" }}>
        <div style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem auto",
          color: "var(--text-muted)"
        }}>
          <Heart size={28} />
        </div>
        <h2 className="serif-heading" style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>
          No Saved Culinary Spots
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "420px", margin: "0 auto 2rem auto" }}>
          You haven't bookmarked any secret suppers or food trails yet. Click the heart icon on any card to save it here.
        </p>
        <Link to="/trails" className="btn-pill-gold" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <Compass size={16} /> Explore Trails
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "3rem" }}>
        <span className="category-label">YOUR COLLECTION</span>
        <h2 className="serif-heading" style={{ fontSize: "2.8rem", marginTop: "0.3rem" }}>
          Saved Experiences ({favorites.length})
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem"
      }}>
        {favorites.map((item) => (
          <div key={item.id} style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{ position: "relative", height: "200px" }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                onClick={() => toggleFavorite(item)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "rgba(17, 22, 19, 0.8)",
                  border: "none",
                  borderRadius: "50%",
                  padding: "0.6rem",
                  cursor: "pointer",
                  color: "#ff5252",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div style={{ padding: "1.5rem", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <MapPin size={14} className="gold-accent" /> {item.neighborhood}
                  </span>
                  {item.date && (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Calendar size={14} className="gold-accent" /> {item.date}
                    </span>
                  )}
                </div>
                <h3 className="serif-heading" style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5", marginBottom: "1.2rem" }}>
                  {item.description}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
                <span style={{ fontWeight: "600", fontSize: "1.05rem" }} className="gold-accent">
                  {item.price || "Free Trail"}
                </span>
                <button className="btn-pill-gold" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}