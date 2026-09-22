import { cartReducer } from "./cartReducer";

// Test initial state
const initialState = { items: [] };

// Test 'add'
const stateWithItem = cartReducer(initialState, {
  type: "add",
  dish: { name: "Doro Wat", price: 240 },
});
console.assert(stateWithItem.items.length === 1, "Failed: Item was not added");

// Test 'remove'
const stateAfterRemove = cartReducer(stateWithItem, {
  type: "remove",
  index: 0,
});
console.assert(stateAfterRemove.items.length === 0, "Failed: Item was not removed");

// Test 'clear'
const stateWithMultiple = cartReducer(
  cartReducer(initialState, { type: "add", dish: { name: "Shiro", price: 120 } }),
  { type: "add", dish: { name: "Tibs", price: 280 } }
);
const stateAfterClear = cartReducer(stateWithMultiple, { type: "clear" });
console.assert(stateAfterClear.items.length === 0, "Failed: Cart was not cleared");

console.log("All cartReducer unit tests passed!");