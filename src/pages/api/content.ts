import type { NextApiRequest, NextApiResponse } from "next";


const NEWS_API_KEY = process.env.NEWS_API_KEY;


const mockContent = [
  {
    id: "1",
    title: "Breaking News: Tech Innovations 2025",
    description: "Discover the latest trends in AI, robotics, and more.",
    imageUrl: "https://source.unsplash.com/random/800x400?technology",
    type: "technology",
  },
  {
    id: "2",
    title: "Top Sports Moments of the Year 🏆",
    description: "Catch up on the most exciting sports highlights and records.",
    imageUrl: "https://source.unsplash.com/random/800x400?sports",
    type: "sports",
  },
  {
    id: "3",
    title: "Finance Tips for 2025 💰",
    description: "Learn how to save, invest, and grow your wealth.",
    imageUrl: "https://source.unsplash.com/random/800x400?finance",
    type: "finance",
  },
];

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
  const { category = "technology", search = "", trending } = req.query;

 
  if (trending === "true") {
    return res.status(200).json(mockTrendingContent);
  }

 
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&q=${encodeURIComponent(
    search as string
  )}&pageSize=10&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("NewsAPI fetch failed");

    const data = await response.json();

   
    const transformed = data.articles.map((article: any, index: number) => ({
      id: `${index}-${article.source?.id || "news"}`,
      title: article.title || "No Title",
      description: article.description || "No Description",
      imageUrl: article.urlToImage || "https://via.placeholder.com/800x400",
      type: category,
    }));

    res.status(200).json(transformed);
  } catch (error) {
    console.error("Error fetching NewsAPI:", error);
    
    res.status(200).json(mockContent);
  }
}
