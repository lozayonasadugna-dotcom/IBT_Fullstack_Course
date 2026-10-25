import { notFound } from "next/navigation";

// Mock database function representing our dishes
async function getDishes() {
  // In a real app, this would fetch from an API or database
  return [
    { id: "kitfo", name: "Kitfo", description: "Minced raw beef warmed in spiced butter and mitmita." },
    { id: "doro-wat", name: "Doro Wat", description: "Traditional spicy chicken stew served with a hard-boiled egg." },
    { id: "shiro", name: "Shiro", description: "Thick, rich stew made from ground chickpeas and spices." }
  ];
}

async function getDish(id) {
  const dishes = await getDishes();
  return dishes.find((d) => d.id === id);
}

// 1. Tell Next.js which IDs to pre-build at compile time
export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

// 2. The dynamic page component
export default async function DishPage({ params }) {
  const { id } = await params; // Await params in Next.js 15+
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  return (
    <div>
      <h2>{dish.name}</h2>
      <p style={{ marginTop: "1rem", color: "#555" }}>{dish.description}</p>
    </div>
  );
}