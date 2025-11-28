<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Services\MusicVideoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MusicVideoController extends Controller
{
    public function __construct(private MusicVideoService $musicVideoService) {}

    public function __invoke()
    {
        $videos = $this->musicVideoService->getMusicVideos();

        return Inertia::render('music-videos/page', compact('videos'));
    }
}
