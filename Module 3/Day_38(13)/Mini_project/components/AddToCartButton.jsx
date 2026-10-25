"use client";

import { useCart } from "./Providers";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(dish)}
      className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors text-sm font-semibold"
    >
      Add to Cart
    </button>
  );
}
