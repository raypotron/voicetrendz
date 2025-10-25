<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function __construct(private Post $post) {}

    public function __invoke()
    {
        $heroPost = $this->post->where('status', 'published')
            ->whereHas('tags', function ($query)  {
                $query->whereIn('name', ['breaking news']);
            })->latest()->first();

        // dd($bannerPost);

        return Inertia::render('welcome', ['heroPost' =>  $heroPost]);
    }
}
