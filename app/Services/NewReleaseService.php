<?php

namespace App\Services;

use App\Models\MusicVideo;
use App\Models\Song;
use Illuminate\Pagination\LengthAwarePaginator;

class NewReleaseService
{
    public function __construct(private Song $song, private MusicVideo $musicVideo) {}

    public function get(?int $limit = null)
    {
        $songs = $this->song->where('status', 'published')->latest()->get();

        $videos = $this->musicVideo->with('artist')->latest()->get();

        $results = $songs->merge($videos)->sortByDesc('created_at')->values();

        if ($limit) {
            $results = $results->take($limit);
        }

        return $results;

    }

    public function index(?int $limit = 15)
    {
        $songs = $this->song->where('status', 'published')
            ->latest()
            ->get();

        $videos = $this->musicVideo
            ->with('artist')
            ->latest()
            ->get();

        $results = $songs->merge($videos)
            ->sortByDesc('created_at')
            ->values();

        $page = request()->get('page', 1); // current page
        $perPage = $limit ?? 15;
        $total = $results->count();

        $paginated = new LengthAwarePaginator(
            $results->forPage($page, $perPage),
            $total,
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginated;
    }
}
