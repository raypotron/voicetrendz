<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lyric extends Model
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
        'artist_id',
    ];

    protected $appends = ['thumbnail_url'];

    public function getThumbnailUrlAttribute()
    {
        return 'https://res.cloudinary.com/'
            . env('CLOUDINARY_CLOUD_NAME')
            .'/image/upload/'
            .$this->attributes['thumbnail_path'];
    }

    public function getRouteKeyName():string
    {
        return 'slug';
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'lyric_tag');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_lyric');
    }

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
