export const dishes = [
  { id: "1", name: "Doro Wat", category: "Traditional", price: "450 ETB", description: "Spicy chicken stew with boiled eggs and injera." },
  { id: "2", name: "Beyaynetu", category: "Vegetarian", price: "250 ETB", description: "Assorted vegetarian stews served on injera." },
  { id: "3", name: "Kitfo", category: "Traditional", price: "500 ETB", description: "Minced raw beef seasoned with mitmita and niter kibbeh." },
  { id: "4", name: "Shiro Tegabeno", category: "Vegetarian", price: "200 ETB", description: "Rich chickpeas stew served piping hot in a clay pot." }
];

export async function getDishes() {
  // Simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dishes;
}

export async function getDishById(id) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dishes.find((d) => d.id === id);
}
