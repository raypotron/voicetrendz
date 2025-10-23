<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct(private Post $post) {}

    public function show(Post $post)
    {
        $singlePost = $post->load('user:id,name', 'category:id,name');

        return Inertia::render('posts/page', ['post' => $singlePost]);
    }
}
