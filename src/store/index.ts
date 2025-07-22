import { configureStore } from "@reduxjs/toolkit";
import { preferencesReducer } from "./slices/preferencesSlice";
import { contentReducer } from "./slices/contentSlice";
import favoritesReducer from "./slices/favoritesSlice"; // 👈 Add this

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    content: contentReducer,
    favorites: favoritesReducer, // 👈 Add this
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
