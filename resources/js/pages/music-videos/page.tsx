import useBlog from '@/hooks/use-blog';
import { PageProps } from '@inertiajs/core';
import { Play, X } from 'lucide-react';
import { useState } from 'react';

interface Video {
    title: string;
    artist: { id: number; stage_name: string };
    video_id: string;
    thumbnail_url: string;
}

interface Props extends PageProps {
    video: Video;
}

const EmptyState = ({ message }: { message: string }) => (
    <div className="flex justify-center py-8 text-sm text-gray-400">
        {message}
    </div>
);

export default function MusicVideosPage({ video }: Props) {
    const { cardBg, isDarkMode } = useBlog();
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold">Music & Videos</h1>
                <p
                    className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    Watch the latest music videos from your favorite artists
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {video ? (
                    (() => {
                        const isActive = activeVideo === video.video_id;

                        return (
                            <div
                                className={`${cardBg} overflow-hidden rounded-xl shadow-lg transition hover:shadow-2xl`}
                            >
                                <div className="group relative aspect-square cursor-pointer overflow-hidden">
                                    {isActive ? (
                                        <div className="relative h-full w-full">
                                            <iframe
                                                className="h-full w-full"
                                                src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1`}
                                                title={video.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                            <button
                                                onClick={() =>
                                                    setActiveVideo(null)
                                                }
                                                className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 transition hover:bg-black/70"
                                            >
                                                <X className="h-5 w-5 text-white" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <img
                                                src={
                                                    video.thumbnail_url ||
                                                    '/placeholder.svg'
                                                }
                                                alt={video.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                onClick={() =>
                                                    setActiveVideo(
                                                        video.video_id,
                                                    )
                                                }
                                            />
                                            <div
                                                onClick={() =>
                                                    setActiveVideo(
                                                        video.video_id,
                                                    )
                                                }
                                                className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/50"
                                            >
                                                <div className="opacity-100">
                                                    <Play className="h-16 w-16 fill-white text-white" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="p-3">
                                    <h3 className="truncate text-sm font-bold">
                                        {video.title}
                                    </h3>
                                    <p
                                        className={`text-xs ${
                                            isDarkMode
                                                ? 'text-gray-400'
                                                : 'text-gray-600'
                                        } truncate`}
                                    >
                                        {video.artist.stage_name}
                                    </p>
                                    <a
                                        href={`https://www.youtube.com/watch?v=${video.video_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 block text-xs text-blue-500 hover:underline"
                                    >
                                        Watch on YouTube
                                    </a>
                                </div>
                            </div>
                        );
                    })()
                ) : (
                    <EmptyState message="No music videos available." />
                )}
            </div>
        </div>
    );
}
