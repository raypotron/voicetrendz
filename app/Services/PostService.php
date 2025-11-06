<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Facades\Cache;

class PostService
{
    public function __construct(private Post $post) {}
    
    public function getPostsByTag(string $tag, ?int $limit = null)
    {
        // $key = "posts_{$tag}_".($limit ?? 'all');

        // return Cache::remember($key, now()->addMinutes(10), function () use ($tag, $limit) {
        $query = $this->post->where('status', 'published')
            ->whereHas('tags', fn ($q) => $q->where('name', $tag))
            ->with(['tags:id,name'])
            ->latest();

        if ($limit) {
            $query->limit($limit);
        }

        return $query->get();
        // });
    }

    public function getRelatedPostsByTag(array|string $tags, int $postId, ?int $limit = null)
    {
        return $this->post->where('status', 'published')
            ->whereNot('id', $postId)
            ->whereHas('tags', fn ($q) => is_array($tags) ? $q->whereIn('name', $tags) : $q->where('name', $tags))
            ->with(['tags:id,name'])
            ->latest()
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get();
    }
}
