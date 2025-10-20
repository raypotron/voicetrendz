"use client"

import NavLogo from "./nav-logo"
import DesktopMenu from "./desktop-menu"
import NavActions from "./nav-actions"
import MobileMenu from "./mobile-menu"
import useBlog from "@/hooks/use-blog"

export default function Navbar() {
  const { cardBg, borderClass, textClass } = useBlog()

  return (
    <nav className={`sticky top-0 z-50 ${cardBg} border-b ${borderClass} backdrop-blur-lg ${textClass} bg-opacity-90`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLogo />
          <DesktopMenu />
          <NavActions />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MobileMenu />
      </div>
    </nav>
  )
}
