import { notFound } from "next/navigation";
import { dishes } from "../dishes";
import Link from "next/link";

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <div>
      <Link href="/menu" className="text-sm text-gray-500 hover:underline">← Back to Menu</Link>
      <h2 className="text-2xl font-bold mt-2">{dish.name}</h2>
      <p className="text-gray-700 my-2">{dish.description}</p>
      <p className="text-lg font-bold text-amber-700 mb-4">{dish.price}</p>
      
      <Link href="/cart" className="bg-green-600 text-white px-4 py-2 rounded inline-block">
        Add to Cart
      </Link>
    </div>
  );
}