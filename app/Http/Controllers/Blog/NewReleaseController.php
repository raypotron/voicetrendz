<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Services\NewReleaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewReleaseController extends Controller
{
    public function __construct(private NewReleaseService $newReleaseService) {}

    public function index()
    {
        $newReleases = $this->newReleaseService->get();

        return Inertia::render('new-release/index',compact('newReleases'));
    }
}
