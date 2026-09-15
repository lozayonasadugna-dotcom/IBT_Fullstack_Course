import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";
import Trails from "./pages/Trails";
import PopUpDetail from "./pages/PopUpDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useFavoritesStore } from "./store/useFavoritesStore";
import { Heart, Calendar, MapPin, ArrowRight, Search, Filter } from "lucide-react";

function Home() {
  const [popups, setPopups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/popups.json")
      .then((res) => res.json())
      .then((data) => setPopups(data))
      .catch((err) => console.error("Failed to load popups:", err));
  }, []);

  // Filter logic
  const filteredPopups = popups.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedNeighborhood === "All" || item.neighborhood === selectedNeighborhood;
    return matchesSearch && matchesDistrict;
  });

  const neighborhoods = ["All", ...new Set(popups.map((p) => p.neighborhood))];

  return (
    <div>
      {/* Enhanced Hero Section with Bold High-Contrast Text */}
      <section style={{
        position: "relative",
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem 2rem",
        borderRadius: "24px",
        overflow: "hidden",
        marginBottom: "4rem",
        backgroundImage: `linear-gradient(180deg, rgba(10, 15, 12, 0.65) 0%, rgba(10, 15, 12, 0.95) 100%), url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
          <span className="category-label" style={{ marginBottom: "1rem", display: "inline-block", letterSpacing: "2px" }}>
            CURATED CULINARY EXPERIENCES
          </span>
          
          {/* Bigger, Bolder Headline */}
          <h1 className="serif-heading" style={{
            fontSize: "clamp(3rem, 6.5vw, 4.8rem)",
            lineHeight: "1.15",
            marginBottom: "1.5rem",
            color: "#ffffff",
            fontWeight: "800",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)"
          }}>
            Savor the Exquisite <br />
            <span style={{ fontStyle: "italic", fontWeight: "700", color: "var(--accent-gold)" }}>
              Flavors of Sheger
            </span>
          </h1>

          <p style={{
            color: "#e2e8f0",
            fontSize: "1.2rem",
            lineHeight: "1.7",
            marginBottom: "2.2rem",
            fontWeight: "400",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)"
          }}>
            Embark on an exclusive culinary journey through Addis Ababa’s finest secret pop-up dining events and artisanal neighborhood food trails.
          </p>

          <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/trails" className="btn-pill-gold" style={{ textDecoration: "none", padding: "0.85rem 1.8rem", fontSize: "1rem" }}>
              Explore Food Trails <ArrowRight size={18} />
            </Link>
            <a href="#popups" className="btn-pill-light" style={{ padding: "0.85rem 1.8rem", fontSize: "1rem" }}>
              Reserve a Pop-Up
            </a>
          </div>
        </div>
      </section>

      {/* Featured Pop-Up Events Section */}
      <section id="popups" style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <div>
            <span className="category-label">EXCLUSIVE EVENTS</span>
            <h2 className="serif-heading" style={{ fontSize: "2.4rem", marginTop: "0.4rem" }}>
              Upcoming Secret Suppers
            </h2>
          </div>

          {/* Search & Filter Controls */}
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", minWidth: "220px" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.55rem 0.8rem 0.55rem 2.3rem",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "20px",
                  color: "var(--text-primary)",
                  fontSize: "0.88rem",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Filter size={15} className="gold-accent" />
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                style={{
                  padding: "0.55rem 1rem",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "20px",
                  color: "var(--text-primary)",
                  fontSize: "0.88rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                {neighborhoods.map((district) => (
                  <option key={district} value={district}>
                    {district === "All" ? "All Neighborhoods" : district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Event Cards Grid */}
        {filteredPopups.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem", backgroundColor: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>No dining events match your search parameters.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem"
          }}>
            {filteredPopups.map((popup) => {
              const isFav = favorites.some((f) => f.id === popup.id);

              return (
                <div key={popup.id} style={{
                  backgroundColor: "var(--bg-card)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--border-color)",
                  transition: "transform 0.3s ease",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div style={{ position: "relative", height: "220px" }}>
                    <img
                      src={popup.image}
                      alt={popup.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <button
                      onClick={() => toggleFavorite(popup)}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(17, 22, 19, 0.75)",
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
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <MapPin size={14} className="gold-accent" /> {popup.neighborhood}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Calendar size={14} className="gold-accent" /> {popup.date}
                        </span>
                      </div>
                      <h3 className="serif-heading" style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>
                        {popup.title}
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.5", marginBottom: "1.2rem" }}>
                        {popup.description}
                      </p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
                      <span style={{ fontWeight: "600", fontSize: "1.1rem" }} className="gold-accent">
                        {popup.price}
                      </span>
                      <button
                        onClick={() => navigate(`/popup/${popup.id}`)}
                        className="btn-pill-gold"
                        style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}
                      >
                        Book Seat
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flexGrow: 1, maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "2rem 1.5rem", boxSizing: "border-box" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trails" element={<Trails />} />
                <Route
                  path="/popup/:id"
                  element={
                    <ProtectedRoute>
                      <PopUpDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}