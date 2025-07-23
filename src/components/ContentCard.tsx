import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addFavorite, removeFavorite } from "@/store/slices/contentSlice";

export type ContentCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: "technology" | "sports" | "finance";
};

export default function ContentCard({
  id,
  title,
  description,
  imageUrl,
  type,
}: ContentCardProps) {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: RootState) => state.content.favorites
  );
  const isFavorite = favorites.some((item) => item.id === id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(
        addFavorite({
          id,
          title,
          description,
          imageUrl,
          type,
        })
      );
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <Image
        src={imageUrl}
        alt={title}
        width={800}
        height={400}
        className="w-full h-40 object-cover transition duration-300"
      />
      <div className="p-4">
        <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
          <span>ID: {id}</span>
          <span className="uppercase">{type}</span>
        </div>
        <h2 className="text-lg font-bold mt-1">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
            {type === "technology"
              ? "Read More"
              : type === "sports"
              ? "Watch"
              : type === "finance"
              ? "View"
              : "Explore"}
          </button>

          <button
            onClick={handleToggleFavorite}
            className={`ml-2 text-xl ${
              isFavorite ? "text-red-500" : "text-gray-400"
            } hover:scale-110 transition`}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}
