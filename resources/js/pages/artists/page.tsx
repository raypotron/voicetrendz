

import FormatContent from '@/components/form-content';
import useBlog from '@/hooks/use-blog';
import { PageProps } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    Facebook,
    Heart,
    Mail,
    MessageCircle,
    Share2,
    User,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';

dayjs.extend(relativeTime);

interface Artist {
    id: number;
    name: string;
    stage_name: string;
    description: string;
    social_media_followers: number;
    bio: string;
    image_path: string;
    created_at: string;
    slug: string;
}

interface Props extends PageProps {
    artist: Artist;
    relatedArtists?: Artist[];
}

export default function ArtistPage({ artist, relatedArtists }: Props) {
    const { isDarkMode } = useBlog();
    const [liked, setLiked] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const encodedUrl = encodeURIComponent(artist.slug);
    const encodedTitle = encodeURIComponent(artist.description);

    const shareLinks = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        gmail: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    };

    // console.log(artist.content);

    if (!artist) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                    <button
                        onClick={() => router.visit(document.referrer || '/')}
                        className="mb-8 flex items-center gap-2 text-primary transition-colors hover:text-accent"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        <span className="font-medium">Back</span>
                    </button>

                    <div className="py-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold">
                            artist not found
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            The artist you're looking for doesn't exist.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen bg-background text-foreground ${
                isDarkMode ? 'dark' : ''
            }`}
        >
            <article className="w-full">
                {/* Hero Image */}
                <div className="relative h-96 w-full overflow-hidden bg-muted sm:h-[500px]">
                    <img
                        src={artist.image_path || '/placeholder.svg'}
                        alt={artist.description}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Back button */}
                    <div className="mt-8 mb-8 flex justify-between gap-4">
                        <button
                            onClick={() => router.visit('/artists')}
                            className="flex items-center gap-2 font-medium text-primary transition-colors hover:text-accent"
                        >
                            <ChevronLeft className="h-5 w-5" />
                            Back to artists
                        </button>
                        <button
                            onClick={() => router.visit('/home')}
                            className="flex items-center gap-2 font-medium text-primary transition-colors hover:text-accent"
                        >
                            Back to Home
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        {/* <div className="mb-4">
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                                {artist.category.name}
                            </span>
                        </div> */}

                        <h1 className="blog-title post-card-title mb-6">
                            {artist.description}
                        </h1>

                        <div className="blog-meta space-y-1 border-b border-border pb-6">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                    {artist.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {dayjs(artist.created_at).format(
                                        'MMMM D, YYYY',
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaUserFriends className="h-4 w-4 text-muted-foreground" />
                                <span>{artist.social_media_followers}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {dayjs(artist.created_at).fromNow()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <article className="">
                        <FormatContent html={artist.bio} />
                    </article>

                    {/* Actions */}
                    <div className="relative flex flex-wrap items-center gap-4 border-t border-b border-border py-8">
                        {/* Like Button */}
                        <button
                            onClick={() => setLiked(!liked)}
                            className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                                liked
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                        >
                            <Heart
                                className={`h-5 w-5 ${liked ? 'fill-current' : ''}`}
                            />
                            {liked ? 'Liked' : 'Like this article'}
                        </button>

                        {/* Share Button */}
                        <div className="relative">
                            <button
                                onClick={() => setShowShare(!showShare)}
                                className="flex cursor-pointer items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
                            >
                                <Share2 className="h-5 w-5" />
                                Share
                            </button>

                            {/* Dropdown Menu */}
                            {showShare && (
                                <div
                                    className={`animate-fade-in absolute left-0 z-20 mt-2 w-56 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg ring-1 ring-black/5`}
                                    onMouseLeave={() => setShowShare(false)}
                                >
                                    <div className="flex flex-col py-2">
                                        <a
                                            href={shareLinks.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                        >
                                            <MessageCircle className="h-4 w-4 text-green-500" />
                                            Share on WhatsApp
                                        </a>
                                        <a
                                            href={shareLinks.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                        >
                                            <Facebook className="h-4 w-4 text-blue-600" />
                                            Share on Facebook
                                        </a>
                                        <a
                                            href={shareLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                        >
                                            <X className="h-4 w-4 text-sky-500" />
                                            Share on Twitter
                                        </a>
                                        <a
                                            href={shareLinks.gmail}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                        >
                                            <Mail className="h-4 w-4 text-red-500" />
                                            Share via Gmail
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related artists */}
                    <div className="py-12">
                        <h2 className="mb-8 text-3xl font-bold">
                            Other artists
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {relatedArtists?.length ? (
                                relatedArtists.map((relatedArtist) => (
                                    <div
                                        key={relatedArtist.id}
                                        onClick={() =>
                                            router.visit(
                                                `/artists/${relatedArtist.slug}`,
                                            )
                                        }
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative mb-4 h-48 overflow-hidden rounded-lg bg-muted">
                                            <img
                                                src={
                                                    relatedArtist.image_path ||
                                                    '/placeholder.svg'
                                                }
                                                alt={relatedArtist.description}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
                                            {relatedArtist.description}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {dayjs(
                                                relatedArtist.created_at,
                                            ).fromNow()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">
                                    No related artists available.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
