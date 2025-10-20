"use client"

import useBlog from "@/hooks/use-blog"

export default function CommunityPage() {
  const { cardBg, isDarkMode } = useBlog()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Community</h1>
        <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Join our vibrant community of music lovers and creators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
          <h3 className="text-2xl font-bold mb-4">Fan Discussions</h3>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            Engage with other fans, share your favorite artists, and discuss the latest releases.
          </p>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
            Join Discussions
          </button>
        </div>

        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
          <h3 className="text-2xl font-bold mb-4">Artist Spotlight</h3>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            Discover emerging artists and support new talent in the African music scene.
          </p>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
            Explore Artists
          </button>
        </div>

        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
          <h3 className="text-2xl font-bold mb-4">Events</h3>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            Stay updated on upcoming concerts, festivals, and music events.
          </p>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
            View Events
          </button>
        </div>

        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
          <h3 className="text-2xl font-bold mb-4">Contests</h3>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            Participate in contests and win exclusive merchandise and concert tickets.
          </p>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
            View Contests
          </button>
        </div>
      </div>
    </div>
  )
}
