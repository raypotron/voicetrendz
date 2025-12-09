<?php

namespace App\Services;

use App\Models\MusicVideo;
use App\Models\Song;

class NewReleaseService
{
    public function __construct(private Song $song, private MusicVideo $musicVideo) {}

    public function get(?int $limit = null)
    {
        $songs = $this->song->where('status', 'published')->latest()->get();

        $videos = $this->musicVideo->with('artist')->latest()->get();

        $results = $songs->merge($videos)->sortByDesc('created_at')->values();

        if($limit) $results = $results->take($limit);

        return $results;

    }
}
