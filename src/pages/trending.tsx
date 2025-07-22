import Layout from "@/components/Layout";
import ContentCard from "@/components/ContentCard";
import Loader from "@/components/Loader"; // 🆕 Added
import { useEffect, useState } from "react";

type ContentType = "technology" | "sports" | "finance";

type Content = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: ContentType;
};

const categories: (ContentType | "all")[] = ["all", "technology", "sports", "finance"];

export default function TrendingPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [content, setContent] = useState<Content[]>([]);

  const [activeCategory, setActiveCategory] = useState<ContentType | "all">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("trendingCategory") as ContentType | "all") || "all";
    }
    return "all";
  });

  const fetchTrendingContent = async (category?: ContentType | "all") => {
    try {
      setLoading(true);
      setError(false);

      let url = `/api/content?trending=true`;
      if (category && category !== "all") {
        url += `&category=${category}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch trending content");

      const data: Content[] = await res.json();
      setContent(data);
    } catch (err) {
      console.error("❌ Error fetching trending content:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingContent(activeCategory);
  }, [activeCategory]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">🔥 Trending Now</h1>

      <div className="flex space-x-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              if (typeof window !== "undefined") {
                localStorage.setItem("trendingCategory", cat);
              }
            }}
            className={`px-3 py-1 rounded ${
              activeCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            } hover:bg-blue-400 transition`}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader /> // 🆕 Use Loader here
      ) : error ? (
        <div className="text-center text-red-500">
          🚨 Failed to load trending content. <br />
          <button
            onClick={() => fetchTrendingContent(activeCategory)}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry 🔄
          </button>
        </div>
      ) : content.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          😢 No trending content available.
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
              type={item.type}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
