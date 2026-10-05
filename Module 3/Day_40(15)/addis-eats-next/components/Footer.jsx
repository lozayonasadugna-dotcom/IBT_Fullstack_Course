"use client";

import { useTheme } from "./Providers";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer style={{
      background: isDark ? "#1a1a1a" : "#e4e4e4",
      color: isDark ? "#ccc" : "#333",
      padding: "2rem",
      marginTop: "3rem",
      borderTop: `1px solid ${isDark ? "#333" : "#ccc"}`,
      textAlign: "center",
      fontSize: "0.9rem"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>Addis Eats - Authentic Ethiopian Cuisine</p>
        <p style={{ margin: 0 }}>📍 Address: Ayat Area, Addis Ababa, Ethiopia</p>
        <p style={{ margin: 0 }}>🕒 Opening Hours: Monday – Sunday: 8:00 AM – 10:00 PM</p>
        <p style={{ margin: 0 }}>✉️ Email: <a href="mailto:addiseatset@gmail.com" style={{ color: "#0070f3", textDecoration: "none" }}>addiseatset@gmail.com</a></p>
        <p style={{ margin: "1rem 0 0 0", fontSize: "0.8rem", color: isDark ? "#777" : "#666" }}>&copy; 2026 Addis Eats. All rights reserved.</p>
      </div>
    </footer>
  );
}