import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to Addis Eats! 🇪🇹</h1>
      <p>Discover and order the best traditional dishes in Addis Ababa.</p>
      <Link href="/menu" style={{ color: "blue", textDecoration: "underline" }}>
        Go to Menu &rarr;
      </Link>
    </main>
  );
}