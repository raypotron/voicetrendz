import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

// export interface User {
//     id: number;
//     name: string;
//     email: string;
//     avatar?: string;
//     email_verified_at: string | null;
//     two_factor_enabled?: boolean;
//     created_at: string;
//     updated_at: string;
//     [key: string]: unknown;
// }

export interface Video {
    title: string;
    artist: { id: number; stage_name: string };
    video_id: string;
    slug?: string;
    thumbnail_url: string;
}

export interface Song {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    views: number;
    thumbnail_url: string;
    created_at: string;
}

export interface NewRelease {
    id: number;
    slug: string;
    title?: string;
    type?: string;
    excerpt?: string;
    views?: number;
    thumbnail_url: string;
    created_at: string;
}

export interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    thumbnail_url: string;
    views: number;
    created_at: string;
    category?: { id: number; name: string };
}

export interface Lyric {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    thumbnail_url: string;
    created_at: string;
}

export interface Poll {
    id: number;
    slug: string;
    question: string;
    options: [{ id: number; option_text: string }];
    expires_at: string;
    created_at: string;
}

export interface User {
    id: number;
    name: string;
}

export interface TrendingTopic {
    id: number;
    topic: string;
    key: string;
}

export interface Artist {
    id: number;
    name: string;
    stage_name: string;
    slug: string;
    description: string;
    genres: {
        id: number;
        name: string;
    }[];
    image_path: string;
}

export interface PressRelease {
    id: number;
    title: string;
    content: string;
    thumbnail_url: string;
    created_at: string;
    excerpt: string;
    slug: string;
    views: number;
    user: { id: number; name: string };
    category: { id: number; name: string };
}

export interface PollForm {
    poll_id: number | null;
    poll_option_id: number | null;
    user_id: number | null;
}

export interface Pagination<T> {
    data: T[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
