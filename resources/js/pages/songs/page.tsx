'use client';

import axios from '@/axios';
import useBlog from '@/hooks/use-blog';
import useLikeable from '@/hooks/use-likeable';
import { PageProps } from '@inertiajs/core';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    Calendar,
    ChevronLeft,
    Clock,
    Eye,
    Facebook,
    Heart,
    ListMusic,
    Mail,
    MessageCircle,
    Share2,
    User,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaApple, FaSpotify } from 'react-icons/fa';
import { SiAudiomack } from 'react-icons/si';
dayjs.extend(relativeTime);

interface Song {
    id: number;
    title: string;
    content: string;
    thumbnail_url: string;
    file_path: string;
    created_at: string;
    views: number;
    slug: string;
    audio_mack: string;
    apple_music: string;
    spotify: string;
    voicenute: string;
    user: { id: number; name: string };
}

interface User {
    id: number;
    name: string;
}

interface InertiaPageProps extends PageProps {
    user: User | null;
}

interface Props extends PageProps {
    song: Song;
    relatedSongs: Song[];
    isLiked: boolean;
    likesCount: number;
}

export default function SongPage({
    song,
    relatedSongs,
    isLiked,
    likesCount,
}: Props) {
    const { isDarkMode } = useBlog();
    const [showShare, setShowShare] = useState(false);
    const [showListen, setShowListen] = useState(false);
    const [views, setViews] = useState(song.views);

    const { props } = usePage<InertiaPageProps>();

    const user = props.user;

    const encodedUrl = encodeURIComponent(song.slug);
    const encodedTitle = encodeURIComponent(song.title);

    const { liked, count, toggleLike } = useLikeable({
        likeableId: song.id,
        likeableType: 'song',
        initialLiked: isLiked,
        initialCount: likesCount,
        routeName: 'like.toggle',
    });

    const handleLikeClick = () => {
        if (!user) {
            window.location.replace('/user/login');
            return;
        }
        toggleLike();
    };

    const shareLinks = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        gmail: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    };

    useEffect(() => {
        const trackView = async () => {
            try {
                const response = await axios.post(
                    `/songs/${song.slug}/track-view`,
                );
                setViews(response.data.views); // Update view count in real-time
            } catch (err) {
                console.error('Error tracking post view:', err);
            }
        };

        trackView();
    }, [song.slug]);

    const formatContent = (content: string) => {
        // Parse HTML content and render with proper styling
        const parseHTML = (html: string) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            return Array.from(doc.body.childNodes).map((node, idx) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent?.trim();
                    if (text) {
                        return (
                            <p key={idx} className="blog-paragraph">
                                {text}
                            </p>
                        );
                    }
                    return null;
                }

                if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node as Element;
                    //   const innerHTML = element.innerHTML

                    switch (element.tagName.toLowerCase()) {
                        case 'img':
                            return (
                                <figure key={idx} className="blog-figure">
                                    <img
                                        src={
                                            element.getAttribute('src') ||
                                            '/placeholder.svg'
                                        }
                                        alt={
                                            element.getAttribute('alt') ||
                                            'Blog image'
                                        }
                                        className="blog-image"
                                    />
                                    {element.getAttribute('alt') && (
                                        <figcaption className="blog-figcaption">
                                            {element.getAttribute('alt')}
                                        </figcaption>
                                    )}
                                </figure>
                            );
                        case 'h4':
                            return (
                                <h4 key={idx} className="blog-heading-4">
                                    {element.textContent}
                                </h4>
                            );
                        case 'h3':
                            return (
                                <h3 key={idx} className="blog-heading-3">
                                    {element.textContent}
                                </h3>
                            );
                        case 'h2':
                            return (
                                <h2 key={idx} className="blog-heading-2">
                                    {element.textContent}
                                </h2>
                            );
                        case 'p':
                            return (
                                <p key={idx} className="blog-paragraph">
                                    {Array.from(element.childNodes).map(
                                        (child, childIdx) => {
                                            if (
                                                child.nodeType ===
                                                Node.TEXT_NODE
                                            ) {
                                                return child.textContent;
                                            }
                                            if (
                                                child.nodeType ===
                                                Node.ELEMENT_NODE
                                            ) {
                                                const childEl =
                                                    child as Element;
                                                if (
                                                    childEl.tagName.toLowerCase() ===
                                                    'strong'
                                                ) {
                                                    return (
                                                        <strong key={childIdx}>
                                                            {
                                                                childEl.textContent
                                                            }
                                                        </strong>
                                                    );
                                                }
                                                if (
                                                    childEl.tagName.toLowerCase() ===
                                                    'em'
                                                ) {
                                                    return (
                                                        <em key={childIdx}>
                                                            {
                                                                childEl.textContent
                                                            }
                                                        </em>
                                                    );
                                                }
                                            }
                                            return null;
                                        },
                                    )}
                                </p>
                            );
                        case 'ul':
                            return (
                                <ul key={idx} className="blog-list">
                                    {Array.from(element.children).map(
                                        (li, liIdx) => (
                                            <li
                                                key={liIdx}
                                                className="blog-list-item"
                                            >
                                                {Array.from(li.childNodes).map(
                                                    (child, childIdx) => {
                                                        if (
                                                            child.nodeType ===
                                                            Node.TEXT_NODE
                                                        ) {
                                                            return child.textContent;
                                                        }
                                                        if (
                                                            child.nodeType ===
                                                            Node.ELEMENT_NODE
                                                        ) {
                                                            const childEl =
                                                                child as Element;
                                                            if (
                                                                childEl.tagName.toLowerCase() ===
                                                                'p'
                                                            ) {
                                                                return (
                                                                    <span
                                                                        key={
                                                                            childIdx
                                                                        }
                                                                    >
                                                                        {Array.from(
                                                                            childEl.childNodes,
                                                                        ).map(
                                                                            (
                                                                                pChild,
                                                                                pIdx,
                                                                            ) => {
                                                                                if (
                                                                                    pChild.nodeType ===
                                                                                    Node.TEXT_NODE
                                                                                ) {
                                                                                    return pChild.textContent;
                                                                                }
                                                                                if (
                                                                                    pChild.nodeType ===
                                                                                    Node.ELEMENT_NODE
                                                                                ) {
                                                                                    const pChildEl =
                                                                                        pChild as Element;
                                                                                    if (
                                                                                        pChildEl.tagName.toLowerCase() ===
                                                                                        'strong'
                                                                                    ) {
                                                                                        return (
                                                                                            <strong
                                                                                                key={
                                                                                                    pIdx
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    pChildEl.textContent
                                                                                                }
                                                                                            </strong>
                                                                                        );
                                                                                    }
                                                                                }
                                                                                return null;
                                                                            },
                                                                        )}
                                                                    </span>
                                                                );
                                                            }
                                                        }
                                                        return null;
                                                    },
                                                )}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            );
                        case 'ol':
                            return (
                                <ol key={idx} className="blog-ordered-list">
                                    {Array.from(element.children).map(
                                        (li, liIdx) => (
                                            <li
                                                key={liIdx}
                                                className="blog-list-item"
                                            >
                                                {Array.from(li.childNodes).map(
                                                    (child, childIdx) => {
                                                        if (
                                                            child.nodeType ===
                                                            Node.TEXT_NODE
                                                        ) {
                                                            return child.textContent;
                                                        }
                                                        if (
                                                            child.nodeType ===
                                                            Node.ELEMENT_NODE
                                                        ) {
                                                            const childEl =
                                                                child as Element;
                                                            if (
                                                                childEl.tagName.toLowerCase() ===
                                                                'p'
                                                            ) {
                                                                return (
                                                                    <span
                                                                        key={
                                                                            childIdx
                                                                        }
                                                                    >
                                                                        {Array.from(
                                                                            childEl.childNodes,
                                                                        ).map(
                                                                            (
                                                                                pChild,
                                                                                pIdx,
                                                                            ) => {
                                                                                if (
                                                                                    pChild.nodeType ===
                                                                                    Node.TEXT_NODE
                                                                                ) {
                                                                                    return pChild.textContent;
                                                                                }
                                                                                if (
                                                                                    pChild.nodeType ===
                                                                                    Node.ELEMENT_NODE
                                                                                ) {
                                                                                    const pChildEl =
                                                                                        pChild as Element;
                                                                                    if (
                                                                                        pChildEl.tagName.toLowerCase() ===
                                                                                        'strong'
                                                                                    ) {
                                                                                        return (
                                                                                            <strong
                                                                                                key={
                                                                                                    pIdx
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    pChildEl.textContent
                                                                                                }
                                                                                            </strong>
                                                                                        );
                                                                                    }
                                                                                }
                                                                                return null;
                                                                            },
                                                                        )}
                                                                    </span>
                                                                );
                                                            }
                                                        }
                                                        return null;
                                                    },
                                                )}
                                            </li>
                                        ),
                                    )}
                                </ol>
                            );
                        case 'blockquote':
                            return (
                                <blockquote
                                    key={idx}
                                    className="blog-blockquote"
                                >
                                    {element.textContent}
                                </blockquote>
                            );
                        default:
                            return null;
                    }
                }
                return null;
            });
        };

        return parseHTML(content);
    };

    if (!song) {
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
                            Song not found
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            The song you're looking for doesn't exist.
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
                        src={song.thumbnail_url || '/placeholder.svg'}
                        alt={song.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Back button */}
                    <button
                        onClick={() => router.visit('/songs')}
                        className="mt-8 mb-8 flex items-center gap-2 font-medium text-primary transition-colors hover:text-accent"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        Back to Songs
                    </button>

                    {/* Header */}
                    <div className="mb-8">
                        {/* <div className="mb-4">
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                                {lyric.category.name}
                            </span>
                        </div> */}

                        <h1 className="blog-title mb-6">{song.title}</h1>

                        <div className="blog-meta space-y-1 border-b border-border pb-6">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                    {song.user.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {dayjs(song.created_at).format(
                                        'MMMM D, YYYY',
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {views} {views === 1 ? 'view' : 'views'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{dayjs(song.created_at).fromNow()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="blog-content py-8">
                        {formatContent(song.content)}

                        {/* Audio Preview */}
                        {song.file_path && (
                            <div className="mt-8 flex flex-col items-center">
                                <h3 className="mb-3 text-center text-lg font-semibold">
                                    Listen to this song
                                </h3>
                                <audio
                                    controls
                                    className="w-full max-w-md rounded-lg border border-border"
                                >
                                    <source
                                        src={song.file_path}
                                        type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="relative flex flex-wrap items-center gap-4 border-t border-b border-border py-8">
                        {/* Like Button */}
                        <button
                            onClick={handleLikeClick}
                            className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                                liked
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                        >
                            <Heart
                                className={`h-5 w-5 ${liked ? 'fill-current' : ''}`}
                            />
                            {liked ? 'Liked' : 'Like this'} ({count})
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
                                    className="animate-fade-in absolute left-0 z-20 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5"
                                    onMouseLeave={() => setShowShare(false)}
                                >
                                    <div className="flex flex-col py-2">
                                        <a
                                            href={shareLinks.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            <MessageCircle className="h-4 w-4 text-green-500" />
                                            Share on WhatsApp
                                        </a>
                                        <a
                                            href={shareLinks.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            <Facebook className="h-4 w-4 text-blue-600" />
                                            Share on Facebook
                                        </a>
                                        <a
                                            href={shareLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            <X className="h-4 w-4 text-sky-500" />
                                            Share on Twitter
                                        </a>
                                        <a
                                            href={shareLinks.gmail}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            <Mail className="h-4 w-4 text-red-500" />
                                            Share via Gmail
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Listen Button */}
                        <div className="relative">
                            <button
                                onClick={() => setShowListen(!showListen)}
                                className="flex cursor-pointer items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
                            >
                                <ListMusic className="h-5 w-5" />
                                Continue to Listen
                            </button>

                            {/* Dropdown Menu */}
                            {showListen && (
                                <div
                                    className="animate-fade-in absolute left-0 z-20 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5"
                                    onMouseLeave={() => setShowListen(false)}
                                >
                                    <div className="flex flex-col py-2">
                                        {song.apple_music && (
                                            <a
                                                href={song.apple_music}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                <FaApple className="h-4 w-4 text-green-500" />
                                                Apple Music
                                            </a>
                                        )}

                                        {song.voicenute && (
                                            <a
                                                href={song.voicenute}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                <Facebook className="h-4 w-4 text-blue-600" />
                                                Voicenute
                                            </a>
                                        )}

                                        {song.spotify && (
                                            <a
                                                href={song.spotify}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                <FaSpotify className="h-4 w-4 text-sky-500" />
                                                Spotify
                                            </a>
                                        )}

                                        {song.audio_mack && (
                                            <a
                                                href={song.audio_mack}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                <SiAudiomack className="h-4 w-4 text-red-500" />
                                                Audio Mack
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Songs */}
                    <div className="py-12">
                        <h2 className="mb-8 text-3xl font-bold">
                            Related Songs
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {relatedSongs?.length ? (
                                relatedSongs.map((relatedSong) => (
                                    <div
                                        key={relatedSong.id}
                                        onClick={() =>
                                            router.visit(
                                                `/songs/${relatedSong.slug}`,
                                            )
                                        }
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative mb-4 h-48 overflow-hidden rounded-lg bg-muted">
                                            <img
                                                src={
                                                    relatedSong.thumbnail_url ||
                                                    '/placeholder.svg'
                                                }
                                                alt={relatedSong.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
                                            {relatedSong.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {dayjs(
                                                relatedSong.created_at,
                                            ).fromNow()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">
                                    No related songs available.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
