"use client";

import { useCart, useTheme } from "@/components/Providers";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { theme, user } = useTheme();
  const [deliveryType, setDeliveryType] = useState("pickup"); // "pickup" or "delivery"
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const isDark = theme === "dark";

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = deliveryType === "delivery" ? 150 : 0;
  const total = subtotal + deliveryFee;

  // Load Leaflet Map dynamically when Home Delivery is selected
  useEffect(() => {
    if (deliveryType === "delivery") {
      // Load Leaflet CSS
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      // Load Leaflet JS Script
      if (!window.L) {
        const script = document.createElement("script");
        script.id = "leaflet-js";
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;
        script.onload = () => initMap();
        document.body.appendChild(script);
      } else {
        // Small timeout to ensure container DOM node is rendered
        setTimeout(() => initMap(), 100);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [deliveryType]);

  const initMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    // Default center: Ayat Area, Addis Ababa (9.0192, 38.8519)
    const defaultLat = 9.0192;
    const defaultLng = 38.8519;

    const map = L.map(mapRef.current).setView([defaultLat, defaultLng], 14);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map);
    markerRef.current = marker;

    setDeliveryLocation(`Lat: ${defaultLat.toFixed(4)}, Lng: ${defaultLng.toFixed(4)} (Ayat Area, Addis Ababa)`);

    // Update location when map is clicked
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setDeliveryLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} (Custom Pin)`);
    });

    // Update location when marker is dragged
    marker.on('dragend', () => {
      const { lat, lng } = marker.getLatLng();
      setDeliveryLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} (Custom Pin)`);
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!user && !checkoutEmail) {
      alert("Please sign in or enter your email to complete your order.");
      return;
    }
    if (deliveryType === "delivery" && !deliveryLocation.trim()) {
      alert("Please select your delivery location on the map.");
      return;
    }
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main style={{ padding: "4rem 2rem", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ background: isDark ? "#1e1e1e" : "#fff", border: `1px solid ${isDark ? "#333" : "#ddd"}`, padding: "3rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <h1 style={{ color: "#28a745", marginBottom: "1rem" }}>🎉 Order Placed Successfully!</h1>
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Thank you for ordering with Addis Eats! Your food is being prepared.</p>
          {deliveryType === "delivery" && (
            <p style={{ fontSize: "0.95rem", color: "#61dafb", marginBottom: "1rem" }}>📍 Delivery Pin: <strong>{deliveryLocation}</strong></p>
          )}
          <p style={{ color: "#888", marginBottom: "2rem" }}>Confirmation sent to: <strong>{user || checkoutEmail}</strong></p>
          <Link href="/menu">
            <button style={{ padding: "0.8rem 1.5rem", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              Order More Food
            </button>
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Your Cart is Empty</h1>
        <p style={{ color: isDark ? "#aaa" : "#666", marginBottom: "2rem" }}>Explore our traditional Ethiopian menu and add your favorite dishes.</p>
        <Link href="/menu">
          <button style={{ padding: "0.8rem 1.5rem", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
            View Menu
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: "1.5rem" }}>Your Order Cart</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {cart.map((item) => (
          <div key={item.id} style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            background: isDark ? "rgba(255,255,255,0.05)" : "#fff", 
            border: `1px solid ${isDark ? "#444" : "#ddd"}`, 
            padding: "1rem", 
            borderRadius: "8px",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src={item.image} alt={item.name} style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "6px" }} />
              <div>
                <h3 style={{ margin: "0 0 0.3rem 0", fontSize: "1.1rem" }}>{item.name}</h3>
                <p style={{ margin: 0, color: "#61dafb", fontWeight: "bold" }}>{item.price} ETB</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <button 
                onClick={() => updateQuantity(item.id, -1)}
                style={{ 
                  background: isDark ? "#333" : "#e0e0e0", 
                  color: isDark ? "#fff" : "#000", 
                  border: `1px solid ${isDark ? "#666" : "#aaa"}`, 
                  width: "34px", 
                  height: "34px", 
                  borderRadius: "6px", 
                  fontWeight: "bold", 
                  fontSize: "1.2rem", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                -
              </button>
              
              <span style={{ fontSize: "1.1rem", fontWeight: "bold", minWidth: "25px", textAlign: "center" }}>{item.quantity}</span>
              
              <button 
                onClick={() => updateQuantity(item.id, 1)}
                style={{ 
                  background: "#0070f3", 
                  color: "#fff", 
                  border: "1px solid #005bb5", 
                  width: "34px", 
                  height: "34px", 
                  borderRadius: "6px", 
                  fontWeight: "bold", 
                  fontSize: "1.2rem", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                +
              </button>

              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", marginLeft: "1rem" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fulfillment & Map Location Selector */}
      <div style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#fff", border: `1px solid ${isDark ? "#444" : "#ddd"}`, padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Select Fulfillment Method</h3>
        
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button 
            type="button"
            onClick={() => setDeliveryType("pickup")}
            style={{ 
              flex: 1, 
              padding: "0.9rem", 
              borderRadius: "6px", 
              border: `2px solid ${deliveryType === "pickup" ? "#0070f3" : (isDark ? "#444" : "#ccc")}`, 
              background: deliveryType === "pickup" ? (isDark ? "rgba(0,112,243,0.3)" : "rgba(0,112,243,0.1)") : "transparent",
              color: isDark ? "#fff" : "#000", 
              fontWeight: "bold", 
              fontSize: "1rem", 
              cursor: "pointer" 
            }}
          >
            🏪 Store Pickup (Free)
          </button>
          
          <button 
            type="button"
            onClick={() => setDeliveryType("delivery")}
            style={{ 
              flex: 1, 
              padding: "0.9rem", 
              borderRadius: "6px", 
              border: `2px solid ${deliveryType === "delivery" ? "#0070f3" : (isDark ? "#444" : "#ccc")}`, 
              background: deliveryType === "delivery" ? (isDark ? "rgba(0,112,243,0.3)" : "rgba(0,112,243,0.1)") : "transparent",
              color: isDark ? "#fff" : "#000", 
              fontWeight: "bold", 
              fontSize: "1rem", 
              cursor: "pointer" 
            }}
          >
            🚗 Home Delivery (+150 ETB)
          </button>
        </div>

        {deliveryType === "delivery" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem", padding: "1.2rem", background: isDark ? "rgba(0,112,243,0.15)" : "rgba(0,112,243,0.08)", borderRadius: "8px", border: "2px solid #0070f3" }}>
            <label style={{ fontSize: "1rem", fontWeight: "bold", color: "#0070f3" }}>📍 Click or Drag Pin on Map to Set Delivery Location:</label>
            <p style={{ margin: 0, fontSize: "0.85rem", color: isDark ? "#bbb" : "#555" }}>Selected Coordinates: <strong>{deliveryLocation}</strong></p>
            
            {/* Interactive Map Container */}
            <div 
              ref={mapRef} 
              style={{ width: "100%", height: "300px", borderRadius: "8px", marginTop: "0.5rem", border: "1px solid #444", zIndex: 1 }}
            />
          </div>
        )}
      </div>

      {/* Order Summary & Sign-In / Place Order */}
      <div style={{ background: isDark ? "rgba(0,0,0,0.6)" : "#eaeaea", border: `1px solid ${isDark ? "#444" : "#ccc"}`, padding: "2rem", borderRadius: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "1rem" }}>
          <span>Items Subtotal:</span>
          <span>{subtotal} ETB</span>
        </div>
        {deliveryType === "delivery" && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "1rem" }}>
            <span>Delivery Fee:</span>
            <span>{deliveryFee} ETB</span>
          </div>
        )}
        <hr style={{ borderColor: isDark ? "#444" : "#ccc", marginBottom: "1rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", fontSize: "1.4rem", fontWeight: "bold", color: "#61dafb" }}>
          <span>Total:</span>
          <span>{total} ETB</span>
        </div>

        <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {!user && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Sign In to Order (Email Required):</label>
              <input 
                type="email" 
                placeholder="Enter your email to sign in & order"
                value={checkoutEmail}
                onChange={(e) => setCheckoutEmail(e.target.value)}
                required
                style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #666", background: isDark ? "#111" : "#fff", color: isDark ? "#fff" : "#000", fontSize: "1rem" }}
              />
            </div>
          )}

          {user && (
            <p style={{ margin: 0, fontSize: "0.95rem", color: "#28a745" }}>
              Signed in as <strong>{user}</strong>. Ready to place your order!
            </p>
          )}

          <button 
            type="submit"
            style={{ 
              padding: "1rem", 
              background: "#28a745", 
              color: "#fff", 
              border: "none", 
              borderRadius: "6px", 
              fontSize: "1.1rem", 
              fontWeight: "bold", 
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(40,167,69,0.3)",
              marginTop: "0.5rem"
            }}
          >
            Place Order Now 🛒 ({total} ETB)
          </button>
        </form>
      </div>
    </main>
  );
}