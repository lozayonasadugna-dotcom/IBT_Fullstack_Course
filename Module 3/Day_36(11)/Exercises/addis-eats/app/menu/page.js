import Link from "next/link";

export default function MenuPage() {
  const dishes = [
    { id: "kitfo", name: "Kitfo" },
    { id: "doro-wat", name: "Doro Wat" },
    { id: "beyaynetu", name: "Vegetarian Beyaynetu" },
  ];

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Our Menu</h1>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id} style={{ margin: "0.5rem 0" }}>
            <Link href={`/menu/${dish.id}`} style={{ color: "blue" }}>
              {dish.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}