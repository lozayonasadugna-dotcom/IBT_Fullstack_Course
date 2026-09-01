import Header from "./components/Header";
import Dish from "./components/Dish";

const menu = [
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Shiro", price: 120 },
  { id: 3, name: "Tibs", price: 280 }
];

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="menu-list">
        {menu.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}

export default App;