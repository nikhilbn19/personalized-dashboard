import Layout from "@/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setCategories,
  toggleDarkMode,
} from "@/store/slices/preferencesSlice";
import { useEffect, useState } from "react";

const allCategories = ["technology", "sports", "finance", "movies", "music"];

export default function SettingsPage() {
  const dispatch = useDispatch();

  const darkMode = useSelector(
    (state: RootState) => state.preferences.darkMode
  );
  const selectedCategories = useSelector(
    (state: RootState) => state.preferences.categories
  );

  const [categories, setLocalCategories] = useState<string[]>(selectedCategories);

  
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleToggleCategory = (category: string) => {
    const updated = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category];

    setLocalCategories(updated);
    dispatch(setCategories(updated));
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Settings ⚙️</h1>

      <div className="space-y-6">
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Theme</h2>
          <button
            onClick={handleDarkModeToggle}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              darkMode
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300"
            }`}
          >
            {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

       
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Select Your Favorite Categories:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleToggleCategory(category)}
                className={`px-4 py-2 rounded transition-all duration-300 ${
                  categories.includes(category)
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
