import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, setSearchQuery } from "@/store/slices/preferencesSlice";
import { RootState } from "@/store";
import { useState, useEffect } from "react";

export default function Topbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.preferences.darkMode);
  const [localSearch, setLocalSearch] = useState("");

  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchQuery(localSearch.trim().toLowerCase())); 
    }, 400); 

    return () => clearTimeout(debounceTimer); 
  }, [localSearch, dispatch]);

  const handleClearSearch = () => {
    setLocalSearch(""); 
    dispatch(setSearchQuery("")); 
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow transition-colors duration-300">
      <div className="text-xl font-semibold">Personalized Content Dashboard</div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)} 
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
        />

        
        {localSearch && (
          <button
            onClick={handleClearSearch}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
          >
            Clear
          </button>
        )}

        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}
