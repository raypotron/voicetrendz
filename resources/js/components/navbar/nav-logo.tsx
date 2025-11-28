'use client';

import { Link } from '@inertiajs/react';
import useBlog from "@/hooks/use-blog"

export default function NavLogo() {
    const { isDarkMode } = useBlog()

    return (
        <Link href="/home">
            <div className="flex cursor-pointer items-center space-x-2 transition hover:opacity-80">
                <img
                    src={`${isDarkMode ? '/logo_b.png' : '/logo_w.png'}`}
                    alt="VoiceTrendz Logo"
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
                    VoiceTrendz
                </span>
            </div>
        </Link>
    );
}
