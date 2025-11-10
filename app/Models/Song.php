<?php

namespace App\Models;

// use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

use Cloudinary\Cloudinary;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Song extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'content_format',
        'user_id',
        'status',
        'published_at',
        'thumbnail_path',
        'file_path',
        'artist_id',
        'album_id',
        'format',
        'duration',
        'duration_seconds',
        'bitrate',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_song');
    }

    // public function getFileUrlAttribute()
    // {
    //     return $this->file_path;
    // }

    protected $appends = ['thumbnail_url'];

    public function getThumbnailUrlAttribute()
    {
        return 'https://res.cloudinary.com/'
            .env('CLOUDINARY_CLOUD_NAME')
            .'/image/upload/'
            .$this->attributes['thumbnail_path'];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected static function booted()
    {
        static::saved(function ($song) {
            if ($song->file_path && ! str_starts_with($song->file_path, 'http')) {
                $localPath = Storage::disk('public')->path($song->file_path);

                $cloudinary = new Cloudinary;

                $localPath = Storage::disk('public')->path($song->file_path);

                $uploaded = $cloudinary->uploadApi()->upload($localPath, [
                    'folder' => 'uploads/songs',
                    'resource_type' => 'auto',
                ]);

                $song->updateQuietly([
                    'file_path' => $uploaded['secure_url'],
                ]);

                Storage::disk('public')->delete($song->file_path);
            }
        });
    }
}
