import Menu from "./components/Menu";
import { dishes } from "./data";

function App() {
  return (
    <main className="app-container">
      <h1>Addis Eats Menu</h1>

      {/* Mains Category */}
      <Menu dishes={dishes} category="Mains" />

      {/* Vegetarian Category */}
      <Menu dishes={dishes} category="Vegetarian" />

      {/* Beverages Category */}
      <Menu dishes={dishes} category="Beverages" />

      {/* Empty State Test (Triggers Early Return) */}
      <Menu dishes={dishes} category="Dessert" />
    </main>
  );
}

export default App;