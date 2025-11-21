"use client"

import { Link } from "@inertiajs/react"
import { Radio } from "lucide-react"

export default function NavLogo() {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
        <Radio className="w-8 h-8 text-purple-600" />
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          VoiceTrendz
        </span>
      </div>
    </Link>
  )
}
