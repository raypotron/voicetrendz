'use client';

import useBlog from '@/hooks/use-blog';
import { PageProps } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    Calendar,
    ChevronLeft,
    Clock,
    Eye,
    Heart,
    Share2,
    User,
} from 'lucide-react';
import { useState } from 'react';

dayjs.extend(relativeTime);

interface Lyric {
    id: number;
    title: string;
    content: string;
    thumbnail_url: string;
    created_at: string;
    slug: string;
    user: { id: number; name: string };
}

interface Props extends PageProps {
    lyric: Lyric;
    relatedLyrics: Lyric[];
}

export default function LyricPage({ lyric, relatedLyrics }: Props) {
    const { isDarkMode } = useBlog();
    const [liked, setLiked] = useState(false);

    // console.log(lyric.content);

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

    if (!lyric) {
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
                            Lyric not found
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            The lyric you're looking for doesn't exist.
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
                        src={lyric.thumbnail_url || '/placeholder.svg'}
                        alt={lyric.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Back button */}
                    <button
                        onClick={() => router.visit(document.referrer || '/')}
                        className="mt-8 mb-8 flex items-center gap-2 font-medium text-primary transition-colors hover:text-accent"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        Back to articles
                    </button>

                    {/* Header */}
                    <div className="mb-8">
                        {/* <div className="mb-4">
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                                {lyric.category.name}
                            </span>
                        </div> */}

                        <h1 className="blog-title mb-6">{lyric.title}</h1>

                        <div className="blog-meta space-y-1 border-b border-border pb-6">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                    {lyric.user.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {dayjs(lyric.created_at).format(
                                        'MMMM D, YYYY',
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4 text-muted-foreground" />
                                <span>100 views</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{dayjs(lyric.created_at).fromNow()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="blog-content py-8">
                        {formatContent(lyric.content)}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 border-t border-b border-border py-8">
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
                        <button className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-all hover:bg-secondary/80">
                            <Share2 className="h-5 w-5" />
                            Share
                        </button>
                    </div>

                    {/* Related Lyrics */}
                    <div className="py-12">
                        <h2 className="mb-8 text-3xl font-bold">
                            Related Lyrics
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {relatedLyrics?.length ? (
                                relatedLyrics.map((relatedLyric) => (
                                    <div
                                        key={relatedLyric.id}
                                        onClick={() =>
                                            router.visit(
                                                `/lyrics/${relatedLyric.slug}`,
                                            )
                                        }
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative mb-4 h-48 overflow-hidden rounded-lg bg-muted">
                                            <img
                                                src={
                                                    relatedLyric.thumbnail_url ||
                                                    '/placeholder.svg'
                                                }
                                                alt={relatedLyric.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
                                            {relatedLyric.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {dayjs(
                                                relatedLyric.created_at,
                                            ).fromNow()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">
                                    No related lyrics available.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
