"use client";

import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Shopping Cart</h2>
      <p className="mb-4">Items added to your cart will appear here.</p>
      <button
        onClick={handleCheckout}
        className="bg-amber-600 text-white px-4 py-2 rounded"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}