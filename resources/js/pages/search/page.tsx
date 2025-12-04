import React, { useState, useEffect, FormEvent } from "react";
import { router, Link, usePage } from "@inertiajs/react";

import { Search, Music, FileText, Newspaper, Flame, ChevronRight, PersonStanding, VideoIcon } from "lucide-react";
import useBlog from "@/hooks/use-blog";
import { route } from "ziggy-js";

type ResultItem = {
  id: number;
  slug: string;
  title: string;
  type: string;
  route: string;
  thumbnail_url: string;
  artist?: string;
  date?: string;
  readTime?: string;
};

export default function SearchPage() {
  const { query, results } = usePage<{
    query: string;
    results: {
      songs: ResultItem[];
      lyrics: ResultItem[];
      news: ResultItem[];
      stories: ResultItem[];
      artists: ResultItem[];
      musicVideos: ResultItem[];
    };
  }>().props;

  const { bgClass, textClass, cardBg, borderClass } = useBlog();

  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(query || "");

  useEffect(() => {
    setSearchQuery(query || "");
  }, [query]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length) {
      router.get("/search", { q: searchQuery });
    }
  };

  const tabs = [
    { id: "all", label: "All Results", icon: Search },
    { id: "songs", label: "Songs", icon: Music },
    { id: "lyrics", label: "Lyrics", icon: FileText },
    { id: "news", label: "Latest News", icon: Newspaper },
    { id: "stories", label: "Hot Stories", icon: Flame },
    { id: "artists", label: "Artists", icon: PersonStanding },
    { id: "musicVideos", label: "Music Videos", icon: VideoIcon },
  ];

  const getFilteredResults = (): ResultItem[] => {
    if (activeTab === "all") {
      return [
        ...results.songs,
        ...results.lyrics,
        ...results.news,
        ...results.stories,
        ...results.artists,
        ...results.musicVideos,
      ];
    }

    return results[activeTab as keyof typeof results] ?? [];
  };

  const filteredResults = getFilteredResults();

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} pt-24 pb-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Search Results</h1>

          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for songs, artists, news..."
              className={`w-full pl-12 pr-4 py-4 rounded-xl ${cardBg} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-lg`}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />

            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-500/25"
                    : `${cardBg} ${textClass} border ${borderClass} hover:border-amber-500`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result, index) => (
            <Link href={route(`${result.route}`, result.slug)} key={`${result.type}-${result.id}-${index}`}>
              <div
                className={`${cardBg} rounded-2xl overflow-hidden border ${borderClass} hover:shadow-xl transition-all duration-300 group h-full flex flex-col`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={result.thumbnail_url || "/placeholder.svg"}
                    alt={result.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/20">
                    {result.type}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                    {result.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4 flex-1">
                    {result.artist || result.date || result.readTime}
                  </p>

                  <div className="flex items-center text-amber-500 text-sm font-medium mt-auto">
                    Read More{" "}
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
