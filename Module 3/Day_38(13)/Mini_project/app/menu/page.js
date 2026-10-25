import { getDishes } from "@/data/dishes";
import FilterShell from "@/components/FilterShell";
import DishList from "@/components/DishList";

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Addis Eats Menu</h1>
      <p className="text-gray-600 mb-6">Discover authentic dishes served fresh in Addis Ababa.</p>
      
      {/* FilterShell is a client component receiving server-rendered DishList as children */}
      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}
