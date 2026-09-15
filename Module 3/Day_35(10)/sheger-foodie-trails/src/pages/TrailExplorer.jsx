import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { Heart, MapPin, Star, Filter, RotateCcw } from "lucide-react";

export default function TrailExplorer() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);

  const activeNeighborhood = searchParams.get("area") || "All";
  const activeCategory = searchParams.get("category") || "All";

  useEffect(() => {
    fetch("/data/venues.json")
      .then((res) => res.json())
      .then((data) => {
        setVenues(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching venues:", err);
        setLoading(false);
      });
  }, []);

  const neighborhoods = ["All", "Bole", "Kazanchis", "Piassa"];
  const categories = ["All", "Coffee & Pastry", "Traditional Feast", "Artisanal Dining"];

  const filteredVenues = venues.filter((venue) => {
    const matchArea = activeNeighborhood === "All" || venue.neighborhood === activeNeighborhood;
    const matchCat = activeCategory === "All" || venue.category === activeCategory;
    return matchArea && matchCat;
  });

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "All") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="category-label">CURATED ROUTES</span>
        <h1 className="serif-heading" style={{ fontSize: "2.8rem", marginTop: "0.3rem" }}>
          Food Trails Explorer
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginTop: "0.5rem" }}>
          Filter neighborhood spots across Addis Ababa by district or dining style.
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{
        backgroundColor: "var(--bg-card)",
        padding: "1.5rem",
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
        marginBottom: "3rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem"
      }}>
        {/* District Filter */}
        <div>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.6rem" }}>
            SELECT NEIGHBORHOOD
          </span>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {neighborhoods.map((area) => (
              <button
                key={area}
                onClick={() => updateFilter("area", area)}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  border: "1px solid var(--border-color)",
                  cursor: "pointer",
                  backgroundColor: activeNeighborhood === area ? "var(--accent-gold)" : "var(--bg-primary)",
                  color: activeNeighborhood === area ? "#0f0e0c" : "var(--text-primary)",
                  fontWeight: activeNeighborhood === area ? "600" : "400",
                  transition: "all 0.2s ease"
                }}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.6rem" }}>
            SELECT CATEGORY
          </span>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateFilter("category", cat)}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  border: "1px solid var(--border-color)",
                  cursor: "pointer",
                  backgroundColor: activeCategory === cat ? "var(--accent-gold)" : "var(--bg-primary)",
                  color: activeCategory === cat ? "#0f0e0c" : "var(--text-primary)",
                  fontWeight: activeCategory === cat ? "600" : "400",
                  transition: "all 0.2s ease"
                }}
              >
                {cat}
              </button>
            ))}

            {(activeNeighborhood !== "All" || activeCategory !== "All") && (
              <button
                onClick={resetFilters}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  marginLeft: "0.5rem"
                }}
              >
                <RotateCcw size={14} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          Loading food spots...
        </div>
      ) : filteredVenues.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "4rem 1rem",
          backgroundColor: "var(--bg-card)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)"
        }}>
          <Filter size={32} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
          <h3 className="serif-heading" style={{ fontSize: "1.8rem" }}>No matching spots found</h3>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Try resetting your active filters to view more culinary options.
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem"
        }}>
          {filteredVenues.map((venue) => {
            const isFav = favorites.some((f) => f.id === venue.id);

            return (
              <div key={venue.id} style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--border-color)",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ position: "relative", height: "200px" }}>
                  <img
                    src={venue.image}
                    alt={venue.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <button
                    onClick={() => toggleFavorite(venue)}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(17, 22, 19, 0.7)",
                      backdropFilter: "blur(8px)",
                      border: "none",
                      borderRadius: "50%",
                      padding: "0.6rem",
                      cursor: "pointer",
                      color: isFav ? "var(--accent-gold)" : "#ffffff",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Heart size={18} fill={isFav ? "var(--accent-gold)" : "none"} />
                  </button>
                </div>

                <div style={{ padding: "1.5rem", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <MapPin size={14} className="gold-accent" /> {venue.neighborhood}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" /> {venue.rating}
                      </span>
                    </div>

                    <h3 className="serif-heading" style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>
                      {venue.name}
                    </h3>

                    <span className="category-label" style={{ fontSize: "0.68rem", display: "inline-block", marginBottom: "0.8rem" }}>
                      {venue.category}
                    </span>

                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5", marginBottom: "1.2rem" }}>
                      {venue.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {venue.address}
                    </span>
                    <span style={{ fontWeight: "600" }} className="gold-accent">
                      {venue.priceRange}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}