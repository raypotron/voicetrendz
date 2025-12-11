<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\PressReleaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PressReleaseController extends Controller
{
    public function __construct(private PressReleaseService $pressReleaseService) {}


    public function index(){
        $pressReleases = $this->pressReleaseService->getPostsByCategory('press release')->paginate(9);

        return Inertia::render('press-release/index', compact('pressReleases'));
    }

    public function show(Post $pressRelease)
    {

        $singlePost = $pressRelease->load('user:id,name', 'category:id,name', 'tags:id,name');

        $tags = $pressRelease->tags->pluck('name')->toArray();

        $relatedArticles = $this->pressReleaseService->getRelatedPostsByCategoryAndTag($tags, $singlePost->category->name, $singlePost->id, 2);

        $userId = Auth::id();

        return Inertia::render('press-release/page', ['post' => $singlePost,
            'relatedArticles' => $relatedArticles,
            'isLiked' => $pressRelease->likes()->where('user_id', $userId)->exists(),
            'likesCount' => $pressRelease->likes()->count(), ]);
    }

    // public function trackView(Post $pressRelease, Request $request)
    // {
    //     $sessionKey = "post_{$pressRelease->id}_viewed";
    //     if (! $request->session()->has($sessionKey)) {
    //         $pressRelease->increment('views');
    //         $request->session()->put($sessionKey, true);
    //     }

    //     return response()->json(['views' => $pressRelease->views]);
    // }
}
