<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\Lyric;
use App\Models\MusicVideo;
use App\Models\Post;
use App\Models\Song;

class SearchService
{
    public function find(string $query)
    {
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

        $artists = Artist::where('name', 'like', "%$query%")
            ->orWhere('stage_name', 'like', "%$query%")
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'slug' => $item->slug,
                'title' => $item->name,
                'artist' => $item->stage_name ?? $item->name ?? 'Unknown',
                'type' => 'Artist',
                'route' => 'artist.show',
                'thumbnail_url' => $item->image_path,
            ]);

        $musicVideos = MusicVideo::with('artist')
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
                'type' => 'Music Video',
                'route' => 'music.videos.show',
                'thumbnail_url' => $item->thumbnail_url,
            ]);

        return [
            'songs' => $songs,
            'lyrics' => $lyrics,
            'stories' => $stories,
            'news' => $news,
            'artists' => $artists,
            'musicVideos' => $musicVideos,
        ];
    }
}
