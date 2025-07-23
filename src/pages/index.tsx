import Layout from "@/components/Layout";
import ContentCard from "@/components/ContentCard";
import SearchBar from "@/components/SearchBar";
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";

// Define API categories properly
type ApiCategory = "news" | "movie" | "social" | "music" | "sports" | "finance";

const mapApiCategoryToUi = (
  apiCategory: ApiCategory
): "technology" | "sports" | "finance" => {
  if (apiCategory === "movie" || apiCategory === "music") return "sports";
  if (apiCategory === "social") return "finance";
  return "technology";
};

type Content = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: ApiCategory;
};

export default function Home() {
  const selectedCategories = useSelector(
    (state: RootState) => state.preferences.categories
  );
  const searchQuery = useSelector(
    (state: RootState) => state.preferences.searchQuery
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [content, setContent] = useState<Content[]>([]);

  const fetchContent = () => {
    setLoading(true);
    setError(false);

    let query = "";
    if (selectedCategories.length > 0) {
      query += `category=${selectedCategories[0]}`;
    } else {
      query += `category=technology`;
    }

    if (searchQuery.trim()) {
      query += `&search=${encodeURIComponent(searchQuery.trim())}`;
    }

    fetch(`/api/content?${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Content[]) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContent();
  }, [selectedCategories, searchQuery]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Personalized Feed 📡</h1>
      <SearchBar />

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500">
          🚨 Failed to load content. <br />
          <button
            onClick={fetchContent}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry 🔄
          </button>
        </div>
      ) : content.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          🎯 No content for the selected categories/search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              type={mapApiCategoryToUi(item.type)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
