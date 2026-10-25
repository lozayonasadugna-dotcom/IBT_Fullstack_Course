import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-12 text-center space-y-6">
      <h1 className="text-3xl font-extrabold">Addis Eats Delivery Tracker</h1>
      <p className="text-slate-600">Click below to view the live tracking mini-project.</p>
      <Link
        href="/track/ORD-1001"
        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg shadow transition"
      >
        Track Order #ORD-1001
      </Link>
    </main>
  );
}
