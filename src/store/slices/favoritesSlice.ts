import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoriteItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: "technology" | "sports" | "finance";
};

type FavoritesState = {
  items: FavoriteItem[];
};


const isBrowser = typeof window !== "undefined";
const persistedFavorites: FavoriteItem[] = isBrowser
  ? JSON.parse(localStorage.getItem("favorites") || "[]")
  : [];

const initialState: FavoritesState = {
  items: persistedFavorites,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }

     
      if (isBrowser) {
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      if (isBrowser) {
        localStorage.setItem("favorites", JSON.stringify([]));
      }
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
