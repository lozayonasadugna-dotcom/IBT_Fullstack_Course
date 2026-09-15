import React, { useState } from "react";
import { QrCode, CheckCircle2, ScanLine, UserCheck, AlertCircle } from "lucide-react";

export default function TicketAndScannerModule() {
  const [activeTab, setActiveTab] = useState("ticket"); // 'ticket' or 'scanner'
  const [scanStatus, setScanStatus] = useState(null); // null, 'success', 'error'
  const [scannedGuest, setScannedGuest] = useState(null);

  // Mock booked ticket data
  const userTicket = {
    bookingId: "SS-2026-8942",
    eventTitle: "Kazanchis Heritage Secret Supper",
    date: "Friday, October 18, 2026",
    time: "7:00 PM - 10:30 PM",
    guestName: "Loza Yonas",
    seats: 2,
    status: "Confirmed",
  };

  // Simulate scanning a ticket QR code from host perspective
  const simulateScan = (isValid) => {
    if (isValid) {
      setScanStatus("success");
      setScannedGuest({
        name: "Loza Yonas",
        event: "Kazanchis Heritage Secret Supper",
        seats: 2,
        time: "7:00 PM",
      });
    } else {
      setScanStatus("error");
      setScannedGuest(null);
    }
  };

  const resetScanner = () => {
    setScanStatus(null);
    setScannedGuest(null);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1.5rem" }}>
      {/* Module Switcher Tabs */}
      <div
        style={{
          display: "flex",
          backgroundColor: "var(--bg-card)",
          padding: "4px",
          borderRadius: "14px",
          border: "1px solid var(--border-color)",
          marginBottom: "2rem",
        }}
      >
        <button
          onClick={() => setActiveTab("ticket")}
          style={{
            flex: 1,
            padding: "0.8rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor: activeTab === "ticket" ? "var(--accent-gold)" : "transparent",
            color: activeTab === "ticket" ? "#000" : "var(--text-muted)",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          My Digital Ticket (Guest View)
        </button>
        <button
          onClick={() => setActiveTab("scanner")}
          style={{
            flex: 1,
            padding: "0.8rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor: activeTab === "scanner" ? "var(--accent-gold)" : "transparent",
            color: activeTab === "scanner" ? "#000" : "var(--text-muted)",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Host QR Scanner
        </button>
      </div>

      {/* TAB 1: GUEST DIGITAL TICKET */}
      {activeTab === "ticket" && (
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--accent-gold)",
            borderRadius: "20px",
            padding: "2rem",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(197, 160, 89, 0.15)",
          }}
        >
          <span className="category-label">SECURE ACCESS PASS</span>
          <h2 className="serif-heading" style={{ fontSize: "1.8rem", marginTop: "0.3rem" }}>
            {userTicket.eventTitle}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            {userTicket.date} • {userTicket.time}
          </p>

          {/* QR Code Graphic Box */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "1.5rem",
              borderRadius: "16px",
              display: "inline-block",
              marginBottom: "1.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {/* Simulated clean QR visual representation using icon/grid feel */}
            <div
              style={{
                width: "160px",
                height: "160px",
                border: "4px solid #111",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                position: "relative",
              }}
            >
              <QrCode size={110} color="#0a0f0c" />
              <div
                style={{
                  position: "absolute",
                  bottom: "4px",
                  fontSize: "0.65rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {userTicket.bookingId}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              backgroundColor: "rgba(255,255,255,0.03)",
              padding: "1rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                GUEST NAME
              </span>
              <strong>{userTicket.guestName}</strong>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                RESERVED SEATS
              </span>
              <strong className="gold-accent">{userTicket.seats} Persons</strong>
            </div>
          </div>

          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Present this QR code at the secret venue entrance for fast check-in.
          </p>
        </div>
      )}

      {/* TAB 2: HOST SCANNER INTERFACE */}
      {activeTab === "scanner" && (
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "20px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <span className="category-label">HOST PORTAL CHECK-IN</span>
          <h2 className="serif-heading" style={{ fontSize: "1.8rem", marginTop: "0.3rem" }}>
            Live Ticket Verification
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.8rem" }}>
            Scan guest QR codes at the door to confirm admission credentials.
          </p>

          {/* Scanner Viewport Box */}
          {!scanStatus && (
            <div
              style={{
                height: "240px",
                border: "2px dashed var(--accent-gold)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(197, 160, 89, 0.02)",
                marginBottom: "1.5rem",
                position: "relative",
              }}
            >
              <ScanLine size={48} className="gold-accent" style={{ animation: "pulse 2s infinite" }} />
              <p style={{ marginTop: "1rem", fontSize: "0.95rem", fontWeight: "600" }}>
                Align guest QR code within camera frame...
              </p>

              {/* Simulation Testing Buttons */}
              <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
                <button
                  onClick={() => simulateScan(true)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "var(--accent-gold)",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  Simulate Valid Scan
                </button>
                <button
                  onClick={() => simulateScan(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "transparent",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-muted)",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  Simulate Invalid Scan
                </button>
              </div>
            </div>
          )}

          {/* Scan Result Success View */}
          {scanStatus === "success" && (
            <div
              style={{
                backgroundColor: "rgba(46, 204, 113, 0.1)",
                border: "1px solid #2ecc71",
                borderRadius: "16px",
                padding: "1.8rem",
                marginBottom: "1.5rem",
              }}
            >
              <CheckCircle2 size={48} color="#2ecc71" style={{ margin: "0 auto 0.8rem auto" }} />
              <h3 style={{ color: "#2ecc71", fontSize: "1.4rem", marginBottom: "0.4rem" }}>
                Verified & Checked In!
              </h3>
              <p style={{ fontWeight: "600", fontSize: "1.1rem", marginBottom: "0.2rem" }}>
                {scannedGuest.name}
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
                {scannedGuest.event} • {scannedGuest.seats} Seats Admitted
              </p>
              <button
                onClick={resetScanner}
                className="btn-pill-gold"
                style={{ padding: "0.6rem 1.5rem", fontSize: "0.85rem" }}
              >
                Scan Next Ticket
              </button>
            </div>
          )}

          {/* Scan Result Error View */}
          {scanStatus === "error" && (
            <div
              style={{
                backgroundColor: "rgba(231, 76, 60, 0.1)",
                border: "1px solid #e74c3c",
                borderRadius: "16px",
                padding: "1.8rem",
                marginBottom: "1.5rem",
              }}
            >
              <AlertCircle size={48} color="#e74c3c" style={{ margin: "0 auto 0.8rem auto" }} />
              <h3 style={{ color: "#e74c3c", fontSize: "1.4rem", marginBottom: "0.4rem" }}>
                Invalid Ticket Code
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
                This QR code could not be verified in the active booking database.
              </p>
              <button
                onClick={resetScanner}
                style={{
                  padding: "0.6rem 1.5rem",
                  backgroundColor: "transparent",
                  border: "1px solid #e74c3c",
                  color: "#e74c3c",
                  borderRadius: "20px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Try Scanning Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}