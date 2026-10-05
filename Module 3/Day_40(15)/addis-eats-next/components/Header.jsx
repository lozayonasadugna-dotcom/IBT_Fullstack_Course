"use client";

import Link from "next/link";
import { useTheme } from "@/components/Providers";
import { useState } from "react";

export default function Header() {
  const { theme, toggleTheme, user, setUser } = useTheme();
  const [emailInput, setEmailInput] = useState("");
  const [showSignInModal, setShowSignInModal] = useState(false);

  const isDark = theme === "dark";

  const handleSignIn = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setUser(emailInput);
      setEmailInput("");
      setShowSignInModal(false);
    }
  };

  return (
    <header style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "1rem 2rem", 
      borderBottom: `1px solid ${isDark ? "#333" : "#ddd"}`, 
      background: isDark ? "rgba(18, 18, 18, 0.95)" : "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(5px)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      {/* Left: Logo & Brand */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.8rem", textDecoration: "none", color: isDark ? "#fff" : "#111" }}>
        <div style={{ width: "45px", height: "45px", borderRadius: "50%", overflow: "hidden", border: "2px solid #0070f3", position: "relative", background: "#fff" }}>
          <img 
            src="/Addis Eats Ethiopian Food Emblem.png" 
            alt="Addis Eats Logo" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <h2 style={{ margin: 0, fontSize: "1.3rem" }}>Addis Eats</h2>
      </Link>
      
      {/* Right Corner: Home, Menu, Cart, Theme Toggle, & Sign In */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
        <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none", color: isDark ? "#61dafb" : "#0070f3", fontWeight: "600", fontSize: "0.95rem" }}>Home</Link>
          <Link href="/menu" style={{ textDecoration: "none", color: isDark ? "#61dafb" : "#0070f3", fontWeight: "600", fontSize: "0.95rem" }}>Menu</Link>
          <Link href="/cart" style={{ textDecoration: "none", color: isDark ? "#61dafb" : "#0070f3", fontWeight: "600", fontSize: "0.95rem" }}>Cart</Link>
        </nav>

        {/* Night / Light Mode Toggle Button */}
        <button 
          onClick={toggleTheme}
          style={{ 
            background: isDark ? "#333" : "#e0e0e0", 
            color: isDark ? "#ffd700" : "#333", 
            border: "none", 
            padding: "0.4rem 0.7rem", 
            borderRadius: "20px", 
            cursor: "pointer", 
            fontWeight: "bold",
            fontSize: "0.85rem"
          }}
          title="Toggle Dark/Light Mode"
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Sign-In / User Status */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
            <span>👤 <strong>{user}</strong></span>
            <button 
              onClick={() => setUser(null)}
              style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "0.3rem 0.6rem", borderRadius: "4px", cursor: "pointer", fontSize: "0.75rem" }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => setShowSignInModal(!showSignInModal)}
              style={{ background: "#0070f3", color: "#fff", border: "none", padding: "0.4rem 0.9rem", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" }}
            >
              Sign In
            </button>

            {showSignInModal && (
              <form 
                onSubmit={handleSignIn} 
                style={{ 
                  position: "absolute", 
                  right: 0, 
                  top: "120%", 
                  background: isDark ? "#222" : "#fff", 
                  border: `1px solid ${isDark ? "#444" : "#ccc"}`, 
                  padding: "1rem", 
                  borderRadius: "8px", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "0.5rem",
                  width: "220px",
                  zIndex: 100
                }}
              >
                <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>Email Address:</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #666", background: isDark ? "#111" : "#fff", color: isDark ? "#fff" : "#000", fontSize: "0.85rem" }}
                />
                <button type="submit" style={{ background: "#28a745", color: "#fff", border: "none", padding: "0.4rem", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" }}>
                  Submit
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </header>
  );
}