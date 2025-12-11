<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Lyric;
use App\Services\LyricService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LyricsController extends Controller
{
    public function __construct(private Lyric $lyric, private LyricService $lyricService) {}

    public function index()
    {
        $lyrics = $this->lyricService->getLyrics()->paginate(9);

        return Inertia::render('lyrics/index', compact('lyrics'));
    }

    public function show(Lyric $lyric)
    {
        $singleLyric = $lyric->load('user:id,name', 'genres:id,name', 'tags:id,name');

        $genres = $lyric->genres->pluck('name')->toArray();

        $relatedLyrics = $this->lyricService->getRelatedLyricsByGenres($genres, $singleLyric->id, 5) ?? [];

        $userId = Auth::id();

        return Inertia::render('lyrics/page', ['lyric' => $singleLyric,
            'relatedLyrics' => $relatedLyrics,
        'isLiked' => $lyric->likes()->where('user_id', $userId)->exists(),
            'likesCount' => $lyric->likes()->count(),]);
    }

    public function trackView(Lyric $lyric, Request $request)
    {
        $sessionKey = "lyric_{$lyric->id}_viewed";
        if (! $request->session()->has($sessionKey)) {
            $lyric->increment('views');
            $request->session()->put($sessionKey, true);
        }

        return response()->json(['views' => $lyric->views]);
    }
}
