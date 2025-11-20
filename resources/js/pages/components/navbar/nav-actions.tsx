"use client"

import { Search, Moon, Sun, Menu, X } from "lucide-react"
import useBlog from "@/hooks/use-blog"

export default function NavActions() {
  const { isDarkMode, toggleTheme, isMobileMenuOpen, toggleMobileMenu, toggleSearch } = useBlog()

  return (
     <div className="flex items-center space-x-4">
      <button
        onClick={toggleSearch}
        className={`p-2 rounded-lg ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
      >
        <Search className="w-5 h-5" />
      </button>
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <button
        onClick={toggleMobileMenu}
        className={`md:hidden p-2 rounded-lg ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  )
}
