import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Compass, ShoppingBag, User, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useFavoritesStore } from "../store/useFavoritesStore";
import ShegerLogo from "./ShegerLogo";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { cart } = useCart();
  const favorites = useFavoritesStore((state) => state.favorites);
  const location = useLocation();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "var(--bg-card)",
        borderBottom: "1px solid var(--border-color)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Brand Logo & Name */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
            color: "var(--text-primary)",
          }}
        >
          <ShegerLogo size={36} />
          <span
            className="serif-heading"
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              letterSpacing: "0.5px",
            }}
          >
            Sheger <span style={{ color: "var(--accent-gold)" }}>Foodie</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          {/* Home Link */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              color: location.pathname === "/" ? "var(--accent-gold)" : "var(--text-primary)",
              fontWeight: "500",
              fontSize: "0.95rem",
            }}
          >
            <Home size={18} /> Home
          </Link>

          <Link
            to="/trails"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              color: location.pathname === "/trails" ? "var(--accent-gold)" : "var(--text-primary)",
              fontWeight: "500",
              fontSize: "0.95rem",
            }}
          >
            <Compass size={18} /> Trails
          </Link>

          <Link
            to="/favorites"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              color: location.pathname === "/favorites" ? "var(--accent-gold)" : "var(--text-primary)",
              fontWeight: "500",
              fontSize: "0.95rem",
              position: "relative",
            }}
          >
            <Heart size={18} /> Favorites
            {favorites.length > 0 && (
              <span
                style={{
                  backgroundColor: "var(--accent-gold)",
                  color: "#000000",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            to="/checkout"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              color: location.pathname === "/checkout" ? "var(--accent-gold)" : "var(--text-primary)",
              fontWeight: "500",
              fontSize: "0.95rem",
            }}
          >
            <ShoppingBag size={18} /> Cart
            {totalCartCount > 0 && (
              <span
                style={{
                  backgroundColor: "var(--accent-gold)",
                  color: "#000000",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalCartCount}
              </span>
            )}
          </Link>

          <Link
            to="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              color: location.pathname === "/profile" ? "var(--accent-gold)" : "var(--text-primary)",
              fontWeight: "500",
              fontSize: "0.95rem",
            }}
          >
            <User size={18} /> Profile
          </Link>

          {/* Host an Event Button */}
          <Link
            to="/host"
            style={{
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.9rem",
              border: "1px solid var(--accent-gold, #c5a059)",
              padding: "0.4rem 0.8rem",
              borderRadius: "20px",
              backgroundColor: location.pathname === "/host" ? "var(--accent-gold, #c5a059)" : "transparent",
              color: location.pathname === "/host" ? "#000000" : "var(--accent-gold, #c5a059)",
              transition: "all 0.2s ease",
            }}
          >
            + Host an Event
          </Link>

          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "1px solid var(--border-color)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
  <Link to="/map" style={{ color: "var(--text-primary)", textDecoration: "none", fontSize: "0.95rem", fontWeight: "500" }}>
  Map
</Link>
}