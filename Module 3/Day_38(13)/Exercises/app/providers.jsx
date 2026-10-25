"use client";

import { createContext, useContext, useState } from "react";

// 1. Create the Cart Context
const CartContext = createContext();

// 2. Create the Provider component that holds state
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (dish) => {
    setCart((prevCart) => [...prevCart, dish]);
  };

  const removeFromCart = (dishId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom hook to use the cart anywhere in client components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}