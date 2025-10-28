"use client"

import useBlog from "@/hooks/use-blog"
import { PageProps } from '@inertiajs/core';

interface Artist {
    id: number;
    name: string;
    description: string;
    genres: {
        id: number;
        name: string
    }[];
    image_path: string;
}

interface Props extends PageProps {
    artists: Artist[];
}

export default function ArtistsPage({ artists }: Props) {
  const { cardBg, isDarkMode } = useBlog()

//   const artists = [
//     {
//       name: "Ayra Starr",
//       genre: "Afrobeats",
//       bio: "Rising star with powerful vocals",
//       image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
//     },
//     {
//       name: "Omah Lay",
//       genre: "Afrobeats",
//       bio: "Soulful melodies and unique sound",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
//     },
//     {
//       name: "Teni",
//       genre: "Afrobeats",
//       bio: "Energetic performer and songwriter",
//       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
//     },
//     {
//       name: "Fireboy DML",
//       genre: "R&B",
//       bio: "Smooth vocals and romantic lyrics",
//       image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
//     },
//     {
//       name: "Burna Boy",
//       genre: "Afrobeats",
//       bio: "Grammy-winning artist",
//       image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
//     },
//     {
//       name: "Wizkid",
//       genre: "Afrobeats",
//       bio: "International superstar",
//       image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
//     },
//   ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Artists</h1>
        <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Discover talented artists from across Africa
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className={`${cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer group`}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={artist.image_path || "/placeholder.svg"}
                alt={artist.name}
                className="h-100 w-100 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-xl mb-1">{artist.name}</h3>
                {artist.genres.map(genre => {
                    return (<span key={genre.id} className="inline-block px-2 py-1 bg-purple-600 text-white text-xs rounded-full mb-2">{genre.name}</span>);
                })}
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-3`}>{artist.description}</p>
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
