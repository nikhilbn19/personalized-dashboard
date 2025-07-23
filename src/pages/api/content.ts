import type { NextApiRequest, NextApiResponse } from "next";

const NEWS_API_KEY = process.env.NEWS_API_KEY;

interface Article {
  title?: string;
  description?: string;
  urlToImage?: string;
}

const mockTrendingContent = [
  {
    id: "trending-1",
    title: "🚀 SpaceX Breaks Records Again",
    description: "SpaceX launches the largest satellite constellation yet.",
    imageUrl: "https://source.unsplash.com/random/800x400?space",
    type: "technology",
  },
  {
    id: "trending-2",
    title: "🎬 Top 10 Must-Watch Movies This Summer",
    description: "A handpicked list of blockbuster hits and hidden gems.",
    imageUrl: "https://source.unsplash.com/random/800x400?movies",
    type: "sports",
  },
  {
    id: "trending-3",
    title: "📈 Cryptocurrency Market Trends 2025",
    description: "Bitcoin and Ethereum soar as new investors flood in.",
    imageUrl: "https://source.unsplash.com/random/800x400?crypto",
    type: "finance",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category, search, trending } = req.query;

  if (trending === "true") {
    return res.status(200).json(mockTrendingContent);
  }

  try {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${NEWS_API_KEY}`;

    if (category && typeof category === "string") {
      apiUrl += `&category=${category}`;
    }

    if (search && typeof search === "string" && search.trim() !== "") {
      apiUrl += `&q=${encodeURIComponent(search.trim())}`;
    }

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch from NewsAPI");

    const data = await response.json();

    const transformed = (data.articles as Article[]).map((article, index) => ({
      id: `${index + 1}`,
      title: article.title || "No Title",
      description: article.description || "No Description",
      imageUrl:
        article.urlToImage || "https://source.unsplash.com/random/800x400?news",
      type: category || "technology",
    }));

    res.status(200).json(transformed);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ message: "Failed to fetch news content." });
  }
}
