"use client"

import { Play, X } from "lucide-react"
import { useState } from "react"
import useBlog from "@/hooks/use-blog"

export default function MusicVideosPage() {
  const { cardBg, isDarkMode } = useBlog()
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const videos = [
    {
      title: "Love Damini",
      artist: "Burna Boy",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      videoId: "J3rOq9lYjeQ", // replace with actual YouTube ID
    },
    {
      title: "Made in Lagos",
      artist: "Wizkid",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      videoId: "qEEsc8j-FVI",
    },
    {
      title: "Timeless",
      artist: "Davido",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      videoId: "5OyDO_02yj8",
    },
    {
      title: "Born to Shine",
      artist: "Tems",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
      videoId: "1JltlSJH5bY",
    },
    {
      title: "Rave & Roses",
      artist: "Rema",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop",
      videoId: "_X-DFExVGbQ",
    },
    {
      title: "Work of Art",
      artist: "Asake",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop",
      videoId: "pBsfFaMGtp0",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((item, idx) => {
          const isActive = activeVideo === item.videoId
          return (
            <div
              key={idx}
              className={`${cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition`}
            >
              <div className="relative aspect-square overflow-hidden cursor-pointer">
                {isActive ? (
                  <div className="relative w-full h-full">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      onClick={() => setActiveVideo(item.videoId)}
                    />
                    <div
                      onClick={() => setActiveVideo(item.videoId)}
                      className="absolute inset-0 bg-black/0 hover:bg-black/50 flex items-center justify-center transition"
                    >
                      <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition fill-white" />
                    </div>
                  </>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm truncate">{item.title}</h3>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"} truncate`}>
                  {item.artist}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${item.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline mt-1 block"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
