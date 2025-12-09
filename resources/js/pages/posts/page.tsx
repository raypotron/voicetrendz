

import axios from '@/axios';
import FormatContent from '@/components/form-content';
import useBlog from '@/hooks/use-blog';
import useLikeable from '@/hooks/use-likeable';
import { PageProps } from '@inertiajs/core';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    Facebook,
    Heart,
    Mail,
    MessageCircle,
    Share2,
    User,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

dayjs.extend(relativeTime);

interface Post {
    id: number;
    title: string;
    content: string;
    thumbnail_url: string;
    created_at: string;
    slug: string;
    views: number;
    user: { id: number; name: string };
    category: { id: number; name: string };
}

interface User {
    id: number;
    name: string;
}

interface InertiaPageProps extends PageProps {
    user: User | null;
}

interface Props extends PageProps {
    post: Post;
    relatedArticles: Post[];
    isLiked: boolean;
    likesCount: number;
    previousPage: string;
}

export default function PostPage({
    post,
    relatedArticles,
    isLiked,
    likesCount,
    previousPage,
}: Props) {
    const { isDarkMode } = useBlog();
    // const [liked, setLiked] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [views, setViews] = useState(post.views);

    const encodedUrl = encodeURIComponent(post.slug);
    const encodedTitle = encodeURIComponent(post.title);

    const { props } = usePage<InertiaPageProps>();

    // console.log(previousPage);

    const user = props.user;

    const { liked, count, toggleLike } = useLikeable({
        likeableId: post.id,
        likeableType: 'post',
        initialLiked: isLiked,
        initialCount: likesCount,
        routeName: 'like.toggle',
    });

    // const handleLikeClick = () => {
    //     if (!user) {
    //         window.location.replace('/user/login');
    //         return;
    //     }
    //     toggleLike();
    // };

    const handleLikeClick = () => {
    if (!user) {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/user/login?returnUrl=${returnUrl}&likePostId=${post.id}`;
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
                    `/posts/${post.slug}/track-view`,
                );
                setViews(response.data.views); // Update view count in real-time
            } catch (err) {
                console.error('Error tracking post view:', err);
            }
        };

        trackView();
    }, [post.slug]);

    if (!post) {
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
                            Post not found
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            The post you're looking for doesn't exist.
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
                        src={post.thumbnail_url || '/placeholder.svg'}
                        alt={post.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Back button */}
                    <div className="mt-8 mb-8 flex justify-between gap-4">
                        <button
                            onClick={() =>
                                router.visit(`${previousPage}` || '/home')
                            }
                            className="flex items-center gap-2 font-medium text-primary transition-colors hover:text-accent"
                        >
                            <ChevronLeft className="h-5 w-5" />
                            Back to articles
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
                        <div className="mb-4">
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                                {post.category.name}
                            </span>
                        </div>

                        <h1 className="blog-title post-card-title mb-6">
                            {post.title}
                        </h1>

                        <div className="blog-meta space-y-1 border-b border-border pb-6">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                    {post.user.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {dayjs(post.created_at).format(
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
                                <span>{dayjs(post.created_at).fromNow()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <article className="">
                        <FormatContent html={post.content} />
                    </article>

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
                                    className={`animate-fade-in absolute left-0 z-20 mt-2 w-56 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg ring-1 ring-black/5`}
                                    onMouseLeave={() => setShowShare(false)}
                                >
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setShowShare(false)}
                                        className="absolute top-2 right-5 rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>

                                    <div className="flex flex-col py-4">
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

                    {/* Related Posts */}
                    <div className="py-12">
                        <h2 className="mb-8 text-3xl font-bold">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {relatedArticles.map((relatedPost) => (
                                <div
                                    key={relatedPost.id}
                                    onClick={() =>
                                        router.visit(
                                            `/posts/${relatedPost.slug}`,
                                        )
                                    }
                                    className="group cursor-pointer"
                                >
                                    <div className="relative mb-4 h-48 overflow-hidden rounded-lg bg-muted">
                                        <img
                                            src={
                                                relatedPost.thumbnail_url ||
                                                '/placeholder.svg'
                                            }
                                            alt={relatedPost.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {dayjs(
                                            relatedPost.created_at,
                                        ).fromNow()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
