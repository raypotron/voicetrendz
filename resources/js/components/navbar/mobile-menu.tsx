import useBlog from '@/hooks/use-blog';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PageProps } from '@inertiajs/core';

interface User {
    id: number;
    name: string;
    roles: string[];
}

interface Props extends PageProps {
    user: User | null;
}

export default function MobileMenu({ user }: Props) {
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
        if (href === '/home') {
            return pathname === '/home';
        }
        return pathname.startsWith(href);
    };

    const navItems = [
        { href: '/home', label: 'Home' },
        { href: '/hot-stories', label: 'Hot Stories' },
        { href: '/music-videos', label: 'Music Videos' },
        { href: '/lyrics', label: 'Lyrics' },
        { href: '/songs', label: 'Songs' },
        { href: '/news', label: 'De Latest' },
        { href: '/press-release', label: 'Press Release' },
        { href: '/artists', label: 'Artists' },
        { href: '/community', label: 'Community' },
        { href: '/polls', label: 'Fan Polls' },
        {
            href: user ? '/user' : '/user/login',
            label: user ? 'Dashboard' : 'Login',
        },

    ];

    if (!isMobileMenuOpen) return null;

    return (
        <div className="space-y-2 py-4 md:hidden">
            {navItems.map((item) => {
                const active = isActive(item.href);

            if( item.href === '/user/login' || user ) {
                return (
                    <button
                            onClick={() =>
                                window.location.replace(
                                    user?.roles.includes('admin') &&
                                        item.label == 'Dashboard'
                                        ? '/admin'
                                        : item.href,
                                )
                            }
                            key={item.href}
                            className={`block py-2 hover:text-purple-600 ${
                            active
                                ? 'font-semibold text-primary'
                                : 'text-gray-700 hover:text-purple-500'
                        }`}
                        >
                            {item.label}
                        </button>
                )
            }

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
