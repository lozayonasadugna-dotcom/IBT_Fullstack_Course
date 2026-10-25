export default function CategoryBar() {
  return (
    <div className="flex gap-2 mb-4">
      <button className="bg-gray-200 text-gray-900 px-3 py-1 rounded">All</button>
      <button className="bg-gray-200 text-gray-900 px-3 py-1 rounded">Meat</button>
      <button className="bg-gray-200 text-gray-900 px-3 py-1 rounded">Veggie</button>
    </div>
  );
}