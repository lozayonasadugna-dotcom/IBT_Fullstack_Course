import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Footprints,
  X,
  Sparkles,
  ChevronRight,
  Utensils,
  Navigation,
  CheckCircle2,
} from "lucide-react";

const expandedTrails = [
  {
    id: "kazanchis-coffee-crawl",
    title: "Kazanchis Heritage & Roastery Trail",
    neighborhood: "Kazanchis",
    distance: "1.8 km",
    duration: "2.5 Hours",
    stopsCount: "4 Stops",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop",
    shortDesc: "A guided coffee journey through traditional dark roasts, manual pour-overs, and local pastries.",
    fullDesc: "Step into the heart of Ethiopian coffee history. This trail guides you through iconic roasteries in Kazanchis, teaching you traditional bean grading, roasting aromas, and pairing Ethiopian pastries with single-origin beans.",
    bestTime: "Morning (8:30 AM - 11:30 AM)",
    stops: [
      { name: "Tomoca Coffee", highlight: "Dark roast macchiato & roasted bean sampling", duration: "30 mins" },
      { name: "Kazanchis Heritage Pastry", highlight: "Freshly baked baklava & spris", duration: "25 mins" },
      { name: "Bole Road Coffee Lab", highlight: "Manual V60 pour-over demonstration", duration: "40 mins" },
      { name: "Traditional Buna Ceremony Spot", highlight: "Frankincense, popcorn & 3-round coffee ceremony", duration: "45 mins" },
    ],
  },
  {
    id: "piassa-historic-bakery",
    title: "Piassa Historic Bakery & Pastry Route",
    neighborhood: "Piassa",
    distance: "2.2 km",
    duration: "3.0 Hours",
    stopsCount: "4 Stops",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
    shortDesc: "Discover vintage Italian-influenced bakeries and historic sweet shops operating since the 1950s.",
    fullDesc: "Take a walking tour through Piassa's architectural landmarks while visiting vintage bakeries. Taste historic recipes passed down through generations, including classic mille-feuille, gelato, and artisanal spiced teas.",
    bestTime: "Late Afternoon (3:00 PM - 6:00 PM)",
    stops: [
      { name: "Enrico Pastry", highlight: "Classic mille-feuille & espresso", duration: "35 mins" },
      { name: "Italian Quarter Gelateria", highlight: "Artisanal seasonal fruit gelato", duration: "20 mins" },
      { name: "Piassa Heritage Tearoom", highlight: "Spiced black tea with habesha sweets", duration: "30 mins" },
      { name: "Old City Artisan Bakery", highlight: "Sourdough baguettes & cardamom buns", duration: "30 mins" },
    ],
  },
  {
    id: "bole-gourmet-fusion",
    title: "Bole Modern Fusion & Tasting Walk",
    neighborhood: "Bole",
    distance: "1.5 km",
    duration: "2.0 Hours",
    stopsCount: "3 Stops",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
    shortDesc: "A sleek culinary walk highlighting contemporary chef pop-ups, tapas, and mocktail mixology.",
    fullDesc: "Bole's dining scene is fast-evolving. Experience local ingredients reimagined by modern chefs in 3 distinct tasting venues, featuring Ethiopian tapas, mocktail flights, and fusion desserts.",
    bestTime: "Evening (5:30 PM - 8:00 PM)",
    stops: [
      { name: "Atlas Fusion Bistro", highlight: "Berbere-infused sliders & local appetizers", duration: "40 mins" },
      { name: "Edna Craft Mixology Bar", highlight: "Botanical hibiscus & honey ginger mocktails", duration: "35 mins" },
      { name: "Bole Dessert Lounge", highlight: "Teff-flour chocolate lava cake", duration: "35 mins" },
    ],
  },
  {
    id: "merkato-spice-street-eats",
    title: "Merkato Spice & Street Eats Exploration",
    neighborhood: "Merkato",
    distance: "3.0 km",
    duration: "3.5 Hours",
    stopsCount: "5 Stops",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop",
    shortDesc: "Immersion into open-air spice markets, traditional injera bakeries, and vibrant street snacks.",
    fullDesc: "Venture through Africa’s largest open-air market with a seasoned local guide. Learn to identify rare mountain spices, watch large-scale injera baking, and sample freshly roasted nuts and traditional snacks.",
    bestTime: "Morning (9:00 AM - 12:30 PM)",
    stops: [
      { name: "Spice Market Quarter", highlight: "Guided smelling tour of Korarima, Berbere & Mitmita", duration: "45 mins" },
      { name: "Injera Mitad Cooperative", highlight: "Clay-mitad baking demonstration & fresh tasting", duration: "30 mins" },
      { name: "Street Roasted Grain Depot", highlight: "Kolo (roasted barley) & peanut tasting", duration: "20 mins" },
      { name: "Traditional Juice House", highlight: "Layered Mango, Avocado & Papaya Spris", duration: "25 mins" },
      { name: "Merkato Tea Corner", highlight: "Fresh mint & cinnamon herbal tea", duration: "20 mins" },
    ],
  },
  {
    id: "sarbet-dessert-tea",
    title: "Sarbet Artisanal Dessert & Tea Trail",
    neighborhood: "Sarbet",
    distance: "1.2 km",
    duration: "2.0 Hours",
    stopsCount: "3 Stops",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000&auto=format&fit=crop",
    shortDesc: "A relaxed, walkable trail focusing on gourmet chocolates, herbal infusions, and fruit tarts.",
    fullDesc: "Unwind in leafy Sarbet. This gentle walking trail visits boutique sweet shops, hand-crafted chocolate ateliers, and serene garden tearooms.",
    bestTime: "Afternoon (2:00 PM - 4:30 PM)",
    stops: [
      { name: "Sarbet Chocolate House", highlight: "Single-origin dark chocolate truffles", duration: "30 mins" },
      { name: "Garden Tea Pavilion", highlight: "Organic Ethiopian mountain herbal teas", duration: "45 mins" },
      { name: "Artisan Fruit Tart Bakery", highlight: "Seasonal passionfruit & mango tarts", duration: "35 mins" },
    ],
  },
  {
    id: "old-airport-culinary-walk",
    title: "Old Airport International Tasting Trail",
    neighborhood: "Old Airport",
    distance: "2.0 km",
    duration: "2.5 Hours",
    stopsCount: "4 Stops",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
    shortDesc: "Explore global culinary influence blended with Ethiopian hospitalities in residential Old Airport.",
    fullDesc: "Discover high-end hidden courtyards serving international mezze, artisan sourdoughs, and specialty coffees in one of Addis' most peaceful residential districts.",
    bestTime: "Lunch (12:00 PM - 2:30 PM)",
    stops: [
      { name: "Courtyard Mediterranean Cafe", highlight: "Hummus, flatbreads & olive oil tasting", duration: "35 mins" },
      { name: "Old Airport Coffee Roastery", highlight: "Cold brew coffee & honey tonic", duration: "30 mins" },
      { name: "Wood-fired Pizzeria Corner", highlight: "Mini sourdough pizzas with local cheeses", duration: "40 mins" },
      { name: "Boutique Pastry Corner", highlight: "French macarons & herbal infusion", duration: "25 mins" },
    ],
  },
];

