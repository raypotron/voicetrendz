'use client';

import useBlog from '@/hooks/use-blog';
import { PageProps } from '@inertiajs/core';
import { Link } from '@inertiajs/react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { route } from 'ziggy-js';

interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    thumbnail_url: string;
    created_at: string;
    category: { id: number; name: string };
}

interface Props extends PageProps {
    heroPost: Post;
}

export default function Home({ heroPost }: Props) {
    // const { props } = usePage();
    const { cardBg, isDarkMode, bgClass, textClass } = useBlog();

    const hotStories = [
        {
            id: 1,
            title: "Burna Boy's Secret Collaboration Leaked",
            image: '/burna-boy-music-studio.jpg',
            views: '45K',
            time: '2h ago',
        },
        {
            id: 2,
            title: 'Wizkid Spotted in Lagos Studio',
            image: '/wizkid-recording-studio.jpg',
            views: '32K',
            time: '5h ago',
        },
        {
            id: 3,
            title: 'Davido Announces New Album Drop',
            image: '/davido-album-announcement.jpg',
            views: '28K',
            time: '8h ago',
        },
        {
            id: 4,
            title: 'Tems Wins International Award',
            image: '/tems-award-ceremony.jpg',
            views: '21K',
            time: '12h ago',
        },
    ];

    const latestNews = [
        {
            id: 5,
            title: 'New Afrobeats Festival Announced for December',
            excerpt: 'Major artists confirmed for Lagos mega event',
            time: '1h ago',
            image: '/afrobeats-festival-stage.jpg',
        },
        {
            id: 6,
            title: 'Nigerian Music Streams Hit All-Time High',
            excerpt: 'Industry reports 200% growth in digital consumption',
            time: '3h ago',
            image: '/music-streaming-analytics.jpg',
        },
        {
            id: 7,
            title: 'Rising Star Signs Major Record Deal',
            excerpt: 'Fresh talent secures international distribution',
            time: '6h ago',
            image: '/record-deal-signing.jpg',
        },
        {
            id: 8,
            title: 'Music Video Breaks YouTube Records',
            excerpt: '10 million views in first 24 hours',
            time: '9h ago',
            image: '/youtube-music-video.jpg',
        },
    ];

    const trendingTopics = [
        '#BurnaBoy',
        '#Afrobeats2025',
        '#WizkidFC',
        '#NewMusicFriday',
        '#TemsVibes',
    ];

    return (
        <div
            className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}
        >
            {/* Hero Banner */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={heroPost.thumbnail_url || '/placeholder.svg'}
                    alt="Featured Story"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black via-black/50 to-transparent">
                    <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <span className="mb-3 inline-block rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                            BREAKING
                        </span>
                        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                            {heroPost.title}
                        </h1>
                        <p className="mb-4 max-w-2xl text-lg text-gray-200">
                            {heroPost.excerpt}
                        </p>
                        <Link
                            href={route(
                                'posts.show',
                                heroPost.slug,
                            )}
                            className="flex w-fit items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
                        >
                            Read Full Story <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-12 lg:col-span-2">
                        {/* Hot Stories */}
                        <section>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-3xl font-bold">
                                    🔥 Hot Stories
                                </h2>
                                <Link
                                    href="/hot-stories"
                                    className="flex items-center gap-1 text-purple-600 hover:text-purple-700"
                                >
                                    View All{' '}
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {hotStories.map((story) => (
                                    <Link
                                        key={story.id}
                                        href=""
                                        className={`${cardBg} group overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl`}
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={
                                                    story.image ||
                                                    '/placeholder.svg'
                                                }
                                                alt={story.title}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent">
                                                <div className="w-full p-4">
                                                    <div className="flex items-center gap-3 text-sm text-white">
                                                        <span>
                                                            👁 {story.views}
                                                        </span>
                                                        <span>
                                                            ⏱ {story.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold transition group-hover:text-purple-600">
                                                {story.title}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Latest News */}
                        <section>
                            <h2 className="mb-6 text-3xl font-bold">
                                Latest News
                            </h2>
                            <div className="space-y-4">
                                {latestNews.map((news) => (
                                    <Link
                                        key={news.id}
                                        href={route('posts.show', news.id)}
                                        className={`${cardBg} flex gap-4 rounded-xl p-4 shadow transition hover:shadow-lg`}
                                    >
                                        <img
                                            src={
                                                news.image || '/placeholder.svg'
                                            }
                                            alt={news.title}
                                            className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="mb-1 text-lg font-bold transition hover:text-purple-600">
                                                {news.title}
                                            </h3>
                                            <p
                                                className={`text-sm ${
                                                    isDarkMode
                                                        ? 'text-gray-400'
                                                        : 'text-gray-600'
                                                } mb-2`}
                                            >
                                                {news.excerpt}
                                            </p>
                                            <span className="text-xs text-gray-500">
                                                {news.time}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <button className="mt-6 w-full rounded-lg border-2 border-purple-600 py-3 font-semibold text-purple-600 transition hover:bg-purple-600 hover:text-white">
                                Load More Stories
                            </button>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Trending Topics */}
                        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                                <TrendingUp className="h-5 w-5 text-purple-600" />{' '}
                                Trending Topics
                            </h3>
                            <div className="space-y-2">
                                {trendingTopics.map((topic, idx) => (
                                    <div
                                        key={idx}
                                        className={`rounded-lg p-3 ${
                                            isDarkMode
                                                ? 'bg-gray-700 hover:bg-gray-600'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                        } cursor-pointer transition`}
                                    >
                                        <span className="font-semibold text-purple-600">
                                            {topic}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fan Poll */}
                        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
                            <h3 className="mb-4 text-xl font-bold">Fan Poll</h3>
                            <p className="mb-4 font-semibold">
                                Who had the best album this year?
                            </p>
                            <div className="space-y-3">
                                {['Burna Boy', 'Wizkid', 'Davido', 'Tems'].map(
                                    (artist, idx) => (
                                        <button
                                            key={idx}
                                            className={`w-full rounded-lg p-3 text-left ${
                                                isDarkMode
                                                    ? 'bg-gray-700 hover:bg-gray-600'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                            } transition`}
                                        >
                                            {artist}
                                        </button>
                                    ),
                                )}
                            </div>
                            <button className="mt-4 w-full rounded-lg bg-purple-600 py-2 font-semibold text-white transition hover:bg-purple-700">
                                Vote Now
                            </button>
                        </div>

                        {/* Social Media */}
                        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
                            <h3 className="mb-4 text-xl font-bold">
                                Follow Us
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700">
                                    Twitter
                                </button>
                                <button className="rounded-lg bg-pink-600 p-3 text-white transition hover:bg-pink-700">
                                    Instagram
                                </button>
                                <button className="rounded-lg bg-blue-800 p-3 text-white transition hover:bg-blue-900">
                                    Facebook
                                </button>
                                <button className="rounded-lg bg-red-600 p-3 text-white transition hover:bg-red-700">
                                    YouTube
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
