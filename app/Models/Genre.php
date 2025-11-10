<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $fillable = ['name'];

    public function artists()
    {
        return $this->belongsToMany(Artist::class, 'artist_genre');
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'genre_song');
    }
}
