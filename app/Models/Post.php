<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'content_format',
        'user_id',
        'category_id',
        'status',
        'published_at',
        'meta_title',
        'meta_description',
        'thumbnail_path',
    ];

    protected $appends = ['thumbnail_url'];

    public function getThumbnailUrlAttribute()
    {
        return 'https://res.cloudinary.com/'
            . env('CLOUDINARY_CLOUD_NAME')
            .'/image/upload/'
            .$this->attributes['thumbnail_path'];;
    }

    public function getRouteKeyName():string
    {
        return 'slug';
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tag');
    }

    public function images()
    {
        return $this->belongsToMany(PostImage::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
