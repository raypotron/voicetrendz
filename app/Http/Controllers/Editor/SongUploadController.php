<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\SongService;

class SongUploadController extends Controller
{
    public function __invoke(Request $request, SongService $songService)
    {
        $request->validate([
            'file' => 'required|mimes:mp3,wav,ogg|max:10240', // up to 10MB
        ]);

        dd($request->file('file'));

        $url = $songService->upload($request->file('file'), 'uploads/songs');

        return response()->json(['url' => $url]);
    }
}
