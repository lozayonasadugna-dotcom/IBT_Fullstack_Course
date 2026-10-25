// lib/db.js

// Mock database for Addis Eats
const dishes = [
  { id: "dish_01", name: "Doro Wat", price: 450, category: "Traditional" },
  { id: "dish_02", name: "Kitfo", price: 500, category: "Traditional" },
  { id: "dish_03", name: "Tibis", price: 400, category: "Traditional" },
];

const orders = [];

export const db = {
  dish: {
    findMany: async () => dishes,
  },
};

export async function getDish(id) {
  return dishes.find((d) => d.id === id) || null;
}

export async function createOrder(data) {
  const newOrder = { id: `ord_${Date.now()}`, ...data, userId: "user_123" };
  orders.push(newOrder);
  return newOrder;
}

export async function getOrder(id) {
  return orders.find((o) => o.id === id) || { id, userId: "user_123" };
}

export async function markCancelled(id) {
  const order = orders.find((o) => o.id === id);
  if (order) order.status = "cancelled";
  return true;
}

export async function getSession() {
  // Mock session returning the current signed-in user
  return { id: "user_123", name: "Loza" };
}