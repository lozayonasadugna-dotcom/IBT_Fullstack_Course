import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
import { dishes } from "../data";

const CATEGORIES = ["All", "Main", "Vegan", "Beverages"];

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [total, setTotal] = useState(0);

  // Derived filtered array (not kept in state)
  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((d) => d.category === selectedCategory);

  function handleAddToOrder(price) {
    setTotal((prevTotal) => prevTotal + price);
  }

  return (
    <div className="menu-container">
      <h2>Addis Eats Menu</h2>

      <CategoryBar
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <DishList dishes={filteredDishes} onAddToOrder={handleAddToOrder} />

      <div className="order-total">
        <h3>Running Total: {total} ETB</h3>
      </div>

      <hr />

      <OrderForm />
    </div>
  );
}

export default Menu;