import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <ul className="space-y-3">
      {dishes.map((dish) => (
        <li key={dish.id} className="p-4 border rounded shadow-sm hover:bg-gray-50">
          <Link href={`/menu/${dish.id}`}>
            <h3 className="font-bold text-lg text-amber-700">{dish.name}</h3>
            <p className="text-sm text-gray-600">{dish.description}</p>
            <span className="font-semibold">{dish.price}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}