import React, { useState } from "react";
import { MapPin, Sparkles, Navigation, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Addis Ababa neighborhoods with center coordinates & mock map preview data
const neighborhoods = [
  { id: "bole", name: "Bole", count: 3, desc: "The vibrant heartbeat of upscale dining, cafes, and nightlife.", topCoord: "35%", leftCoord: "65%" },
  { id: "kazanchis", name: "Kazanchis", count: 2, desc: "Historic charm meeting modern culinary fusion spots.", topCoord: "50%", leftCoord: "45%" },
  { id: "piassa", name: "Piassa", count: 2, desc: "Classic cafes, retro architecture, and authentic traditional spice hubs.", topCoord: "25%", leftCoord: "30%" },
  { id: "old-airport", name: "Old Airport", count: 1, desc: "Quiet upscale residences hosting exclusive garden suppers.", topCoord: "70%", leftCoord: "20%" },
  { id: "ayat", name: "Ayat", count: 1, desc: "Emerging suburban community spaces and modern home kitchens.", topCoord: "40%", leftCoord: "85%" },
];

export default function NeighborhoodMap({ popups = [] }) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Bole");
  const navigate = useNavigate();

  // Filter popups belonging to the selected neighborhood
  const activePopups = popups.filter(
    (p) => p.neighborhood?.toLowerCase() === selectedNeighborhood.toLowerCase()
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem 0" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="category-label" style={{ letterSpacing: "2px", display: "inline-block", marginBottom: "0.5rem" }}>
          SHEGER GEOGRAPHIC
        </span>
        <h1 className="serif-heading" style={{ fontSize: "2.5rem", margin: "0 0 0.5rem 0" }}>
          Interactive Neighborhood Map
        </h1>
        <p style={{ color: "var(--text-muted, #a0aec0)", fontSize: "1rem" }}>
          Explore secret supper locations across the sub-cities of Addis Ababa. Exact addresses are revealed post-booking.
        </p>
      </div>

      {/* Map Layout Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Simulated Interactive Map Box */}
        <div
          style={{
            position: "relative",
            backgroundColor: "#111813",
            border: "2px solid var(--accent-gold, #c5a059)",
            borderRadius: "24px",
            height: "460px",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "radial-gradient(circle, rgba(197, 160, 89, 0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {/* Map Compass / Overlay Watermark */}
          <div style={{ position: "absolute", top: "20px", left: "20px", color: "var(--accent-gold, #c5a059)", display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "600", fontSize: "0.85rem" }}>
            <Navigation size={16} /> Addis Ababa, Ethiopia Grid
          </div>

          {/* Interactive Neighborhood Pins */}
          {neighborhoods.map((n) => {
            const isSelected = selectedNeighborhood.toLowerCase() === n.name.toLowerCase();
            return (
              <button
                key={n.id}
                onClick={() => setSelectedNeighborhood(n.name)}
                style={{
                  position: "absolute",
                  top: n.topCoord,
                  left: n.leftCoord,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: isSelected ? "var(--accent-gold, #c5a059)" : "var(--bg-card, #1c261e)",
                  color: isSelected ? "#000000" : "#ffffff",
                  border: "2px solid var(--accent-gold, #c5a059)",
                  borderRadius: "30px",
                  padding: "0.5rem 0.9rem",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: isSelected ? "0 0 20px rgba(197, 160, 89, 0.6)" : "0 6px 15px rgba(0,0,0,0.4)",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex: isSelected ? 10 : 2,
                }}
              >
                <MapPin size={14} /> {n.name} ({n.count})
              </button>
            );
          })}
        </div>

        {/* Neighborhood Details & Events Feed */}
        <div
          style={{
            backgroundColor: "var(--bg-card, #171d18)",
            border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
            borderRadius: "24px",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            minHeight: "460px",
          }}
        >
          <div>
            <span style={{ color: "var(--accent-gold, #c5a059)", fontSize: "0.78rem", fontWeight: "700", letterSpacing: "1px" }}>
              SELECTED DISTRICT
            </span>
            <h2 className="serif-heading" style={{ fontSize: "2rem", margin: "0.2rem 0 0.5rem 0" }}>
              {selectedNeighborhood}
            </h2>
            <p style={{ color: "var(--text-muted, #a0aec0)", fontSize: "0.92rem", lineHeight: "1.5" }}>
              {neighborhoods.find((n) => n.name.toLowerCase() === selectedNeighborhood.toLowerCase())?.desc}
            </p>
          </div>

          <hr style={{ borderColor: "var(--border-color, rgba(255,255,255,0.1))", margin: "0" }} />

          <h4 style={{ fontSize: "1rem", margin: "0", fontWeight: "600" }}>
            Pop-Ups Happening in {selectedNeighborhood} ({activePopups.length})
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", maxHeight: "240px", paddingRight: "0.4rem" }}>
            {activePopups.length === 0 ? (
              <p style={{ color: "var(--text-muted, #888)", fontSize: "0.9rem", fontStyle: "italic" }}>
                No active secret suppers listed in this neighborhood right now. Try checking Bole or Piassa!
              </p>
            ) : (
              activePopups.map((popup) => (
                <div
                  key={popup.id}
                  onClick={() => navigate(`/popup/${popup.id}`)}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-color, rgba(255,255,255,0.08))",
                    borderRadius: "14px",
                    padding: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <div>
                    <h5 style={{ margin: "0 0 0.3rem 0", fontSize: "0.95rem", fontWeight: "600" }}>{popup.title}</h5>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "var(--text-muted, #aaa)" }}>
                      <Calendar size={12} className="gold-accent" /> {popup.date} • <strong style={{ color: "var(--accent-gold)" }}>{popup.price}</strong>
                    </span>
                  </div>
                  <ArrowRight size={16} style={{ color: "var(--accent-gold, #c5a059)" }} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}
