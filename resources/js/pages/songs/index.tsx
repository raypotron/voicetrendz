import useBlog from '@/hooks/use-blog';
import { Pagination, Song } from '@/types';
import { PageProps } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Clock, Eye } from 'lucide-react';

dayjs.extend(relativeTime);

interface Props extends PageProps {
    songs: Pagination<Song>;
}

export default function SongsPage({ songs }: Props) {
    const { cardBg, isDarkMode } = useBlog();

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold">Trending Songs</h1>
                <p
                    className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    Stay updated with the latest trending songs
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {songs.data.map((song) => (
                    <div
                        key={song.id}
                        onClick={() => router.visit(`/songs/${song.slug}`)}
                        className={`${cardBg} group cursor-pointer overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl`}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={song.thumbnail_url || '/placeholder.svg'}
                                alt={song.title}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent">
                                <div className="w-full p-4">
                                    <div className="flex items-center gap-3 text-sm text-white">
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />{' '}
                                            {/* {story.views} */}
                                            <span>
                                                {song.views}{' '}
                                                {song.views > 999 ? 'k' : ''}
                                            </span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />{' '}
                                            {song.created_at
                                                ? dayjs(
                                                      song.created_at,
                                                  ).fromNow()
                                                : ''}
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
                    </div>
                ))}
            </div>
            <div className="mt-10 flex justify-center">
                <div className="flex items-center gap-2">
                    {songs.links.map((link, index) => (
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
