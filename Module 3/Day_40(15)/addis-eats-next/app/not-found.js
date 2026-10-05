import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "2rem" }}>
      <h2>Page Not Found</h2>
      <p>Could not find the requested resource.</p>
      <Link href="/menu" style={{ color: "blue", textDecoration: "underline" }}>
        Return to Menu
      </Link>
    </main>
  );
}