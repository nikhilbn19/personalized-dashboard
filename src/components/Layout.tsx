import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { loadPreferences } from "@/store/slices/preferencesSlice";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const darkMode = useSelector(
    (state: RootState) => state.preferences.darkMode
  );

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    const dark = JSON.parse(localStorage.getItem("darkMode") || "false");
    const searchQuery = localStorage.getItem("searchQuery") || "";

    dispatch(
      loadPreferences({
        categories,
        darkMode: dark,
        searchQuery,
      })
    );

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
