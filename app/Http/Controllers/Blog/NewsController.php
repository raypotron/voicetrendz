<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Services\PostService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function __construct(private PostService $postService){}

    public function __invoke()
    {
        $news = $this->postService->getPostsByTag('latest news');

        return Inertia::render('news/page', compact('news'));
    }
}
