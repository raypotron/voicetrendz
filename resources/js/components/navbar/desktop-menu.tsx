'use client';

import { PageProps } from '@inertiajs/core';
import { Link, router } from '@inertiajs/react';
import { ChevronDown, Music, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
}

interface Props extends PageProps {
    user: User | null;
}

export default function DesktopMenu({ user }: Props) {
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
                { href: '/songs', label: 'Songs' },
            ],
        },
        {
            label: 'News',
            children: [
                { href: '/hot-stories', label: 'Hot Stories' },
                { href: '/news', label: 'Latest News' },
                { href: '/', label: 'Trending Topics', icon: TrendingUp },
            ],
        },
        { href: '/artists', label: 'Artists' },
        {
            label: 'Community',
            children: [
                { href: '/community', label: 'Community' },
                { href: '/polls', label: 'Fan Polls' },
            ],
        },
        {
            href: user ? '/user' : '/user/login',
            label: user ? 'Dashboard' : 'Login',
        },
    ];

    const handleDropdownToggle = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <div className="relative hidden items-center space-x-1 md:flex">
            {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href || '');

                if (item.children) {
                    return (
                        <div
                            key={item.label}
                            className="group relative"
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
                                className={`absolute left-0 mt-2 w-48 transform rounded-md bg-white shadow-lg ring-1 ring-black/5 transition-all duration-150 ${
                                    openDropdown === item.label
                                        ? 'visible translate-y-0 opacity-100'
                                        : 'invisible -translate-y-2 opacity-0'
                                } group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}
                            >
                                <div className="py-2">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            className={`block px-4 py-2 text-sm transition-all ${
                                                isActive(child.href)
                                                    ? 'bg-purple-50 font-medium text-primary'
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

                if (item.href === '/user/login' || user) {
                    return (
                        <button
                            onClick={() =>
                                window.location.replace(item.href)
                            }
                            className={`flex items-center gap-1 rounded-md px-3 cursor-pointer py-2 transition-all duration-200 ${
                            active
                                ? 'font-semibold text-primary'
                                : 'text-gray-700 hover:text-purple-500'
                        }`}
                        >
                            {item.label}
                        </button>
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
