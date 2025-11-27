'use client';

import useBlog from '@/hooks/use-blog';
import { socialLinks } from '@/types/socialData';
import { Link } from '@inertiajs/react';

export default function Footer() {
    const { isDarkMode, cardBg } = useBlog();

    return (
        <footer
            className={`nav-gradient sm:px-10 ${cardBg} border-t border-gray-900/70 transition-all duration-300`}
        >
            <div className="mx-auto px-4 py-8 sm:px-8 md:py-10">
                <div className="mb-10">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src={`${isDarkMode ? '/logo_b.png' : '/logo_w.png'}`}
                            alt="VoiceTrendz Logo"
                            width={40}
                            height={40}
                            className="rounded-full object-contain"
                        />
                        <span className={`text-2xl font-bold`}>
                            VoiceTrendz
                        </span>
                    </Link>
                </div>
                <div className="mb-6 flex space-x-6 sm:mb-10">
                    {socialLinks.map((link) => (
                        <Link
                            key={link.name}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(link.url, "_blank", "noopener,noreferrer");
                            }}
                            aria-label={link.name}
                            className="icon-bg rounded-full p-2 text-gray-400 transition-colors hover:bg-[#1A3D64] hover:text-amber-600"
                        >
                            <link.Icon size={24} />
                        </Link>
                    ))}
                </div>
                {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] "> */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Brand Info */}

                    {/* About / Advertise */}
                    <div>
                        <h4 className={`mb-4 text-lg font-bold`}>
                            Advertise With Us
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/about-us"
                                    className="transition-colors hover:text-amber-600"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact-us"
                                    className="transition-colors hover:text-amber-600"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/support"
                                    className="transition-colors hover:text-amber-600"
                                >
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact-us"
                                    className="transition-colors hover:text-amber-600"
                                >
                                    Email us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className={`mb-4 text-lg font-bold`}>Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="transition-colors hover:text-amber-600"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="transition-colors hover:text-amber-600"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className={`mb-4 text-lg font-bold`}>Community</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/community"
                                    className="transition-colors hover:text-amber-600"
                                >
                                    Forums
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/polls"
                                    className="transition-colors hover:text-amber-600"
                                >
                                    Fan Polls
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Footer Bottom */}
            <div
                className={`mt-4 border-t border-slate-900 pt-4 text-center text-sm`}
            >
                <p className="opacity-60">
                    &copy; {new Date().getFullYear()} VoiceTrendz. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
