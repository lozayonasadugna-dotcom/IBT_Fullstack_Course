import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";
import Trails from "./pages/Trails";
import PopUpDetail from "./pages/PopUpDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Checkout from "./pages/checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useFavoritesStore } from "./store/useFavoritesStore";
import { Heart, Calendar, MapPin, ArrowRight, Search, Filter, X, Sparkles, Utensils, Clock, Users } from "lucide-react";
import UpcomingPopupWidget from "./components/UpcomingPopupWidget";
import HostDashboard from "./pages/HostDashboard";
import NeighborhoodMap from "./pages/NeighborhoodMap";

// Advanced Features (Features 4 - 7) Imports
import TicketScanner from "./pages/TicketScanner";
import SecretMenuAndDietary from "./pages/SecretMenuAndDietary";
import ReviewSystem from "./components/ReviewSystem";
import WaitlistManager from "./components/WaitlistManager";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop",
];

function Home({ popups, setPopups }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);

  const { user } = useAuth();
  const { addToCart } = useCart();
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBookSeat = (e, popup) => {
    e.stopPropagation();
    addToCart(popup, 1);
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  const filteredPopups = popups.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict =
      selectedNeighborhood === "All" || item.neighborhood === selectedNeighborhood;
    return matchesSearch && matchesDistrict;
  });

  const neighborhoods = ["All", ...new Set(popups.map((p) => p.neighborhood))];

  return (
    <div>
      {/* Dynamic Background Slideshow Hero Section */}
      <section
        style={{
          position: "relative",
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem 2rem",
          borderRadius: "24px",
          overflow: "hidden",
          marginBottom: "4rem",
        }}
      >
        {HERO_IMAGES.map((imgUrl, index) => (
          <div
            key={imgUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(180deg, rgba(10, 15, 12, 0.65) 0%, rgba(10, 15, 12, 0.95) 100%), url('${imgUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: index === heroIndex ? 1 : 0,
              transform: index === heroIndex ? "scale(1.05)" : "scale(1.0)",
              transition: "opacity 1.5s ease-in-out, transform 6s ease-out",
              zIndex: 1,
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 2, maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
          <span className="category-label" style={{ marginBottom: "1rem", display: "inline-block", letterSpacing: "2px" }}>
            CURATED CULINARY EXPERIENCES
          </span>

          <h1 className="serif-heading" style={{ fontSize: "clamp(3rem, 6.5vw, 4.8rem)", lineHeight: "1.15", marginBottom: "1.5rem", color: "#ffffff", fontWeight: "800", textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)" }}>
            Savor the Exquisite <br />
            <span style={{ fontStyle: "italic", fontWeight: "700", color: "var(--accent-gold)" }}>
              Flavors of Sheger
            </span>
          </h1>

          <p style={{ color: "#e2e8f0", fontSize: "1.2rem", lineHeight: "1.7", marginBottom: "2.2rem", fontWeight: "400", textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)" }}>
            Embark on an exclusive culinary journey through Addis Ababa’s finest secret pop-up dining events and artisanal neighborhood food trails.
          </p>

          <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <Link to="/trails" className="btn-pill-gold" style={{ textDecoration: "none", padding: "0.85rem 1.8rem", fontSize: "1rem" }}>
              Explore Food Trails <ArrowRight size={18} />
            </Link>
            <Link to="/neighborhood-map" className="btn-pill-light" style={{ textDecoration: "none", padding: "0.85rem 1.8rem", fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={18} className="gold-accent" /> Neighborhood Map
            </Link>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                style={{
                  width: i === heroIndex ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: i === heroIndex ? "var(--accent-gold)" : "rgba(255, 255, 255, 0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
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
                  outline: "none",
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
                  cursor: "pointer",
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

        {filteredPopups.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem", backgroundColor: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
              No dining events match your search parameters.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {filteredPopups.map((popup) => {
              const isFav = favorites.some((f) => f.id === popup.id);
              const isHovered = hoveredId === popup.id;

              return (
                <div
                  key={popup.id}
                  onMouseEnter={() => setHoveredId(popup.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedPopup(popup)}
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
                  }}
                >
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <img
                      src={popup.image}
                      alt={popup.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        transition: "transform 0.4s ease",
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(popup);
                      }}
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
                        alignItems: "center",
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
                        onClick={(e) => handleBookSeat(e, popup)}
                        className="btn-pill-gold"
                        style={{ padding: "0.58rem 1.2rem", fontSize: "0.82rem" }}
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

      {/* MODAL SUPPER DETAIL WINDOW */}
      {selectedPopup && (
        <div
          onClick={() => setSelectedPopup(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
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
              maxWidth: "650px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
              position: "relative",
              animation: "supperPopupScale 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
            }}
          >
            {/* Modal Image Header */}
            <div style={{ position: "relative", height: "240px" }}>
              <img
                src={selectedPopup.image}
                alt={selectedPopup.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                onClick={() => setSelectedPopup(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: "rgba(0,0,0,0.75)",
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
                  padding: "0.35rem 0.9rem",
                  borderRadius: "20px",
                  fontWeight: "700",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Sparkles size={14} /> Exclusive Secret Dining
              </div>
            </div>

            {/* Modal Content Details */}
            <div style={{ padding: "2rem" }}>
              <h2 className="serif-heading" style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>
                {selectedPopup.title}
              </h2>

              <p style={{ color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "1.6rem", fontSize: "1rem" }}>
                {selectedPopup.description} Experience an unforgettable evening featuring bespoke menu pairings, intimate secret seatings, and local culinary artisans in Addis Ababa.
              </p>

              {/* Event Metadata Banner */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "1rem",
                  backgroundColor: "var(--bg-primary)",
                  padding: "1.2rem",
                  borderRadius: "14px",
                  border: "1px solid var(--border-color)",
                  marginBottom: "1.8rem",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    LOCATION
                  </span>
                  <strong style={{ fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.2rem" }}>
                    <MapPin size={14} className="gold-accent" /> {selectedPopup.neighborhood}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    DATE
                  </span>
                  <strong style={{ fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.2rem" }}>
                    <Calendar size={14} className="gold-accent" /> {selectedPopup.date}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    TICKET PRICE
                  </span>
                  <strong style={{ fontSize: "1.1rem" }} className="gold-accent">
                    {selectedPopup.price}
                  </strong>
                </div>
              </div>

              {/* Culinary Highlights */}
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Utensils size={18} className="gold-accent" /> Secret Menu Highlights
                </h3>
                <ul style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.8", paddingLeft: "1.2rem", margin: 0 }}>
                  <li>Multi-course curated tasting menu using locally sourced ingredients</li>
                  <li>Complimentary signature welcome drink & herbal infusion</li>
                  <li>Private chef presentation and story behind each dish</li>
                </ul>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={(e) => {
                    setSelectedPopup(null);
                    handleBookSeat(e, selectedPopup);
                  }}
                  className="btn-pill-gold"
                  style={{ flex: 1, padding: "0.9rem", fontSize: "1rem", justifyContent: "center" }}
                >
                  Confirm & Reserve Seat
                </button>
                <button
                  onClick={() => setSelectedPopup(null)}
                  className="btn-pill-light"
                  style={{ padding: "0.9rem 1.5rem", fontSize: "0.95rem" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation CSS */}
      <style>{`
        @keyframes supperPopupScale {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [popups, setPopups] = useState([]);

  // Fetch initial popups on load
  useEffect(() => {
    fetch("/data/popups.json")
      .then((res) => res.json())
      .then((data) => setPopups(data))
      .catch((err) => console.error("Failed to load popups:", err));
  }, []);

  // Handler to push newly created events into state
  const handleAddPopup = (newEvent) => {
    setPopups((prev) => [newEvent, ...prev]);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <BookingProvider>
            <Router>
              <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Navbar />
                
                {/* Notice banner bar to make the Neighborhood Map link easily visible globally */}
                <div style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color)", padding: "0.5rem 1.5rem", textAlign: "center", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Looking for locations? </span>
                  <Link to="/neighborhood-map" style={{ color: "var(--accent-gold)", fontWeight: "600", textDecoration: "underline", marginLeft: "0.5rem" }}>
                    Explore the Neighborhood Map 🗺️
                  </Link>
                </div>

                <main style={{ flexGrow: 1, maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "2rem 1.5rem", boxSizing: "border-box" }}>
                  <Routes>
                    {/* Core Application & Standard Routes */}
                    <Route path="/" element={<Home popups={popups} setPopups={setPopups} />} />
                    <Route path="/host" element={<ProtectedRoute><HostDashboard onAddPopup={handleAddPopup} /></ProtectedRoute>} />
                    <Route path="/trails" element={<Trails />} />
                    <Route path="/neighborhood-map" element={<NeighborhoodMap />} />
                    <Route path="/popup/:id" element={<ProtectedRoute><PopUpDetail /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />

                    {/* Advanced Features (Features 4 - 7) Routes */}
                    <Route path="/ticket-scanner" element={<TicketScanner />} />
                    <Route path="/menu-preferences" element={<SecretMenuAndDietary />} />
                    <Route path="/reviews" element={<ReviewSystem supperTitle="Kazanchis Heritage Supper" />} />
                    <Route path="/waitlist" element={<WaitlistManager availableSeats={0} eventName="Kazanchis Heritage Supper" />} />
                  </Routes>
                </main>
                <Footer />
                <UpcomingPopupWidget />
              </div>
            </Router>
          </BookingProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}