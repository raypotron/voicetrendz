<?php

namespace App\Services;

use App\Models\MusicVideo;

class MusicVideoService
{
    public function __construct(private MusicVideo $musicVideo) {}

    public function getMusicVideos(?int $limit = null)
    {
        return $this->musicVideo->with('artist')->latest()
            ->when($limit, fn ($q) => $q->limit($limit));
    }
}
