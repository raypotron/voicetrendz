import useBlog from '@/hooks/use-blog';
import { Artist, Pagination } from '@/types';
import { PageProps } from '@inertiajs/core';
import { router } from '@inertiajs/react';

interface Props extends PageProps {
    artists: Pagination<Artist>;
}

const EmptyState = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center py-12 text-sm text-gray-400">
        {message}
    </div>
);

export default function ArtistsPage({ artists }: Props) {
    const { cardBg, isDarkMode } = useBlog();

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-8 text-center sm:text-left">
                <h1 className="mb-2 text-4xl font-bold">Artists</h1>
                <p
                    className={`text-lg ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                >
                    Discover talented artists from across Africa
                </p>
            </div>

            {/* Artists Grid */}
            {artists.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {artists.data.map((artist) => (
                        <div
                            key={artist.id}
                            onClick={() =>
                                router.visit(`/artists/${artist.slug}`)
                            }
                            className={`${cardBg} group cursor-pointer overflow-hidden rounded-xl shadow-lg transition hover:shadow-2xl`}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={
                                        artist.image_path || '/placeholder.svg'
                                    }
                                    alt={artist.stage_name}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="mb-2 text-xl font-bold">
                                    {artist.stage_name}
                                </h3>

                                {/* Genres */}
                                {artist.genres?.length > 0 ? (
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {artist.genres.map((genre) => (
                                            <span
                                                key={genre.id}
                                                className="inline-block rounded-full bg-amber-600 px-2 py-1 text-xs text-white"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p
                                        className={`text-xs italic ${
                                            isDarkMode
                                                ? 'text-gray-500'
                                                : 'text-gray-400'
                                        } mb-3`}
                                    >
                                        No genres listed
                                    </p>
                                )}

                                {/* Description */}
                                <p
                                    className={`text-sm ${
                                        isDarkMode
                                            ? 'text-gray-400'
                                            : 'text-gray-600'
                                    } mb-4`}
                                >
                                    {artist.description ||
                                        'No description available.'}
                                </p>

                                <button className="w-full cursor-pointer rounded-lg bg-amber-600 py-2 font-semibold text-white transition hover:bg-amber-700">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState message="No artists available at the moment." />
            )}

            <div className="mt-10 flex justify-center">
                <div className="flex items-center gap-2">
                    {artists.links.map((link, index) => (
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
