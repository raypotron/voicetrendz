<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use getID3;

class SongService
{
    protected string $disk;

    public function __construct(?string $disk = null)
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
}
