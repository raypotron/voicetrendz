import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

interface User {
    id: number;
    name: string;
}

interface UseLikeableProps {
    likeableId: number | string;
    likeableType: string; // "post" | "song" | "lyric" etc.
    initialLiked: boolean;
    initialCount: number;
    routeName: string;
     user?: User;
}

export default function useLikeable({
    likeableId,
    likeableType,
    initialLiked,
    initialCount,
    routeName,
    user,
}: UseLikeableProps) {
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);

    const toggleLike = () => {
        router.post(
            route(routeName, {
                id: likeableId,
                type: likeableType,
            }),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setLiked(!liked);
                    setCount(liked ? count - 1 : count + 1);
                },
            }
        );
    };

    // Auto-like if redirected after login
    useEffect(() => {
        if (!user) return;

        const urlParams = new URLSearchParams(window.location.search);
        const likePostId = urlParams.get("likePostId");

        if (likePostId && parseInt(likePostId) === Number(likeableId) && !liked) {
            toggleLike();

            // Optional: clean URL to remove query params after liking
            urlParams.delete("likePostId");
            const newUrl = window.location.pathname + "?" + urlParams.toString();
            window.history.replaceState({}, "", newUrl);
        }
    }, [user]);

    return {
        liked,
        count,
        toggleLike,
    };
}
