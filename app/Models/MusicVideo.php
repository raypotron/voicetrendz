<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MusicVideo extends Model
{
    protected $fillable = [
        'title', 'slug', 'thumbnail_path', 'video_id', 'artist_id'
    ];

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

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
