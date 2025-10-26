<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\PostService;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function __construct(private Post $post, private PostService $postService) {}

    public function __invoke()
    {
        $heroPost = $this->postService->getPostsByTag('breaking news')->first();
        $hotStories =$this->postService->getPostsByTag('hottest', 4);

        return Inertia::render('welcome', compact('heroPost',
            'hotStories'));
    }
}
