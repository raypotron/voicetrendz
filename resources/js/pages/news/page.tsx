'use client';

import useBlog from '@/hooks/use-blog';
import { Pagination, Post } from '@/types';
import { PageProps } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props extends PageProps {
    news: Pagination<Post>;
}

export default function NewsPage({ news }: Props) {
    const { cardBg, isDarkMode } = useBlog();

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold">Latest News</h1>
                <p
                    className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    Breaking news and updates from the African music industry
                </p>
            </div>

            <div className="space-y-4">
                {news.data.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => router.visit(`/posts/${item.slug}`)}
                        className={`${cardBg} flex cursor-pointer gap-4 rounded-xl p-4 shadow transition hover:shadow-lg`}
                    >
                        <img
                            src={item.thumbnail_url || '/placeholder.svg'}
                            alt={item.title}
                            className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="mb-1 text-lg font-bold transition hover:text-amber-600">
                                {item.title}
                            </h3>
                            <p
                                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}
                            >
                                {item.excerpt}
                            </p>
                            <span
                                className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
                            >
                                {dayjs(item.created_at).fromNow()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <div className="flex items-center gap-2">
                    {news.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`rounded-md border px-4 py-2 ${
                                link.active
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                            } ${!link.url ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
