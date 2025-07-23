import Layout from "@/components/Layout";
import ContentCard from "@/components/ContentCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearFavorites } from "@/store/slices/favoritesSlice";
import Link from "next/link";

type ApiCategory = "news" | "movie" | "social";

const mapApiCategoryToUi = (
  apiCategory: ApiCategory
): "technology" | "sports" | "finance" => {
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

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.content.favorites);

  const handleClearFavorites = () => {
    if (
      confirm("Are you sure you want to clear all your favorites? 🗑️")
    ) {
      dispatch(clearFavorites());
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Your Favorites ❤️</h1>

      {favorites.length > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleClearFavorites}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear All 🗑️
          </button>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="mb-4">
            You don’t have any favorites yet. Go add some from your feed!
          </p>
          <Link href="/">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Back to Feed
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              type={mapApiCategoryToUi(item.type as ApiCategory)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
