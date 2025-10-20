"use client"

import { Eye, Clock } from "lucide-react"
import useBlog from "@/hooks/use-blog"

export default function HotStoriesPage() {
  const { cardBg, isDarkMode } = useBlog()

  const hotStories = [
    {
      id: 1,
      title: "Burna Boy's Secret Collaboration Leaked",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      views: "45K",
      time: "2h ago",
    },
    {
      id: 2,
      title: "Wizkid Spotted in Lagos Studio",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
      views: "32K",
      time: "5h ago",
    },
    {
      id: 3,
      title: "Davido Announces New Album Drop",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
      views: "28K",
      time: "8h ago",
    },
    {
      id: 4,
      title: "Tems Wins International Award",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
      views: "21K",
      time: "12h ago",
    },
    {
      id: 5,
      title: "Rema Breaks Streaming Records",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop",
      views: "38K",
      time: "3h ago",
    },
    {
      id: 6,
      title: "Asake Announces Tour Dates",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
      views: "25K",
      time: "6h ago",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Hot Stories</h1>
        <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Stay updated with the latest trending stories in African music
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotStories.map((story) => (
          <div
            key={story.id}
            className={`${cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={story.image || "/placeholder.svg"}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4 w-full">
                  <div className="flex items-center gap-3 text-white text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {story.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {story.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg group-hover:text-purple-600 transition">{story.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
