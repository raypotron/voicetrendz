<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Lyric;
use App\Models\Post;
use App\Models\Song;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = trim($request->input('q', ''));

        if ($query === '') {
            return Inertia::render('search/page', [
                'query' => '',
                'results' => [],
            ]);
        }

        $songs = Song::with('artist')
            ->where('title', 'like', "%$query%")
            ->orWhereHas('artist', function ($q) use ($query) {
                $q->where('stage_name', 'like', "%$query%")
                    ->orWhere('name', 'like', "%$query%");
            })
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'slug' => $item->slug,
                'title' => $item->title,
                'artist' => $item->artist?->stage_name ?? $item->artist?->name ?? 'Unknown',
                'type' => 'Song',
                'route' => 'songs.show',
                'thumbnail_url' => $item->thumbnail_url,
            ]);

        $lyrics = Lyric::with('artist')
            ->where('title', 'like', "%$query%")
            ->orWhereHas('artist', function ($q) use ($query) {
                $q->where('stage_name', 'like', "%$query%")
                    ->orWhere('name', 'like', "%$query%");
            })
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'slug' => $item->slug,
                'title' => $item->title,
                'artist' => $item->artist?->stage_name ?? $item->artist?->name ?? 'Unknown',
                'type' => 'Lyric',
                'route' => 'lyrics.show',
                'thumbnail_url' => $item->thumbnail_url,
            ]);

        $news = Post::with('tags')
            ->where('title', 'like', "%$query%")
            ->whereHas('tags', function ($q) {
                $q->where('name', 'latest news')->orWhere('name', 'breaking news');
            })
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'slug' => $item->slug,
                'title' => $item->title,
                'date' => $item->created_at->diffForHumans(),
                'type' => 'News',
                'route' => 'posts.show',
                'thumbnail_url' => $item->thumbnail_url,
            ]);

        $stories = Post::with('tags')->
            where('title', 'like', "%$query%")
                ->whereHas('tags', function ($q) {
                    $q->where('name', 'hottest');
                })
                ->get()
                ->map(fn ($item) => [
                    'id' => $item->id,
                    'slug' => $item->slug,
                    'title' => $item->title,
                    'readTime' => $item->read_time,
                    'type' => 'Story',
                    'route' => 'posts.show',
                    'thumbnail_url' => $item->thumbnail_url,
                ]);

        return Inertia::render('search/page', [
            'query' => $query,
            'results' => [
                'songs' => $songs,
                'lyrics' => $lyrics,
                'news' => $news,
                'stories' => $stories,
            ],
        ]);
    }
}
