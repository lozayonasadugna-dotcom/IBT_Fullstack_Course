import React, { useState } from "react";
import { Clock, Calendar, Sparkles, X } from "lucide-react";

const samplePopups = [
  { id: 1, title: "Secret Taco Night", timeFrame: "hour", timeLabel: "Starting in 30 mins", date: "Today, 6:00 PM", location: "Bole" },
  { id: 2, title: "Artisan Bread & Wine", timeFrame: "today", timeLabel: "Tonight", date: "Today, 8:00 PM", location: "Kazanchis" },
  { id: 3, title: "Jazz & Tej Tasting", timeFrame: "week", timeLabel: "This Friday", date: "Fri, Sep 18", location: "Piassa" },
];

export default function UpcomingPopupWidget() {
  const [filter, setFilter] = useState("today");
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!isOpen) return null;

  const filtered = samplePopups.filter((item) => item.timeFrame === filter);

  return (
    <>
      {/* Keyframe Animations for Heartbeat & Glowing Aura */}
      <style>{`
        @keyframes liveHeartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.04); }
          28% { transform: scale(1); }
          42% { transform: scale(1.04); }
          70% { transform: scale(1); }
          100% { transform: scale(1); }
        }

        @keyframes auraPulse {
          0% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.6); }
          70% { box-shadow: 0 0 0 16px rgba(197, 160, 89, 0); }
          100% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0); }
        }
      `}</style>

      {/* Main Container */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "20px",
          width: "320px",
          backgroundColor: "var(--bg-card, #121814)",
          border: "2px solid var(--accent-gold, #c5a059)",
          
          /* Circle-ish Message Bubble Shape */
          borderRadius: "32px 32px 6px 32px",
          padding: "1.2rem",
          zIndex: 1000,
          color: "var(--text-primary, #ffffff)",
          
          /* Live Heartbeat and Glow Aura (Pauses on Hover for Interaction) */
          animation: isHovered
            ? "none"
            : "liveHeartbeat 2.2s ease-in-out infinite, auraPulse 2.2s infinite",
            
          /* Hover Transformation */
          transform: isHovered ? "scale(1.06) translateY(-6px) rotate(-1deg)" : "scale(1)",
          boxShadow: isHovered
            ? "0 20px 40px rgba(197, 160, 89, 0.4)"
            : "0 10px 25px rgba(0,0,0,0.4)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={18} style={{ color: "var(--accent-gold, #c5a059)" }} />
            <strong style={{ fontSize: "0.95rem" }}>Happening Next</strong>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: "none", border: "none", color: "var(--text-muted, #888)", cursor: "pointer" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Time Filter Tabs */}
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem" }}>
          {[
            { key: "hour", label: "This Hour" },
            { key: "today", label: "Today" },
            { key: "week", label: "This Week" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                flex: 1,
                padding: "0.3rem 0.2rem",
                fontSize: "0.75rem",
                borderRadius: "6px",
                border: filter === tab.key ? "1px solid var(--accent-gold, #c5a059)" : "1px solid transparent",
                backgroundColor: filter === tab.key ? "var(--accent-gold, #c5a059)" : "rgba(255,255,255,0.05)",
                color: filter === tab.key ? "#000" : "var(--text-primary, #fff)",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {filtered.length === 0 ? (
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted, #888)", textAlign: "center" }}>
              No pop-ups scheduled for this timeframe.
            </p>
          ) : (
            filtered.map((popup) => (
              <div
                key={popup.id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  padding: "0.8rem",
                  borderRadius: "8px",
                  borderLeft: "3px solid var(--accent-gold, #c5a059)",
                }}
              >
                <h5 style={{ margin: "0 0 0.3rem 0", fontSize: "0.9rem" }}>{popup.title}</h5>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", fontSize: "0.75rem", color: "var(--text-muted, #aaa)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                    <Clock size={12} /> {popup.timeLabel}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                    <Calendar size={12} /> {popup.location}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Bubble Tail */}
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            right: "24px",
            width: "0",
            height: "0",
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "10px solid var(--accent-gold, #c5a059)",
          }}
        />
      </div>
    </>
  );
}