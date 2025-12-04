'use client';

import useBlog from '@/hooks/use-blog';
import { PageProps } from '@inertiajs/core';
import { Link, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ChevronRight, Music, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { route } from 'ziggy-js';

dayjs.extend(relativeTime);

interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    thumbnail_url: string;
    views: number;
    created_at: string;
    category?: { id: number; name: string };
}

interface Lyric {
    id: number;
    slug: string;
    title: string;
    thumbnail_url: string;
}

interface Song {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    views: number;
    thumbnail_url: string;
    created_at: string;
}

interface Poll {
    id: number;
    slug: string;
    question: string;
    options: [{ id: number; option_text: string }];
    expires_at: string;
    created_at: string;
}

interface User {
    id: number;
    name: string;
}

interface TrendingTopic {
    id: number;
    topic: string;
    key: string;
}

interface InertiaPageProps extends PageProps {
    user: User | null;
}

interface Artist {
    id: number;
    name: string;
    stage_name: string;
    slug: string;
    description: string;
    genres: {
        id: number;
        name: string;
    }[];
    image_path: string;
}

interface PressRelease {
    id: number;
    title: string;
    content: string;
    thumbnail_url: string;
    created_at: string;
    excerpt: string;
    slug: string;
    views: number;
    user: { id: number; name: string };
    category: { id: number; name: string };
}

interface Props extends PageProps {
    heroPosts?: Post[];
    hotStories?: Post[];
    latestNews?: Post[];
    songLyrics?: Lyric[];
    latestSongs?: Song[];
    poll?: Poll | null;
    trendingTopics?: TrendingTopic[];
    artists?: Artist[];
    pressReleases?: PressRelease[];
}

interface PollForm {
    poll_id: number | null;
    poll_option_id: number | null;
    user_id: number | null;
}

const EmptyState = ({ message }: { message: string }) => (
    <div className="flex justify-center py-8 text-sm text-gray-400">
        {message}
    </div>
);

