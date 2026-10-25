import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Welcome to Addis Eats!</h2>
      <p className="mb-4">Explore our authentic menu and order online.</p>
      <Link href="/menu" className="bg-amber-600 text-white px-4 py-2 rounded inline-block">
        View Menu
      </Link>
    </div>
  );
}