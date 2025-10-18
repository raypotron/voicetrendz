<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    protected $fillable = [
        'name',
        'description',
        'social_media_followers',
        'bio',
        'image_url'
    ];
}
