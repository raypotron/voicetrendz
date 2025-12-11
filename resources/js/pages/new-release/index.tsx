import useBlog from '@/hooks/use-blog';
import { NewRelease } from '@/types';
import { PageProps } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import { Clock, Eye } from 'lucide-react';

dayjs.extend(relativeTime);

interface Props extends PageProps {
    newReleases: NewRelease[];
}

export default function NewReleasePage({ newReleases }: Props) {
    const { cardBg, isDarkMode } = useBlog();

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold">
                    Trending New Release
                </h1>
                <p
                    className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    Stay updated with the latest trending new releases
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newReleases.map((newRelease) => (
                    <div
                        key={newRelease.id}
                        onClick={() =>
                            router.visit(
                                `${newRelease.type == 'mp3' ? 'songs' : 'music-videos'}/${newRelease.slug}`,
                            )
                        }
                        className={`${cardBg} group cursor-pointer overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl`}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={
                                    newRelease.thumbnail_url ||
                                    '/placeholder.svg'
                                }
                                alt={newRelease.title}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-slate-900 px-3 py-1 text-xs text-white backdrop-blur-md">
                                {newRelease.type == 'mp3' ? 'Song' : 'Video'}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold transition group-hover:text-amber-600">
                                {newRelease.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
