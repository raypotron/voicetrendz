<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Services\PostService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotStoriesController extends Controller
{
    public function __construct(private PostService $postService){}

    public function __invoke()
    {
        $hotStories = $this->postService->getPostsByTag('hottest');

        return Inertia::render('hot-stories/page', compact('hotStories'));
    }
}
