import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";

export default function MessageBubblePopup({ onClose }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Keyframe Animations */}
      <style>{`
        @keyframes liveHeartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.05); }
          28% { transform: scale(1); }
          42% { transform: scale(1.05); }
          70% { transform: scale(1); }
          100% { transform: scale(1); }
        }

        @keyframes auraPulse {
          0% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.6); }
          70% { box-shadow: 0 0 0 18px rgba(197, 160, 89, 0); }
          100% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0); }
        }
      `}</style>

      {/* Message-Bubble Container */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 2500,
          maxWidth: "300px",
          padding: "1.2rem 1.5rem",
          backgroundColor: "var(--bg-card, #171d18)",
          color: "#ffffff",
          border: "2px solid var(--accent-gold, #c5a059)",
          
          /* Circular Message Bubble Shape */
          borderRadius: "32px 32px 6px 32px",
          
          /* Continuous Heartbeat and Pulse Aura */
          animation: isHovered 
            ? "none" 
            : "liveHeartbeat 2.2s ease-in-out infinite, auraPulse 2.2s infinite",
            
          /* Hover Transformation */
          transform: isHovered ? "scale(1.08) translateY(-6px) rotate(-1deg)" : "scale(1)",
          boxShadow: isHovered
            ? "0 20px 40px rgba(197, 160, 89, 0.4)"
            : "0 10px 25px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
          cursor: "pointer",
        }}
      >
        {/* Header & Close Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-gold, #c5a059)", fontWeight: "700", fontSize: "0.85rem" }}>
            <Sparkles size={16} /> Live Pop-Up Notice
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            style={{ background: "none", border: "none", color: "#888", cursor: "pointer", padding: 0 }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Text Body */}
        <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: "1.4", color: "#e2e8f0" }}>
          A secret supper host just posted 4 new seats in Kazanchis!
        </p>

        {/* Message Tail */}
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            right: "22px",
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