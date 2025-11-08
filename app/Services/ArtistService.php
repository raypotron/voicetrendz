<?php

namespace App\Services;

use App\Models\Artist;
use Inertia\Inertia;

class ArtistService
{
    public function __construct(private Artist $artist){}

    public function index()
    {
        $artists = $this->artist->with('genres:id,name')->get();

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

    public function show()
    {

    }
}
