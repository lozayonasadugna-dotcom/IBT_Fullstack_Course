// lib/dishes.js

const dishes = [
  { 
    id: "1", 
    name: "Doro Wat", 
    description: "Traditional spicy chicken stew simmered in berbere and spiced butter, served with hard-boiled eggs and injera.", 
    price: 450, 
    category: "Main",
    image: "/doro-wat.jpg" 
  },
  { 
    id: "2", 
    name: "Kitfo", 
    description: "Finely minced lean beef warmed in spiced clarified butter (niter kibe) and mitmita, served traditional style (leb leb).", 
    price: 500, 
    category: "Main",
    image: "/kitfo.jpg" 
  },
  { 
    id: "3", 
    name: "Shiro", 
    description: "Thick, rich chickpea and split pea stew simmered with garlic, onions, and traditional spices.", 
    price: 250, 
    category: "Vegetarian",
    image: "/shiro.jpg" 
  },
  { 
    id: "4", 
    name: "Beyaynetu", 
    description: "A vibrant fasting platter of various seasoned vegetarian stews, lentils, and greens laid over soft injera.", 
    price: 300, 
    category: "Vegetarian",
    image: "/beyaynetu.jpg" 
  },
  { 
    id: "5", 
    name: "Tibs", 
    description: "Juicy cubed beef sautéed in a hot pan with onions, garlic, rosemary, and green jalapeño peppers.", 
    price: 480, 
    category: "Main",
    image: "/tibs.jpg" 
  },
  { 
    id: "6", 
    name: "Firfir", 
    description: "Shredded injera soaked in a flavorful, spicy berbere sauce and seasoned butter with beef strips.", 
    price: 280, 
    category: "Breakfast",
    image: "/firfir.jpg" 
  },
  { 
    id: "7", 
    name: "Chechebsa", 
    description: "Torn pieces of thin flatbread sautéed in berbere and spiced butter, served warm with honey.", 
    price: 260, 
    category: "Breakfast",
    image: "/chechebsa.jpg" 
  },
  { 
    id: "8", 
    name: "Gored Gored", 
    description: "Cubes of raw or lightly warmed prime beef seasoned with mitmita and purified spiced butter.", 
    price: 520, 
    category: "Main",
    image: "/gored-gored.jpg" 
  },
  { 
    id: "9", 
    name: "Dulet", 
    description: "Finely chopped tripe, liver, and lean beef cooked with onions, hot peppers, garlic, and spiced butter.", 
    price: 380, 
    category: "Breakfast",
    image: "/dulet.jpg" 
  },
  { 
    id: "10", 
    name: "Asa Tibs", 
    description: "Fresh fish chunks pan-fried with onions, tomatoes, and spicy berbere or rosemary seasoning.", 
    price: 550, 
    category: "Main",
    image: "/asa-tibs.jpg" 
  },
  { 
    id: "11", 
    name: "Misir Wot", 
    description: "A rich, spicy red lentil stew slow-cooked with onions, garlic, ginger, and berbere.", 
    price: 240, 
    category: "Vegetarian",
    image: "/misir-wot.jpg" 
  },
  { 
    id: "12", 
    name: "Kik Alicha", 
    description: "Mild yellow split pea stew gently seasoned with turmeric, garlic, and ginger.", 
    price: 230, 
    category: "Vegetarian",
    image: "/kik-alicha.jpg" 
  },
  { 
    id: "13", 
    name: "Genfo", 
    description: "Traditional stiff porridge made from barley or wheat flour, served with a deep well of spiced butter and berbere.", 
    price: 220, 
    category: "Breakfast",
    image: "/genfo.jpg" 
  },
  { 
    id: "14", 
    name: "Atakilt Wot", 
    description: "A flavorful medley of lightly sautéed cabbage, carrots, and potatoes cooked with turmeric and garlic.", 
    price: 240, 
    category: "Vegetarian",
    image: "/atakilt-wot.jpg" 
  },
  { 
    id: "15", 
    name: "Ful", 
    description: "Slow-cooked mashed fava beans garnished with onions, tomatoes, green chilies, olive oil, and cumin, served with bread.", 
    price: 200, 
    category: "Breakfast",
    image: "/ful.jpg" 
  }
];

export async function getDishes() {
  return dishes;
}

export async function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}