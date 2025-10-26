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
        // $heroPost = $this->post->where('status', 'published')
        //     ->whereHas('tags', function ($query) {
        //         $query->whereIn('name', ['breaking news']);
        //     })->with('tags:id,name')->latest()->first();

        // $hotStories = $this->post->where('status', 'published')
        //     ->whereHas('tags', function ($query) {
        //         $query->whereIn('name', ['hottest']);
        //     })->with('tags:id,name')->latest()->limit(4)->get();

        // dd($hotStories);

        return Inertia::render('welcome', compact('heroPost',
            'hotStories'));
    }
}
