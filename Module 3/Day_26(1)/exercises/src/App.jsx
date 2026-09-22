// Exercise 3: Dish component using destructured props
function Dish({ name, price }) {
  return (
    <div className="dish">
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </div>
  );
}

// Exercise 4: Header component
function Header() {
  return (
    <header>
      <h1>Addis Eats</h1>
      <p>Order great food across Addis.</p>
    </header>
  );
}

// Exercise 5: Array of dish data
const menu = [
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Shiro", price: 120 },
  { id: 3, name: "Tibs", price: 280 }
];

// Exercise 2 & Composition: Main App Component
export default function App() {
  return (
    <div className="app">
      {/* Exercise 4: Composing Header */}
      <Header />

      {/* Exercise 5: Rendering array with map and unique keys */}
      <div className="menu-list">
        {menu.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </div>
    </div>
  );
}