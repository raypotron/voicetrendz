"use client"

import useBlog from "@/hooks/use-blog"
import { PageProps } from '@inertiajs/core';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    thumbnail_url: string;
    created_at: string;
}

interface Props extends PageProps {
    news: Post[];
}


export default function NewsPage({ news }: Props) {
  const { cardBg, isDarkMode } = useBlog()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Latest News</h1>
        <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Breaking news and updates from the African music industry
        </p>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className={`${cardBg} rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer flex gap-4`}
          >
            <img
              src={item.thumbnail_url || "/placeholder.svg"}
              alt={item.title}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 hover:text-purple-600 transition">{item.title}</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>{item.excerpt}</p>
              <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{dayjs(item.created_at).fromNow()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
