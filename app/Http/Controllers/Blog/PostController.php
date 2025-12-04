<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct(private Post $post, private PostService $postService) {}

    public function show(Post $post, Request $request)
    {
        $singlePost = $post->load('user:id,name', 'category:id,name', 'tags:id,name');

        $tags = $post->tags->pluck('name')->toArray();

        $previousRoute = URL::previousPath();

        $relatedArticles = $this->postService->getRelatedPostsByTag($tags, $singlePost->id, 2);

        $userId = Auth::id();

        return Inertia::render('posts/page', ['post' => $singlePost,
            'relatedArticles' => $relatedArticles,
            'isLiked' => $post->likes()->where('user_id', $userId)->exists(),
            'likesCount' => $post->likes()->count(),
            'previousPage' => $previousRoute,
        ]);
    }

    public function trackView(Post $post, Request $request)
    {
        $sessionKey = "post_{$post->id}_viewed";
        if (! $request->session()->has($sessionKey)) {
            $post->increment('views');
            $request->session()->put($sessionKey, true);
        }

        // Return the updated views count
        return response()->json(['views' => $post->views]);
    }
}
