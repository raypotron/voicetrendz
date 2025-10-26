<?php

namespace App\Services;

use App\Models\Artist;
use Inertia\Inertia;

class ArtistService
{
    public function __construct(private Artist $artist){}

    public function index()
    {
        $artists = $this->artist->with('genres:id,name')->get();

        return $artists;
    }
}
