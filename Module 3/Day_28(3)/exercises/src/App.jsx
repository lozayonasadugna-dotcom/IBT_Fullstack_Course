import { useState } from "react";
import PropTypes from "prop-types";

// Exercise 1: Dish component with local count state & "Add" button
function Dish({ name, price, spicy = false, onAddToCart }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
    onAddToCart(price); // Exercise 5: updates total order amount in parent
  };

  return (
    <div
      className="dish"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "8px 0",
        borderRadius: "6px",
      }}
    >
      <h3>
        {name} {count > 0 && `(Ordered: ${count})`}{" "}
        {Boolean(spicy) && <span>🌶️ Spicy</span>}
      </h3>
      <p>{price} ETB</p>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  onAddToCart: PropTypes.func.isRequired,
};

// Exercise 2 & 3: Stateless CategoryBar receiving selected and onSelect props
function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          style={{
            backgroundColor: cat === selected ? "#007bff" : "#e0e0e0",
            color: cat === selected ? "#ffffff" : "#000000",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

// Exercise 6 & 7: Controlled Delivery Form with live TeleBirr validation
function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  // Exercise 7: Regex for TeleBirr (+2519... or 09...)
  const isPhoneValid = /^(?:\+2510?|0)9\d{8}$/.test(form.phone.trim());

  // Exercise 6: One change handler for all controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order submitted for ${form.name} in ${form.area}!`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "24px",
        borderTop: "2px solid #ccc",
        paddingTop: "16px",
      }}
    >
      <h3>Delivery Details</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>Name: </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>TeleBirr Phone: </label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="0911223344 or +251911223344"
        />
        {form.phone && !isPhoneValid && (
          <p style={{ color: "red", fontSize: "12px", margin: "4px 0" }}>
            Please enter a valid Ethiopian phone number starting with 09... or
            +2519...
          </p>
        )}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Area: </label>
        <select name="area" value={form.area} onChange={handleChange}>
          <option value="Bole">Bole</option>
          <option value="Ayat">Ayat</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Piassa">Piassa</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!isPhoneValid || !form.name.trim()}
        style={{ padding: "8px 16px" }}
      >
        Submit Order
      </button>
    </form>
  );
}

// Sample Dish Data
const dishesData = [
  { id: 1, name: "Doro Wat", price: 240, category: "Main", spicy: true },
  { id: 2, name: "Shiro", price: 120, category: "Main", spicy: false },
  { id: 3, name: "Tibs", price: 280, category: "Grill", spicy: true },
  { id: 4, name: "Beyaynetu", price: 150, category: "Vegan", spicy: false },
];

export default function App() {
  // Exercise 3: Lifted category state
  const [category, setCategory] = useState("All");
  // Exercise 5: Running order total state
  const [orderTotal, setOrderTotal] = useState(0);

  const categories = ["All", "Main", "Vegan", "Grill", "Dessert"];

  // Exercise 4: Filter dish list based on active category
  const filteredDishes =
    category === "All"
      ? dishesData
      : dishesData.filter((d) => d.category === category);

  const handleAddToCart = (price) => {
    setOrderTotal((prevTotal) => prevTotal + price);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Addis Eats Interactive Menu</h1>

      {/* Category Selection Bar */}
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      {/* Exercise 4: Empty state using early return logic inside JSX */}
      {filteredDishes.length === 0 ? (
        <p>No dishes found in the category "{category}".</p>
      ) : (
        filteredDishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            onAddToCart={handleAddToCart}
          />
        ))
      )}

      {/* Exercise 5: Running order total */}
      <div style={{ margin: "20px 0", fontSize: "18px", fontWeight: "bold" }}>
        Running Order Total: {orderTotal} ETB
      </div>

      {/* Controlled Delivery Form */}
      <OrderForm />
    </div>
  );
}