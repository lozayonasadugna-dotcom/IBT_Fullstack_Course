import React from "react";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { Ticket, Calendar, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import TicketAndScannerModule from "./TicketScanner"; // Fixed import path

export default function Profile() {
  const { user, logout } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div style={{ maxWidth: "850px", margin: "2rem auto" }}>
      {/* Profile Header */}
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          padding: "2rem",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "var(--accent-gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#000",
            }}
          >
            {user?.email?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="serif-heading" style={{ fontSize: "1.8rem" }}>
              {user?.email?.split("@")[0] || "Foodie Member"}
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{user?.email}</p>
          </div>
        </div>

        <button onClick={logout} className="btn-pill-light" style={{ padding: "0.6rem 1.4rem" }}>
          Sign Out
        </button>
      </div>

      {/* Analytics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        <div style={{ backgroundColor: "var(--bg-card)", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
          <span className="category-label">ACTIVE RESERVATIONS</span>
          <h3 className="serif-heading" style={{ fontSize: "3rem", margin: "0.5rem 0", color: "var(--accent-gold)" }}>
            {bookings.length}
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
            Confirmed Secret Supper Passes
          </p>
        </div>

        <div style={{ backgroundColor: "var(--bg-card)", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
          <span className="category-label">SAVED EXPERIENCES</span>
          <h3 className="serif-heading" style={{ fontSize: "3rem", margin: "0.5rem 0", color: "var(--accent-gold)" }}>
            {favorites.length}
          </h3>
          <Link to="/favorites" style={{ color: "var(--text-muted)", fontSize: "0.85rem", textDecoration: "underline" }}>
            View Saved Favorites
          </Link>
        </div>
      </div>

      {/* Secret Supper Passes */}
      <h3 className="serif-heading" style={{ fontSize: "2rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <Ticket className="gold-accent" /> My Secret Supper Passes
      </h3>

      {bookings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", marginBottom: "3rem" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>You have no active reservations yet.</p>
          <Link to="/" className="btn-pill-gold" style={{ textDecoration: "none" }}>
            Explore Upcoming Suppers
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "3rem" }}>
          {bookings.map((ticket) => (
            <div
              key={ticket.bookingId}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "16px",
                padding: "1.5rem",
                border: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--accent-gold)", fontWeight: "600", letterSpacing: "1px" }}>
                  PASS #{ticket.bookingId}
                </span>
                <h4 className="serif-heading" style={{ fontSize: "1.4rem", margin: "0.2rem 0 0.5rem" }}>
                  {ticket.title}
                </h4>
                <div style={{ display: "flex", gap: "1.2rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <MapPin size={14} className="gold-accent" /> {ticket.neighborhood}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Calendar size={14} className="gold-accent" /> {ticket.date}
                  </span>
                  <span>Seats: {ticket.quantity}</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="gold-accent" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {ticket.price}
                </span>
                <button
                  onClick={() => cancelBooking(ticket.bookingId)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff6b6b",
                    cursor: "pointer",
                    padding: "0.5rem",
                  }}
                  title="Cancel Pass"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embedded Digital Ticket & Host QR Scanner Module */}
      <div style={{ marginTop: "3rem", borderTop: "1px dashed var(--border-color)", paddingTop: "2.5rem" }}>
        <TicketAndScannerModule />
      </div>
    </div>
  );
}