"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();
const ThemeContext = createContext();

export function Providers({ children }) {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("dark"); // Default to dark theme
  const [user, setUser] = useState(null); // Global sign-in state

  const addToCart = (dish) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === dish.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, user, setUser }}>
      <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
        <div style={{ 
          background: isDark ? "#121212" : "#f4f4f4", 
          color: isDark ? "#fff" : "#111", 
          minHeight: "100vh", 
          position: "relative",
          transition: "background 0.3s, color 0.3s"
        }}>
          {/* Global Background Logo Watermark (Visible in both dark & light modes) */}
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "550px",
            height: "550px",
            backgroundImage: "url('/Addis Eats Ethiopian Food Emblem.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: isDark ? 0.07 : 0.05,
            zIndex: 0,
            pointerEvents: "none"
          }} />

          {/* Page Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {children}
          </div>
        </div>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}