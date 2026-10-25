"use client";

import { useCart } from "@/app/providers";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(dish)}
      style={{ padding: "6px 12px", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
    >
      Add to Cart
    </button>
  );
}