export default function Home({
    heroPosts = [],
    hotStories = [],
    latestNews = [],
    songLyrics = [],
    latestSongs = [],
    poll = null,
    trendingTopics = [],
    artists = [],
    pressReleases = [],
}: Props) {
    const { cardBg, isDarkMode, bgClass, textClass } = useBlog();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const { props } = usePage<InertiaPageProps>();

    const user = props.user;

    const { post, setData, processing, errors, reset } = useForm<PollForm>({
        poll_id: poll?.id || null,
        poll_option_id: null,
        user_id: user?.id ?? null,
    });

    const handleVote = () => {
        if (!user) {
            window.location.replace('/user/login');
            return;
        }

        if (!selectedOption) {
            alert('Please select an option.');
            return;
        }

        post(route('polls.vote'), {
            preserveScroll: true,
            onSuccess: () => {
                setSuccess(true);
                reset();
            },
            onError: () => {
                setSuccess(false);
            },
        });
    };

    return (
        <div
            className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}
        >
            {/* Hero Banner */}
            {heroPosts && heroPosts.length > 0 ? (
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    slidesPerView={1}
                    // navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop
                    className="swiper-pagination-bullet-active h-96"
                >
                    {heroPosts.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-96 overflow-hidden">
                                <img
                                    src={
                                        item.thumbnail_url || '/placeholder.svg'
                                    }
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black via-black/50 to-transparent">
                                    <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                                        <span className="mb-3 inline-block rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                                            BREAKING
                                        </span>

                                        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                                            {item.title}
                                        </h1>

                                        <p className="mb-4 max-w-2xl text-lg text-gray-200">
                                            {item.excerpt}
                                        </p>

                                        <Link
                                            href={route(
                                                'posts.show',
                                                item.slug,
                                            )}
                                            className="flex w-fit items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-500"
                                        >
                                            Read Full Story{' '}
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="flex h-96 items-center justify-center bg-gray-200 text-gray-500">
                    No featured stories available
                </div>
            )}

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
                                    className="flex items-center gap-1 text-amber-600 hover:text-amber-500"
                                >
                                    View All{' '}
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {hotStories.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {hotStories.map((story) => (
                                        <Link
                                            key={story.id}
                                            href={route(
                                                'posts.show',
                                                story.slug,
                                            )}
                                            className={`${cardBg} group overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl`}
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={
                                                        story.thumbnail_url ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={story.title}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-slate-900 px-3 py-1 text-xs text-white backdrop-blur-md">
                                                    News
                                                </div>
                                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent">
                                                    <div className="w-full p-4">
                                                        <div className="flex items-center gap-3 text-sm text-white">
                                                            <span>
                                                                👁
                                                                {
                                                                    story.views
                                                                }{' '}
                                                                {story.views >
                                                                999
                                                                    ? 'k'
                                                                    : ''}
                                                            </span>
                                                            <span>
                                                                ⏱{' '}
                                                                {dayjs(
                                                                    story.created_at,
                                                                ).fromNow()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-lg font-bold transition group-hover:text-amber-600">
                                                    {story.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState message="No hot stories available." />
                            )}
                        </section>

                        {/* Latest News */}
                        <section>
                            <h2 className="mb-6 text-3xl font-bold">
                                Latest News
                            </h2>

                            {latestNews.length > 0 ? (
                                <>
                                    <div className="space-y-4">
                                        {latestNews.map((news) => (
                                            <Link
                                                key={news.id}
                                                href={route(
                                                    'posts.show',
                                                    news.slug,
                                                )}
                                                className={`${cardBg} flex gap-4 rounded-xl p-4 shadow transition hover:shadow-lg`}
                                            >
                                                <img
                                                    src={
                                                        news.thumbnail_url ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={news.title}
                                                    className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="mb-1 text-lg font-bold transition hover:text-amber-600">
                                                        {news.title}
                                                    </h3>
                                                    <p
                                                        className={`mb-2 text-sm ${
                                                            isDarkMode
                                                                ? 'text-gray-400'
                                                                : 'text-gray-600'
                                                        }`}
                                                    >
                                                        {news.excerpt}
                                                    </p>
                                                    <span className="text-xs text-gray-500">
                                                        {dayjs(
                                                            news.created_at,
                                                        ).fromNow()}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link href="/news">
                                        <button className="mt-6 w-full rounded-lg border-2 border-amber-600/60 py-3 font-semibold text-amber-600 transition hover:bg-amber-600 hover:text-white">
                                            Load More Stories
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <EmptyState message="No news available." />
                            )}
                        </section>

                        {/* Artist Spotlight */}
                        <section>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-3xl font-bold">
                                    👤 Artist Spotlight
                                </h2>
                                <Link
                                    href="/artists"
                                    className="flex items-center gap-1 text-amber-600 hover:text-amber-500"
                                >
                                    View All{' '}
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {artists.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {artists.map((artist) => (
                                        <Link
                                            key={artist.id}
                                            href={route(
                                                'artist.show',
                                                artist.slug,
                                            )}
                                            className={`${cardBg} group overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl`}
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={
                                                        artist.image_path ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={artist.name}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-slate-900 px-3 py-1 text-xs text-white backdrop-blur-md">
                                                    Artist
                                                </div>
                                                {/* <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent">
                                                    <div className="w-full p-4">
                                                        <div className="flex items-center gap-3 text-sm text-white">
                                                            <span>
                                                                👁
                                                                {
                                                                    story.views
                                                                }{' '}
                                                                {story.views >
                                                                999
                                                                    ? 'k'
                                                                    : ''}
                                                            </span>
                                                            <span>
                                                                ⏱{' '}
                                                                {dayjs(
                                                                    artist.created_at,
                                                                ).fromNow()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-lg font-bold transition group-hover:text-amber-600">
                                                    {artist.stage_name}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState message="No hot stories available." />
                            )}
                        </section>

                        {/* Latest Songs */}
                        <section>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-3xl font-bold">
                                    🎵 Latest Songs
                                </h2>
                                <Link
                                    href="/songs"
                                    className="flex items-center gap-1 text-amber-600 hover:text-amber-500"
                                >
                                    View All{' '}
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {latestSongs.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {latestSongs.map((song) => (
                                        <Link
                                            key={song.id}
                                            href={route(
                                                'songs.show',
                                                song.slug,
                                            )}
                                            className={`${cardBg} group overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl`}
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={
                                                        song.thumbnail_url ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={song.title}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-slate-900 px-3 py-1 text-xs text-white backdrop-blur-md">
                                                    Song
                                                </div>

                                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent">
                                                    <div className="w-full p-4">
                                                        <div className="flex items-center gap-3 text-sm text-white">
                                                            <span>
                                                                👁
                                                                {
                                                                    song.views
                                                                }{' '}
                                                                {song.views >
                                                                999
                                                                    ? 'k'
                                                                    : ''}
                                                            </span>
                                                            <span>
                                                                ⏱{' '}
                                                                {dayjs(
                                                                    song.created_at,
                                                                ).fromNow()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-lg font-bold transition group-hover:text-amber-600">
                                                    {song.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState message="No songs available." />
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Trending Topics */}
                        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                                <TrendingUp className="h-5 w-5 text-indigo-600" />{' '}
                                Trending Topics
                            </h3>
                            <div className="space-y-2">
                                {trendingTopics.map((trending, idx) => (
                                    <div
                                        key={idx}
                                        className={`rounded-lg p-3 ${
                                            isDarkMode
                                                ? 'bg-gray-700 hover:bg-gray-600'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                        } cursor-pointer transition`}
                                    >
                                        <Link
                                            key={idx}
                                            href={`/search?q=${encodeURIComponent(trending.key)}`}
                                        >
                                            <span className="font-semibold text-indigo-600">
                                                #{trending.topic}
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fan Poll */}
                        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
                            {success && (
                                <div className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 font-semibold text-green-700">
                                    Vote submitted successfully
                                </div>
                            )}
                            <h3 className="mb-4 text-xl font-bold">Fan Poll</h3>
                            <p className="mb-4 font-semibold">
                                {poll ? poll.question : 'No polls available.'}
                            </p>
                            {poll ? (
                                <>
                                    <div className="space-y-3">
                                        {poll.options.map(
                                            ({ id, option_text }) => (
                                                <button
                                                    key={id}
                                                    onClick={() => {
                                                        setSelectedOption(id);
                                                        setData((prev) => ({
                                                            ...prev,
                                                            poll_option_id: id,
                                                        }));
                                                    }}
                                                    className={`w-full rounded-lg p-3 text-left transition ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${selectedOption === id ? 'border-2 border-purple-600 font-bold' : ''} `}
                                                >
                                                    {option_text}
                                                </button>
                                            ),
                                        )}
                                    </div>

                                    <button
                                        onClick={handleVote}
                                        disabled={processing}
                                        className="mt-4 w-full rounded-lg bg-purple-600 py-2 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {processing ? 'Voting...' : 'Vote Now'}
                                    </button>

                                    {errors.poll_option_id && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.poll_option_id}
                                        </p>
                                    )}
                                </>
                            ) : (
                                <EmptyState message="No available." />
                            )}
                        </div>

                        {/* Song Lyrics */}
                        <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                                <Music className="h-5 w-5 text-indigo-600" />{' '}
                                Song Lyrics
                            </h3>
                            {songLyrics.length > 0 ? (
                                <div className="space-y-2">
                                    {songLyrics.map((lyric) => (
                                        <Link
                                            key={lyric.id}
                                            href={route(
                                                'lyrics.show',
                                                lyric.slug,
                                            )}
                                        >
                                            <div
                                                className={`rounded-lg p-3 ${
                                                    isDarkMode
                                                        ? 'bg-gray-700 hover:bg-gray-600'
                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                } cursor-pointer transition`}
                                            >
                                                <span className="font-semibold text-purple-600">
                                                    {lyric.title}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState message="No lyrics available." />
                            )}
                        </div>

                        {/* Press Release */}
                        <section>
                            <h2 className="mb-6 text-3xl font-bold">
                                Press Release
                            </h2>

                            {pressReleases.length > 0 ? (
                                <>
                                    <div className="space-y-4">
                                        {pressReleases.map((release) => (
                                            <Link
                                                key={release.id}
                                                href={route(
                                                    'press.release.show',
                                                    release.slug,
                                                )}
                                                className={`${cardBg} flex gap-4 rounded-xl p-4 shadow transition hover:shadow-lg`}
                                            >
                                                <img
                                                    src={
                                                        release.thumbnail_url ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={release.title}
                                                    className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="mb-1 text-lg font-bold transition hover:text-amber-600">
                                                        {release.title}
                                                    </h3>
                                                    <p
                                                        className={`mb-2 text-sm ${
                                                            isDarkMode
                                                                ? 'text-gray-400'
                                                                : 'text-gray-600'
                                                        }`}
                                                    >
                                                        {release.excerpt}
                                                    </p>
                                                    <span className="text-xs text-gray-500">
                                                        {dayjs(
                                                            release.created_at,
                                                        ).fromNow()}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link href="/press-release">
                                        <button className="mt-6 w-full rounded-lg border-2 border-amber-600/60 py-3 font-semibold text-amber-600 transition hover:bg-amber-600 hover:text-white">
                                            Load More Press Release
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <EmptyState message="No press releases available." />
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
