"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/Providers";

const slideImages = [
  { name: "Doro Wat", image: "/doro-wat.jpg", desc: "Traditional spicy chicken stew served with injera." },
  { name: "Kitfo", image: "/kitfo.jpg", desc: "Minced raw beef warmed in spiced clarified butter." },
  { name: "Shiro", image: "/shiro.jpg", desc: "Thick, rich chickpea stew simmered with garlic." },
  { name: "Beyaynetu", image: "/beyaynetu.jpg", desc: "Vibrant platter of various vegetarian stews over injera." }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme, user, setUser } = useTheme();
  const [emailInput, setEmailInput] = useState("");
  const isDark = theme === "dark";

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setUser(emailInput);
      setEmailInput("");
    }
  };

  return (
    <main style={{ 
      minHeight: "calc(100vh - 160px)", 
      padding: "3rem 2rem", 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "3rem"
    }}>
      {/* Hero & Slideshow Section */}
      <div style={{ width: "100%", maxWidth: "800px" }}>
        
        <h1 style={{ fontSize: "2.8rem", marginBottom: "0.5rem" }}>Welcome to Addis Eats</h1>
        <p style={{ fontSize: "1.2rem", color: isDark ? "#bbb" : "#555", marginBottom: "2.5rem" }}>Authentic Ethiopian traditional dishes delivered fresh to your door.</p>

        {/* Food Slideshow Section */}
        <div style={{ 
          background: isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.8)", 
          border: `1px solid ${isDark ? "#444" : "#ccc"}`, 
          borderRadius: "12px", 
          padding: "1.5rem", 
          marginBottom: "2.5rem", 
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)" 
        }}>
          <h3 style={{ marginBottom: "1rem", color: "#0070f3" }}>Today's Featured Specials</h3>
          <div style={{ height: "260px", borderRadius: "8px", overflow: "hidden", position: "relative", background: "#222", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            
            <img 
              src={slideImages[currentSlide].image} 
              alt={slideImages[currentSlide].name}
              style={{ width: "100%", height: "180px", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
            />
            
            <div style={{ background: "rgba(0,0,0,0.85)", padding: "0.8rem 1rem", position: "relative", zIndex: 2, textAlign: "left" }}>
              <h4 style={{ margin: 0, color: "#fff", fontSize: "1.1rem" }}>{slideImages[currentSlide].name}</h4>
              <p style={{ margin: "0.2rem 0 0 0", fontSize: "0.85rem", color: "#ccc" }}>{slideImages[currentSlide].desc}</p>
            </div>
          </div>

          {/* Slide Dots Indicator */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
            {slideImages.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                style={{ 
                  width: "12px", 
                  height: "12px", 
                  borderRadius: "50%", 
                  border: "none", 
                  background: currentSlide === idx ? "#0070f3" : (isDark ? "#555" : "#bbb"), 
                  cursor: "pointer" 
                }}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div>
          <Link href="/menu">
            <button style={{ padding: "0.9rem 2rem", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,112,243,0.4)" }}>
              Explore Full Menu &rarr;
            </button>
          </Link>
        </div>

      </div>

      {/* Sign In to Order Section (Positioned Above Footer) */}
      <div style={{ 
        width: "100%", 
        maxWidth: "600px", 
        background: isDark ? "rgba(255,255,255,0.05)" : "#fff", 
        border: `1px solid ${isDark ? "#444" : "#ddd"}`, 
        padding: "2rem", 
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem" }}>Ready to order?</h3>
        <p style={{ margin: "0 0 1.5rem 0", color: isDark ? "#aaa" : "#666", fontSize: "0.95rem" }}>Sign in with your email to start your traditional food order right away.</p>
        
        {user ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <p style={{ margin: 0, color: "#28a745", fontWeight: "bold" }}>Signed in as: {user}</p>
            <Link href="/menu">
              <button style={{ padding: "0.7rem 1.5rem", background: "#28a745", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                Browse Menu & Order Now
              </button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <input 
              type="email" 
              placeholder="Enter your email address..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #666", background: isDark ? "#111" : "#fff", color: isDark ? "#fff" : "#000", fontSize: "1rem" }}
            />
            <button type="submit" style={{ padding: "0.8rem", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
              Sign In to Order
            </button>
          </form>
        )}
      </div>
    </main>
  );
}