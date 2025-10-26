'use client';

import useBlog from '@/hooks/use-blog';
import { PageProps } from '@inertiajs/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Clock, Eye } from 'lucide-react';

dayjs.extend(relativeTime);

interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    thumbnail_url: string;
    created_at: string;
}

interface Props extends PageProps {
    hotStories: Post[];
}

export default function HotStoriesPage({ hotStories }: Props) {
    const { cardBg, isDarkMode } = useBlog();

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold">Hot Stories</h1>
                <p
                    className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    Stay updated with the latest trending stories in African
                    music
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {hotStories.map((story) => (
                    <div
                        key={story.id}
                        className={`${cardBg} group cursor-pointer overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl`}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={story.thumbnail_url || '/placeholder.svg'}
                                alt={story.title}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent">
                                <div className="w-full p-4">
                                    <div className="flex items-center gap-3 text-sm text-white">
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />{' '}
                                            {/* {story.views} */}
                                            45K
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />{' '}
                                            {story.created_at
                                                ? dayjs(story.created_at).fromNow()
                                                : ''}
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
                    </div>
                ))}
            </div>
        </div>
    );
}
