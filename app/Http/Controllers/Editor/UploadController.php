<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use App\Services\ImageService;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function __invoke(Request $request, ImageService $imageService)
    {
        $request->validate([
            'file' =>  'require|image|max:5120'
        ]);

        $url = $imageService->upload($request->file('file'), 'uploads/editor');

        return response()->json(['url' => $url]);
    }
}
