<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Song;
use App\Services\SongService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SongsController extends Controller
{
    public function __construct(private SongService $songService) {}

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

        $userId = Auth::id();

        return Inertia::render('songs/page', ['song' => $getSong,
            'relatedSongs' => $relatedSongs,
            'isLiked' => $song->likes()->where('user_id', $userId)->exists(),
            'likesCount' => $song->likes()->count(), ]);
    }

    public function trackView(Song $song, Request $request)
    {
        $sessionKey = "song_{$song->id}_viewed";
        if (! $request->session()->has($sessionKey)) {
            $song->increment('views');
            $request->session()->put($sessionKey, true);
        }

        return response()->json(['views' => $song->views]);
    }
}
