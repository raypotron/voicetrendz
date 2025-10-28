<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\PostService;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct(private Post $post, private PostService $postService) {}

    public function show(Post $post)
    {
        $singlePost = $post->load('user:id,name', 'category:id,name', 'tags:id,name');

        // ! Fetch Multiple Tags
        $relatedArticles = $this->postService->getPostsByTag($singlePost->tags[0]->name, 2);

        return Inertia::render('posts/page', ['post' => $singlePost,
            'relatedArticles' => $relatedArticles]);
    }
}
