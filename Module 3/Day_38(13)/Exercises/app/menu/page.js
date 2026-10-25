import FilterShell from "@/components/FilterShell";
import DishList from "@/components/DishList";

async function getDishes() {
  // Simulated database fetch on the server
  return [
    { id: 1, name: "Doro Wat", description: "Spicy chicken stew with hard-boiled egg", price: 350 },
    { id: 2, name: "Injera with Tibs", description: "Sautéed beef chunks with rosemary and peppers", price: 400 },
    { id: 3, name: "Shiro", description: "Rich, spiced chickpea puree", price: 250 },
  ];
}

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main style={{ padding: "20px" }}>
      <h1>Addis Eats Menu</h1>
      
      {/* Composition: passing server-rendered DishList into client FilterShell */}
      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}