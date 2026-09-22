export function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, items: [...state.items, action.dish] };
    case "remove":
      return {
        ...state,
        items: state.items.filter((_, idx) => idx !== action.index),
      };
    case "clear":
      return { items: [] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}