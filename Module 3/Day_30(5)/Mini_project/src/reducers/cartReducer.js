export function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return { items: [...state.items, action.dish] };
    case "remove":
      return {
        items: state.items.filter((dish) => dish.id !== action.id),
      };
    case "clear":
      return { items: [] };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// Verification Test Call (Run outside React)
if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
  const initial = { items: [] };
  const added = cartReducer(initial, { type: "add", dish: { id: "1", name: "Doro Wat", price: 240 } });
  console.assert(added.items.length === 1, "Reducer Add Failed");

  const removed = cartReducer(added, { type: "remove", id: "1" });
  console.assert(removed.items.length === 0, "Reducer Remove Failed");

  const cleared = cartReducer(
    cartReducer(initial, { type: "add", dish: { id: "2", name: "Shiro", price: 120 } }),
    { type: "clear" }
  );
  console.assert(cleared.items.length === 0, "Reducer Clear Failed");
}