export default function Trails() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedTrail, setSelectedTrail] = useState(null);

  return (
    <div style={{ paddingBottom: "3rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="category-label">SELF-GUIDED & GROUP ROUTES</span>
        <h1 className="serif-heading" style={{ fontSize: "2.6rem", marginTop: "0.4rem" }}>
          Sheger Culinary Trails
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: "650px", fontSize: "1.05rem", marginTop: "0.5rem" }}>
          Tap on any trail to open full route details, stop-by-stop timelines, and recommended visiting times.
        </p>
      </div>

      {/* Grid of Trails */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
        }}
      >
        {expandedTrails.map((trail) => {
          const isHovered = hoveredId === trail.id;

          return (
            <div
              key={trail.id}
              onMouseEnter={() => setHoveredId(trail.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedTrail(trail)}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "18px",
                overflow: "hidden",
                border: isHovered
                  ? "1px solid var(--accent-gold)"
                  : "1px solid var(--border-color)",
                transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                boxShadow: isHovered
                  ? "0 16px 30px rgba(197, 160, 89, 0.2)"
                  : "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Image Container */}
              <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                <img
                  src={trail.image}
                  alt={trail.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.4s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    backgroundColor: "rgba(10, 15, 12, 0.85)",
                    backdropFilter: "blur(6px)",
                    color: "var(--accent-gold)",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.78rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <MapPin size={12} /> {trail.neighborhood}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.4rem", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 className="serif-heading" style={{ fontSize: "1.35rem", marginBottom: "0.6rem" }}>
                    {trail.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5", marginBottom: "1.2rem" }}>
                    {trail.shortDesc}
                  </p>
                </div>

                {/* Trail Meta stats */}
                <div style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Footprints size={14} className="gold-accent" /> {trail.distance}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Clock size={14} className="gold-accent" /> {trail.duration}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Utensils size={14} className="gold-accent" /> {trail.stopsCount}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "var(--accent-gold)",
                      fontWeight: "600",
                      fontSize: "0.88rem",
                    }}
                  >
                    <span>Inspect Trail Itinerary</span>
                    <ChevronRight
                      size={18}
                      style={{
                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL POPUP WINDOW */}
      {selectedTrail && (
        <div
          onClick={() => setSelectedTrail(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--accent-gold)",
              borderRadius: "24px",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              position: "relative",
              animation: "popupScale 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
            }}
          >
            {/* Modal Header Image */}
            <div style={{ position: "relative", height: "220px" }}>
              <img
                src={selectedTrail.image}
                alt={selectedTrail.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                onClick={() => setSelectedTrail(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  border: "none",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} />
              </button>
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  backgroundColor: "var(--accent-gold)",
                  color: "#000000",
                  padding: "0.3rem 0.9rem",
                  borderRadius: "20px",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Sparkles size={14} /> {selectedTrail.neighborhood} Trail
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "2rem" }}>
              <h2 className="serif-heading" style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>
                {selectedTrail.title}
              </h2>

              <p style={{ color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                {selectedTrail.fullDesc}
              </p>

              {/* Key Highlights Banner */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  backgroundColor: "var(--bg-primary)",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "1px solid var(--border-color)",
                  marginBottom: "1.8rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: "120px" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    WALKING DISTANCE
                  </span>
                  <strong style={{ fontSize: "1.1rem" }} className="gold-accent">
                    {selectedTrail.distance}
                  </strong>
                </div>
                <div style={{ flex: 1, minWidth: "120px" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    ESTIMATED TIME
                  </span>
                  <strong style={{ fontSize: "1.1rem" }} className="gold-accent">
                    {selectedTrail.duration}
                  </strong>
                </div>
                <div style={{ flex: 1, minWidth: "160px" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    RECOMMENDED WINDOW
                  </span>
                  <strong style={{ fontSize: "0.95rem" }}>{selectedTrail.bestTime}</strong>
                </div>
              </div>

              {/* Stops Timeline */}
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Navigation size={18} className="gold-accent" /> Route Itinerary & Stops
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {selectedTrail.stops.map((stop, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      padding: "1rem",
                      borderRadius: "12px",
                      borderLeft: "3px solid var(--accent-gold)",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: "var(--accent-gold)",
                        color: "#000000",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ fontSize: "1.05rem" }}>{stop.name}</strong>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                          {stop.duration}
                        </span>
                      </div>
                      <p style={{ margin: "0.3rem 0 0 0", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                        {stop.highlight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedTrail(null)}
                className="btn-pill-gold"
                style={{ width: "100%", padding: "0.9rem", marginTop: "2rem", fontSize: "1rem" }}
              >
                Close Trail Overview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe Animation Style */}
      <style>{`
        @keyframes popupScale {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}