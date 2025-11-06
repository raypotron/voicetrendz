'use client';

import { Link, router } from '@inertiajs/react';
import { ChevronDown, Music, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DesktopMenu() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname);
    const handleNavigate = () => updatePath();

    window.addEventListener('popstate', handleNavigate);
    router.on('finish', handleNavigate);

    return () => {
      window.removeEventListener('popstate', handleNavigate);
      router.off('finish', handleNavigate);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    {
      label: 'Songs',
      icon: Music,
      children: [
        { href: '/music-videos', label: 'Music Videos' },
        { href: '/lyrics', label: 'Lyrics' },
      ],
    },
    {
      label: 'News',
      children: [
        { href: '/hot-stories', label: 'Hot Stories' },
        { href: '/latest-news', label: 'Latest News' },
        { href: '/trending-topics', label: 'Trending Topics', icon: TrendingUp },
      ],
    },
    { href: '/artists', label: 'Artists' },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/advertise', label: 'Advertise' },
  ];

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="hidden items-center space-x-1 md:flex relative">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href || '');

        if (item.children) {
          return (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleDropdownToggle(item.label)}
                className={`flex items-center gap-1 rounded-md px-3 py-2 transition-all duration-200 ${
                  openDropdown === item.label || active
                    ? 'font-semibold text-primary'
                    : 'text-gray-700 hover:text-purple-500'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.label}
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown */}
              <div
                className={`absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 transform transition-all duration-150 ${
                  openDropdown === item.label
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-2 invisible'
                } group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible`}
              >
                <div className="py-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-4 py-2 text-sm transition-all ${
                        isActive(child.href)
                          ? 'bg-purple-50 text-primary font-medium'
                          : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href!}
            className={`flex items-center gap-1 rounded-md px-3 py-2 transition-all duration-200 ${
              active
                ? 'font-semibold text-primary'
                : 'text-gray-700 hover:text-purple-500'
            }`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
