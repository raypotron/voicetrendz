"use client"

import { Play } from "lucide-react"
import useBlog from "@/hooks/use-blog"

export default function MusicVideosPage() {
  const { cardBg, isDarkMode } = useBlog()

  const videos = [
    {
      title: "Love Damini",
      artist: "Burna Boy",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
    {
      title: "Made in Lagos",
      artist: "Wizkid",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    },
    {
      title: "Timeless",
      artist: "Davido",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      title: "Born to Shine",
      artist: "Tems",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
    },
    {
      title: "Rave & Roses",
      artist: "Rema",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop",
    },
    {
      title: "Work of Art",
      artist: "Asake",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Music & Videos</h1>
        <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Watch the latest music videos from your favorite artists
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((item, idx) => (
          <div
            key={idx}
            className={`${cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer group`}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center">
                <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition fill-white" />
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm truncate">{item.title}</h3>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"} truncate`}>{item.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
