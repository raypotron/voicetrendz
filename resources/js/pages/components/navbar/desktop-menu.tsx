"use client"

import { TrendingUp, Music, Users } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function DesktopMenu() {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link href="/" className="hover:text-purple-600 transition">
        Home
      </Link>
      <Link href="/hot-stories" className="hover:text-purple-600 transition flex items-center gap-1">
        <TrendingUp className="w-4 h-4" /> Hot Stories
      </Link>
      <Link href="/music-videos" className="hover:text-purple-600 transition flex items-center gap-1">
        <Music className="w-4 h-4" /> Music & Video
      </Link>
      <Link href="/news" className="hover:text-purple-600 transition">
        News
      </Link>
      <Link href="/artists" className="hover:text-purple-600 transition">
        Artists
      </Link>
      <Link href="/community" className="hover:text-purple-600 transition flex items-center gap-1">
        <Users className="w-4 h-4" /> Community
      </Link>
      <Link href="/advertise" className="hover:text-purple-600 transition">
        Advertise
      </Link>
    </div>
  )
}
