"use client"

import { Link } from "@inertiajs/react"
import useBlog from "@/hooks/use-blog"

export default function Footer() {
  const { cardBg, borderClass } = useBlog()

  return (
    <footer className={`${cardBg} border-t ${borderClass} mt-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-purple-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Email Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Advertise</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Ad Options
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Media Kit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Submit</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Submit Music
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Artist Profiles
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Forums
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-600">
                  Fan Polls
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Voicenute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
