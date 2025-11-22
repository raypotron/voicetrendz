import { useState } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

interface UseLikeableProps {
    likeableId: number | string;
    likeableType: string; // "post" | "song" | "lyric" etc.
    initialLiked: boolean;
    initialCount: number;
    routeName: string; // e.g. "like.toggle"
}

export default function useLikeable({
    likeableId,
    likeableType,
    initialLiked,
    initialCount,
    routeName,
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

    return {
        liked,
        count,
        toggleLike,
    };
}
