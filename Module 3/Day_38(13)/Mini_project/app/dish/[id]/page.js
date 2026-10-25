import { getDishById } from "@/data/dishes";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full">
          {dish.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">{dish.name}</h1>
        <p className="text-gray-600 mt-2 text-lg">{dish.description}</p>
        <p className="text-2xl font-bold text-amber-600 mt-6">{dish.price}</p>
        <AddToCartButton dish={dish} />
      </div>
    </main>
  );
}
