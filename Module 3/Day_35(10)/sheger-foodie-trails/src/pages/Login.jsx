import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Safely extract path whether location.state.from is a string or a Location object
  const target = location.state?.from;
  const fromPath = typeof target === "string" ? target : target?.pathname || "/";
  const fromSearch = typeof target === "object" ? target?.search || "" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      // Redirect back to intended target (e.g. /checkout or /popup/popup-01)
      navigate(fromPath + fromSearch, { replace: true });
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "4rem auto",
        padding: "2.5rem 2rem",
        backgroundColor: "var(--bg-card)",
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="category-label">WELCOME BACK</span>
        <h2 className="serif-heading" style={{ fontSize: "2.2rem", marginTop: "0.4rem" }}>
          Sign In
        </h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              color: "#ff6b6b",
              backgroundColor: "rgba(255, 107, 107, 0.1)",
              padding: "0.6rem",
              borderRadius: "6px",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-pill-gold"
          style={{ width: "100%", padding: "0.85rem", marginTop: "0.5rem", fontSize: "0.95rem" }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}