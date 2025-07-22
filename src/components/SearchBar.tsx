// components/SearchBar.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearchQuery } from "@/store/slices/preferencesSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.preferences.searchQuery
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        placeholder="🔎 Search articles, movies, music..."
        value={searchQuery}
        onChange={handleChange}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      <button
        onClick={() => dispatch(setSearchQuery(""))}
        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-md dark:bg-gray-700 dark:hover:bg-gray-600"
        title="Clear search"
      >
        ❌
      </button>
    </div>
  );
}
