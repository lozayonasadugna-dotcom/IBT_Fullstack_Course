import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem("sheger_favs") || "[]"),
  
  toggleFavorite: (item) => set((state) => {
    const exists = state.favorites.some((fav) => fav.id === item.id);
    const updated = exists
      ? state.favorites.filter((fav) => fav.id !== item.id)
      : [...state.favorites, item];
      
    localStorage.setItem("sheger_favs", JSON.stringify(updated));
    return { favorites: updated };
  }),
}));