<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\MusicVideo;
use App\Services\MusicVideoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MusicVideoController extends Controller
{
    public function __construct(private MusicVideoService $musicVideoService) {}

    public function index()
    {
        $videos = $this->musicVideoService->getMusicVideos();

        return Inertia::render('music-videos/index', compact('videos'));
    }

    public function show(MusicVideo $musicVideo)
    {
        $videos = $musicVideo->with('artist:id,name,stage_name,image_url')->get();

        return Inertia::render('music-videos/page', compact('videos'));
    }
}
