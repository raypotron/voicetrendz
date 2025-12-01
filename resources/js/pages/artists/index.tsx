"use client";

import useBlog from "@/hooks/use-blog";
import { PageProps } from "@inertiajs/core";
import { router } from '@inertiajs/react';

interface Artist {
  id: number;
  name: string;
  stage_name: string;
  slug: string;
  description: string;
  genres: {
    id: number;
    name: string;
  }[];
  image_path: string;
}

interface Props extends PageProps {
  artists?: Artist[];
}

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center py-12 text-gray-400 text-sm">
    {message}
  </div>
);

export default function ArtistsPage({ artists = [] }: Props) {
  const { cardBg, isDarkMode } = useBlog();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-4xl font-bold mb-2">Artists</h1>
        <p
          className={`text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Discover talented artists from across Africa
        </p>
      </div>

      {/* Artists Grid */}
      {artists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => router.visit(`/artists/${artist.slug}`)}
              className={`${cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer group`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={artist.image_path || "/placeholder.svg"}
                  alt={artist.stage_name}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{artist.stage_name}</h3>

                {/* Genres */}
                {artist.genres?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {artist.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="inline-block px-2 py-1 bg-amber-600 text-white text-xs rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p
                    className={`text-xs italic ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    } mb-3`}
                  >
                    No genres listed
                  </p>
                )}

                {/* Description */}
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } mb-4`}
                >
                  {artist.description || "No description available."}
                </p>

                <button className="w-full py-2 bg-amber-600 hover:bg-amber-700 cursor-pointer text-white rounded-lg font-semibold transition">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No artists available at the moment." />
      )}
    </div>
  );
}
