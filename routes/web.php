<?php

use App\Http\Controllers\Editor\UploadController;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('posts/{post}', fn (Post $post) => Inertia::render('posts/page',
    ['post' => $post]
))->name('posts.show');

Route::post('editor/upload', UploadController::class)->name('editor.upload');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
