import { Menu } from "./components/Menu";
import { dishes } from "./data";

export default function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Addis Eats Menu</h1>

      {/* Main Category */}
      <Menu dishes={dishes} selectedCategory="Main" />

      {/* Vegan Category */}
      <Menu dishes={dishes} selectedCategory="Vegan" />

      {/* Beverage Category */}
      <Menu dishes={dishes} selectedCategory="Beverage" />

      {/* Empty State Test */}
      <Menu dishes={dishes} selectedCategory="Dessert" />
    </div>
  );
}