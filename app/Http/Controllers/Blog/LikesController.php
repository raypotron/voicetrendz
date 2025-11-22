<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Lyric;
use App\Models\Post;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikesController extends Controller
{
    public function __construct(Like $like) {}

    public function toggle($type, $id)
    {
        $model = match ($type) {
            'post' => Post::class,
            'song' => Song::class,
            'lyric' => Lyric::class,
            default => abort(404),
        };

        $instance = $model::findOrFail($id);

        $user = Auth::user();

        $existing = $instance->likes()->where('user_id', $user->id)->first();

        if ($existing) {
            $existing->delete();
            return back()->with('message', 'unliked');
        }

        $instance->likes()->create(['user_id' => $user->id]);

        return back()->with('message', 'liked');
    }
}
