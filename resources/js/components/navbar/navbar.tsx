import NavLogo from "./nav-logo";
import DesktopMenu from "./desktop-menu";
import { Search, X } from "lucide-react";
import NavActions from "./nav-actions";
import MobileMenu from "./mobile-menu";
import useBlog from "@/hooks/use-blog";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { PageProps } from '@inertiajs/core';

interface User {
    id: number;
    name: string;
}

interface Props extends PageProps {
    user: User | null;
}

export default function Navbar({ user }: Props) {
  const { cardBg, borderClass, isSearchOpen, toggleSearch } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.get("/search", { q: searchQuery }, { preserveState: true });

      toggleSearch();
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 ${cardBg} border-b ${borderClass} backdrop-blur-lg bg-opacity-90`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavLogo />
            <DesktopMenu user={user} />
            <NavActions />
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for songs, artists, news..."
                  autoFocus
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                <button
                  type="button"
                  onClick={toggleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MobileMenu />
        </div>
      </nav>

      {/* Backdrop for search */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 top-16"
          onClick={toggleSearch}
        />
      )}
    </>
  );
}
