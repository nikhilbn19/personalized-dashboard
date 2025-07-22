import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ApiCategory = "news" | "movie" | "social";
type UiCategory = "technology" | "sports" | "finance";

type ContentItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: ApiCategory | UiCategory; 
};

type ContentState = {
  items: ContentItem[];
  favorites: ContentItem[];
};

const initialState: ContentState = {
  items: [],
  favorites: [],
};


const mapApiCategoryToUi = (apiCategory: ApiCategory): UiCategory => {
  switch (apiCategory) {
    case "news":
      return "technology";
    case "movie":
      return "sports";
    case "social":
      return "finance";
    default:
      return "technology"; 
  }
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent(state, action: PayloadAction<ContentItem[]>) {
     
      state.items = action.payload.map((item) => ({
        ...item,
        type: mapApiCategoryToUi(item.type as ApiCategory),
      }));
    },
    addFavorite(state, action: PayloadAction<ContentItem>) {
      const exists = state.favorites.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setContent, addFavorite, removeFavorite } = contentSlice.actions;
export const contentReducer = contentSlice.reducer;
