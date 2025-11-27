'use client';

import useBlog from '@/hooks/use-blog';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function MobileMenu() {
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useBlog();

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
        { href: '/hot-stories', label: 'Hot Stories' },
        { href: '/music-videos', label: 'Music & Video' },
        { href: '/news', label: 'News' },
        { href: '/artists', label: 'Artists' },
        { href: '/community', label: 'Community' },
        { href: '/advertise', label: 'Advertise' },
    ];

    if (!isMobileMenuOpen) return null;

    return (
        <div className="space-y-2 py-4 md:hidden">
            {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 hover:text-purple-600 ${
                            active
                                ? 'font-semibold text-primary'
                                : 'text-gray-700 hover:text-purple-500'
                        }`}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </div>
    );
}
