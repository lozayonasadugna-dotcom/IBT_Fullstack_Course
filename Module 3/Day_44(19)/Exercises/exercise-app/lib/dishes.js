export const dishes = [
  {
    id: "1",
    name: "Doro Wat",
    price: 450,
    summary: "Traditional Ethiopian chicken stew simmered with berbere spices and served with injera.",
  },
  {
    id: "2",
    name: "Tibs",
    price: 380,
    summary: "Tender pieces of sautéed meat prepared with onions, peppers, and Ethiopian spices.",
  },
  {
    id: "3",
    name: "Shiro",
    price: 220,
    summary: "A comforting Ethiopian chickpea stew seasoned with aromatic spices.",
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}
