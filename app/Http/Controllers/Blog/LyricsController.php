<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Lyric;
use App\Services\LyricService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LyricsController extends Controller
{
    public function __construct(private Lyric $lyric, private LyricService $lyricService) {}

    public function show(Lyric $lyric)
    {
        $singleLyric = $lyric->load('user:id,name', 'genres:id,name', 'tags:id,name');

        $genres = $lyric->genres->pluck('name')->toArray();

        $relatedLyrics = $this->lyricService->getRelatedLyricsByGenres($genres, $singleLyric->id, 5) ?? [];

        return Inertia::render('lyrics/page', ['lyric' => $singleLyric,
            'relatedArticles' => $relatedLyrics]);
    }
}
