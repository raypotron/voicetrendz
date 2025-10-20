"use client"

import useBlog from "@/hooks/use-blog"

export default function NewsPage() {
  const { cardBg, isDarkMode } = useBlog()

  const news = [
    {
      title: "New Afrobeats Festival Announced for December",
      excerpt: "Major artists confirmed for Lagos mega event",
      time: "1h ago",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
    },
    {
      title: "Nigerian Music Streams Hit All-Time High",
      excerpt: "Industry reports 200% growth in digital consumption",
      time: "3h ago",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
    },
    {
      title: "Rising Star Signs Major Record Deal",
      excerpt: "Fresh talent secures international distribution",
      time: "6h ago",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop",
    },
    {
      title: "Music Video Breaks YouTube Records",
      excerpt: "10 million views in first 24 hours",
      time: "9h ago",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Latest News</h1>
        <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Breaking news and updates from the African music industry
        </p>
      </div>

      <div className="space-y-4">
        {news.map((item, idx) => (
          <div
            key={idx}
            className={`${cardBg} rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer flex gap-4`}
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 hover:text-purple-600 transition">{item.title}</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>{item.excerpt}</p>
              <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
