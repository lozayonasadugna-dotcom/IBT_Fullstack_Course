import Link from "next/link";

// Exercise 4: Revalidate this route at most every 3600 seconds (1 hour)
export const revalidate = 3600;

export default function MenuPage() {
  return (
    <div>
      <h2>Full Menu</h2>
      <p style={{ color: "#666", marginBottom: "1rem" }}>Select a dish to view details:</p>
      
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <li><Link href="/menu/kitfo">👉 Kitfo</Link></li>
        <li><Link href="/menu/doro-wat">👉 Doro Wat</Link></li>
        <li><Link href="/menu/shiro">👉 Shiro</Link></li>
      </ul>
    </div>
  );
}