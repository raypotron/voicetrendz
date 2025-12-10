<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use App\Services\ArtistService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function __construct(private ArtistService $artistService) {}

    public function index()
    {
        $artists = $this->artistService->index();

        return Inertia::render('artists/index', compact('artists'));
    }

    public function show(Artist $artist)
    {
        $singleArtist = $artist->load('genres:id,name');

        $genres = $artist->genres->pluck('name')->toArray();

        $relatedArtists = $this->artistService->getRelatedArtistsByGenres($genres, $singleArtist->id, 5) ?? [];

        $userId = Auth::id();

        return Inertia::render('artists/page', ['artist' => $singleArtist,
            'relatedArtists' => $relatedArtists, 'isLiked' => $artist->likes()->where('user_id', $userId)->exists(),
            'likesCount' => $artist->likes()->count(), ]);
    }
}
