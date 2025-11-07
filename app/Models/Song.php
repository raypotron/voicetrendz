<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function album()
    {
        return $this->belongsTo(Album::class);
    }
}
