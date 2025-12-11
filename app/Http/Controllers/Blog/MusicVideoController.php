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
        $videos = $this->musicVideoService->getMusicVideos()->paginate(9);

        return Inertia::render('music-videos/index', compact('videos'));
    }

    public function show(MusicVideo $musicVideo)
    {
        $video = $musicVideo->load('artist:id,name,stage_name,image_url');

        return Inertia::render('music-videos/page', compact('video'));
    }
}
