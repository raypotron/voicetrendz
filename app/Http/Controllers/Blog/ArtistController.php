<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Services\ArtistService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function __construct(private ArtistService $artistService){}

    public function index()
    {
        $artists = $this->artistService->index();

        return Inertia::render('artists/page', compact('artists'));
    }
}
