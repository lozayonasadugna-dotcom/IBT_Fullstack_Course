import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-shadow">
      <span className="text-xs font-semibold px-2 py-1 bg-amber-50 text-amber-700 rounded-full">
        {dish.category}
      </span>
      <h3 className="text-xl font-bold mt-2 text-gray-900">{dish.name}</h3>
      <p className="text-gray-600 text-sm mt-1">{dish.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">{dish.price}</span>
        <Link
          href={`/dish/${dish.id}`}
          className="text-amber-600 hover:text-amber-700 text-sm font-medium underline"
        >
          View Details
        </Link>
      </div>
      <AddToCartButton dish={dish} />
    </div>
  );
}
