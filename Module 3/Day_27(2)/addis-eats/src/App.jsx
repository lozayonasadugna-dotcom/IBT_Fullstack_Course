import Menu from "./components/Menu";
import { dishes } from "./data";

function App() {
  return (
    <main>
      <h1>Addis Eats Menu</h1>
      <Menu dishes={dishes} category="Mains" />
    </main>
  );
}

export default App;