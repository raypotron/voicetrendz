<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\LyricService;
use App\Services\PostService;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function __construct(private PostService $postService, private LyricService $lyricService) {}

    public function __invoke()
    {
        $heroPost = $this->postService->getPostsByTag('breaking news')->first();
        $hotStories = $this->postService->getPostsByTag('hottest', 4);
        $latestNews = $this->postService->getPostsByTag('latest news', 4);
        $songLyrics = $this->lyricService->getLyrics(5);

        return Inertia::render('welcome', compact('heroPost',
            'hotStories', 'latestNews', 'songLyrics'));
    }
}
