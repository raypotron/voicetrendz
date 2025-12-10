<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    protected $fillable = [
        'name',
        'stage_name',
        'slug',
        'description',
        'social_media_followers',
        'bio',
        'image_url'
    ];

    protected $appends = ['image_path'];

    public function getImagePathAttribute()
    {
        return 'https://res.cloudinary.com/'
            . env('CLOUDINARY_CLOUD_NAME')
            .'/image/upload/'
            .$this->attributes['image_url'];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'artist_genre');
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }
}
