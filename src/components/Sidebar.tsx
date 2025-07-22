import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <div className="p-6 text-2xl font-bold">Dashboard</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              Feed
            </Link>
          </li>
          <li>
            <Link href="/trending" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              Trending
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              Favorites
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
