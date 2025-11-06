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
    ];
}
