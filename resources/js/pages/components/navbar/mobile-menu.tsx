"use client"

import {Link} from "@inertiajs/react"
import useBlog from "@/hooks/use-blog"

export default function MobileMenu() {
  const { isMobileMenuOpen } = useBlog()

  if (!isMobileMenuOpen) return null

  return (
    <div className="md:hidden py-4 space-y-2">
      <Link href="/" className="block py-2 hover:text-purple-600">
        Home
      </Link>
      <Link href="/hot-stories" className="block py-2 hover:text-purple-600">
        Hot Stories
      </Link>
      <Link href="/music-videos" className="block py-2 hover:text-purple-600">
        Music & Video
      </Link>
      <Link href="/news" className="block py-2 hover:text-purple-600">
        News
      </Link>
      <Link href="/artists" className="block py-2 hover:text-purple-600">
        Artists
      </Link>
      <Link href="/community" className="block py-2 hover:text-purple-600">
        Community
      </Link>
      <Link href="/advertise" className="block py-2 hover:text-purple-600">
        Advertise
      </Link>
    </div>
  )
}
