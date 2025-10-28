'use client';

import { Link, router } from '@inertiajs/react';
import { Music, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DesktopMenu() {
    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(() => {
        const updatePath = () => setPathname(window.location.pathname);

        // ✅ Listen to global Inertia navigation events
        const handleNavigate = () => updatePath();
        window.addEventListener('popstate', handleNavigate);
        router.on('finish', handleNavigate);

        return () => {
            window.removeEventListener('popstate', handleNavigate);
            router.on('finish', handleNavigate);
        };
    }, []);

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/hot-stories', label: 'Hot Stories', icon: TrendingUp },
        { href: '/music-videos', label: 'Music & Video', icon: Music },
        { href: '/news', label: 'News' },
        { href: '/artists', label: 'Artists' },
        { href: '/community', label: 'Community', icon: Users },
        { href: '/advertise', label: 'Advertise' },
    ];

    return (
        <div className="hidden items-center space-x-1 md:flex">
            {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                    <Link
                        key={item.href}
                        href={item.href}
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
