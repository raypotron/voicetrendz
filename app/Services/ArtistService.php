<?php

namespace App\Services;

use App\Models\Artist;

class ArtistService
{
    public function __construct(private Artist $artist) {}

    public function index(?int $limit = null)
    {
        $artists = $this->artist->with('genres:id,name')
            ->latest()
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get();

        return $artists;
    }

    public function getRelatedArtistsByGenres(array|string $genres, int $artistId, ?int $limit = null)
    {
        return $this->artist->whereNot('id', $artistId)
            ->whereHas('genres', fn ($q) => is_array($genres) ? $q->whereIn('name', $genres) : $q->where('name', $genres))
            ->with(['genres:id,name'])
            ->latest()
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get();
    }

    public function show() {}
}
