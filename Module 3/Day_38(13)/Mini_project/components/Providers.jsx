"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function Providers({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (dish) => {
    setCart((prev) => [...prev, dish]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
