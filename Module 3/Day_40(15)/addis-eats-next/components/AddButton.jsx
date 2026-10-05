"use client";

import { useCart } from "@/components/Providers";
import { useState } from "react";
import Link from "next/link";

export default function AddButton({ dish }) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  // Find how many of this specific dish are already in the cart
  const existingItem = cart.find((item) => item.id === dish.id);
  const currentQuantity = existingItem ? existingItem.quantity : 0;

  const handleAdd = () => {
    addToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button 
        onClick={handleAdd}
        style={{ 
          padding: '0.7rem 1.2rem', 
          background: '#0070f3', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {currentQuantity > 0 ? `Add More (${currentQuantity} in Cart)` : "Add to Order"}
      </button>

      {added && (
        <span style={{ marginLeft: "1rem", color: "#28a745", fontSize: "0.9rem" }}>
          Updated! ✓ <Link href="/cart" style={{ color: "#0070f3", textDecoration: "underline" }}>View Cart</Link>
        </span>
      )}
    </div>
  );
}