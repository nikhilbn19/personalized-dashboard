import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PreferencesState = {
  categories: string[];
  darkMode: boolean;
  searchQuery: string;
};


const initialState: PreferencesState = {
  categories: [],
  darkMode: false,
  searchQuery: "",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;

      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(state.darkMode));

        
        if (state.darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("categories", JSON.stringify(state.categories));
      }
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("searchQuery", state.searchQuery);
      }
    },
  
    loadPreferences(state, action: PayloadAction<PreferencesState>) {
      state.categories = action.payload.categories;
      state.darkMode = action.payload.darkMode;
      state.searchQuery = action.payload.searchQuery;
    },
  },
});

export const {
  toggleDarkMode,
  setCategories,
  setSearchQuery,
  loadPreferences,
} = preferencesSlice.actions;

export const preferencesReducer = preferencesSlice.reducer;
