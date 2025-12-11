<?php

namespace App\Services;

use App\Models\Post;

class PressReleaseService
{
    public function __construct(private Post $post) {}

    public function getPostsByCategory(string $category, ?int $limit = null)
    {
        $query = $this->post->with('category')->where('status', 'published')
            ->whereHas('category', fn ($q) => $q->where('name', $category))
            ->with(['tags:id,name'])
            ->latest();

        if ($limit) {
            $query->limit($limit);
        }

        return $query;
    }

    public function getRelatedPostsByCategoryAndTag(array|string $tags, string $category, int $postId, ?int $limit = null)
    {
        return $this->post->where('status', 'published')
            ->whereNot('id', $postId)
            ->whereHas('tags', fn ($q) => is_array($tags) ? $q->whereIn('name', $tags) : $q->where('name', $tags))
            ->whereHas('category', fn ($q) => is_array($category) ? $q->whereIn('name', $category) : $q->where('name', $category))
            ->with(['category:id,name', 'tags:id,name'])
            ->latest()
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get();
    }
}
