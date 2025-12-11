<?php

namespace App\Services;

use App\Models\Lyric;

class LyricService
{
    public function __construct(private Lyric $lyric) {}

    public function getLyrics(?int $limit = null)
    {
        return $this->lyric->where('status', 'published')
            ->with(['tags:id,name', 'genres:id,name'])
            ->latest()
            ->when($limit, fn ($q) => $q->limit($limit));
    }

    public function getLyricsByTag(string $tag, ?int $limit = null)
    {

        $query = $this->lyric->where('status', 'published')
            ->whereHas('tags', fn ($q) => $q->where('name', $tag))
            ->with(['tags:id,name'])
            ->latest();

        if ($limit) {
            $query->limit($limit);
        }

        return $query->get();
    }

    public function getRelatedLyricsByGenres(array|string $genres, int $lyricId, ?int $limit = null)
    {
        return $this->lyric->where('status', 'published')
            ->whereNot('id', $lyricId)
            ->whereHas('genres', fn ($q) => is_array($genres) ? $q->whereIn('name', $genres) : $q->where('name', $genres))
            ->with(['tags:id,name', 'genres:id,name'])
            ->latest()
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get();
    }
}
