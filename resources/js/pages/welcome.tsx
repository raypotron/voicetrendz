"use client"

import React from "react"
import { ChevronRight, TrendingUp } from "lucide-react"
import { Link, usePage } from "@inertiajs/react"
import useBlog from "@/hooks/use-blog"
import { route } from "ziggy-js"

export default function Home() {
  const { props } = usePage()
  const { cardBg, isDarkMode, bgClass, textClass } = useBlog()

  const hotStories = [
    {
      id: 1,
      title: "Burna Boy's Secret Collaboration Leaked",
      image: "/burna-boy-music-studio.jpg",
      views: "45K",
      time: "2h ago",
    },
    {
      id: 2,
      title: "Wizkid Spotted in Lagos Studio",
      image: "/wizkid-recording-studio.jpg",
      views: "32K",
      time: "5h ago",
    },
    {
      id: 3,
      title: "Davido Announces New Album Drop",
      image: "/davido-album-announcement.jpg",
      views: "28K",
      time: "8h ago",
    },
    {
      id: 4,
      title: "Tems Wins International Award",
      image: "/tems-award-ceremony.jpg",
      views: "21K",
      time: "12h ago",
    },
  ]

  const latestNews = [
    {
      id: 5,
      title: "New Afrobeats Festival Announced for December",
      excerpt: "Major artists confirmed for Lagos mega event",
      time: "1h ago",
      image: "/afrobeats-festival-stage.jpg",
    },
    {
      id: 6,
      title: "Nigerian Music Streams Hit All-Time High",
      excerpt: "Industry reports 200% growth in digital consumption",
      time: "3h ago",
      image: "/music-streaming-analytics.jpg",
    },
    {
      id: 7,
      title: "Rising Star Signs Major Record Deal",
      excerpt: "Fresh talent secures international distribution",
      time: "6h ago",
      image: "/record-deal-signing.jpg",
    },
    {
      id: 8,
      title: "Music Video Breaks YouTube Records",
      excerpt: "10 million views in first 24 hours",
      time: "9h ago",
      image: "/youtube-music-video.jpg",
    },
  ]

  const trendingTopics = ["#BurnaBoy", "#Afrobeats2025", "#WizkidFC", "#NewMusicFriday", "#TemsVibes"]

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="/african-music-concert-stage.jpg"
          alt="Featured Story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full mb-3">
              BREAKING
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Future of African Music: What's Next in 2025
            </h1>
            <p className="text-gray-200 text-lg mb-4 max-w-2xl">
              Industry experts reveal game-changing trends that will reshape the African music scene
            </p>
            <Link
              href=""
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 w-fit text-white rounded-lg font-semibold flex items-center gap-2 transition"
            >
                
              Read Full Story <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hot Stories */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold flex items-center gap-2">🔥 Hot Stories</h2>
                <Link
                  href=""
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotStories.map((story) => (
                  <Link
                    key={story.id}
                    href=""
                    className={`${cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group`}
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
                            <span>👁 {story.views}</span>
                            <span>⏱ {story.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg group-hover:text-purple-600 transition">
                        {story.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Latest News</h2>
              <div className="space-y-4">
                {latestNews.map((news) => (
                  <Link
                    key={news.id}
                    href=""
                    className={`${cardBg} rounded-xl p-4 shadow hover:shadow-lg transition flex gap-4`}
                  >
                    <img
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 hover:text-purple-600 transition">
                        {news.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        } mb-2`}
                      >
                        {news.excerpt}
                      </p>
                      <span className="text-xs text-gray-500">{news.time}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg font-semibold transition">
                Load More Stories
              </button>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" /> Trending Topics
              </h3>
              <div className="space-y-2">
                {trendingTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    } cursor-pointer transition`}
                  >
                    <span className="font-semibold text-purple-600">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fan Poll */}
            <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Fan Poll</h3>
              <p className="mb-4 font-semibold">Who had the best album this year?</p>
              <div className="space-y-3">
                {["Burna Boy", "Wizkid", "Davido", "Tems"].map((artist, idx) => (
                  <button
                    key={idx}
                    className={`w-full p-3 rounded-lg text-left ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    } transition`}
                  >
                    {artist}
                  </button>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
                Vote Now
              </button>
            </div>

            {/* Social Media */}
            <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Twitter
                </button>
                <button className="p-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition">
                  Instagram
                </button>
                <button className="p-3 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition">
                  Facebook
                </button>
                <button className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
                  YouTube
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
