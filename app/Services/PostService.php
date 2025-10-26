<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Facades\Cache;

class PostService
{
    public function getPostsByTag(string $tag, ?int $limit = null)
    {
        // $key = "posts_{$tag}_".($limit ?? 'all');

        // return Cache::remember($key, now()->addMinutes(10), function () use ($tag, $limit) {
            $query = Post::where('status', 'published')
                ->whereHas('tags', fn ($q) => $q->where('name', $tag))
                ->with(['tags:id,name'])
                ->latest();

            if ($limit) {
                $query->limit($limit);
            }

            return $query->get();
        // });

    }
}
