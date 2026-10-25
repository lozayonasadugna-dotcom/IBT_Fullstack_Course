import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { dishes } from "./dishes";

export default async function MenuPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Our Menu</h2>
      <CategoryBar />
      <DishList dishes={dishes} />
    </div>
  );
}