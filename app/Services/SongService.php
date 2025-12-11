<?php

namespace App\Services;

use App\Models\Song;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use getID3;

class SongService
{
    protected string $disk;

    public function __construct(private Song $song, ?string $disk = null)
    {
        $this->disk = $disk ?? config('filesystems.default');
    }

    public function upload(UploadedFile $file, string $path = 'uploads/songs'): string
    {
        $filePath = $file->store($path, $this->disk);

        return $this->getUrl($filePath);
    }

    public function getUrl(string $path): string
    {
        return Storage::disk($this->disk)->url($path);
    }


    public function delete(string $path): bool
    {
        return Storage::disk($this->disk)->delete($path);
    }

    public function getSongs(?int $limit = null)
    {
        return $this->song->where('status', 'published')
            // ->with(['tags:id,name', 'genres:id,name'])
            ->latest()
            ->when($limit, fn ($q) => $q->limit($limit));
    }

    public function getRelatedSongsByGenres(array|string $genres, int $songId, ?int $limit = null)
    {
        return $this->song->where('status', 'published')
            ->whereNot('id', $songId)
            ->whereHas('genres', fn ($q) => is_array($genres) ? $q->whereIn('name', $genres) : $q->where('name', $genres))
            ->with(['genres:id,name'])
            ->latest()
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get();
    }
}
