"use client"

import useBlog from "@/hooks/use-blog"

export default function AdvertisePage() {
  const { cardBg, isDarkMode } = useBlog()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Advertise With Us</h1>
        <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Reach millions of music fans across Africa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
          <h3 className="text-2xl font-bold mb-4">Display Advertising</h3>
          <ul className={`space-y-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            <li>• Banner ads on homepage</li>
            <li>• Sidebar placements</li>
            <li>• Category page sponsorships</li>
            <li>• Flexible pricing options</li>
          </ul>
          <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
            Learn More
          </button>
        </div>

        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
          <h3 className="text-2xl font-bold mb-4">Sponsored Content</h3>
          <ul className={`space-y-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            <li>• Featured articles</li>
            <li>• Artist spotlights</li>
            <li>• Press release distribution</li>
            <li>• Social media promotion</li>
          </ul>
          <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
            Learn More
          </button>
        </div>
      </div>

      <div className={`${cardBg} rounded-xl p-6 shadow-lg text-center`}>
        <h3 className="text-2xl font-bold mb-3">Ready to Advertise?</h3>
        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
          Contact our advertising team to discuss your campaign
        </p>
        <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
          Contact Us
        </button>
      </div>
    </div>
  )
}
