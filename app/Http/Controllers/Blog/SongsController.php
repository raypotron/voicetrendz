<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Song;
use App\Services\SongService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SongsController extends Controller
{
    public function __construct(private SongService $songService){}

    public function index()
    {
        $songs = $this->songService->getSongs();

        return Inertia::render('songs/index', compact('songs'));
    }

    public function show(Song $song)
    {
        $getSong = $song->load('user:id,name', 'genres:id,name');

        $genres = $getSong->genres->pluck('name')->toArray();

        $relatedSongs = $this->songService->getRelatedSongsByGenres($genres, $getSong->id, 5) ?? [];

        return Inertia::render('songs/page', ['song' => $getSong,
            'relatedSongs' => $relatedSongs]);
    }
}
