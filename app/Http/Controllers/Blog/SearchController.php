<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Lyric;
use App\Models\Post;
use App\Models\Song;
use App\Services\SearchService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{

    public function __construct(private SearchService $searchService) {}

    public function __invoke(Request $request)
    {
        $query = trim($request->input('q', ''));

        if ($query === '') {
            return Inertia::render('search/page', [
                'query' => '',
                'results' => [],
            ]);
        }

        $searchResults = $this->searchService->find($query);

        return Inertia::render('search/page', [
            'query' => $query,
            'results' => [
                'songs' => $searchResults['songs'],
                'lyrics' => $searchResults['lyrics'],
                'news' => $searchResults['news'],
                'stories' => $searchResults['stories'],
                'artists' => $searchResults['artists'],
            ],
        ]);
    }
}
