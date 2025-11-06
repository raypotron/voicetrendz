<?php

use App\Http\Controllers\Blog\ArtistController;
use App\Http\Controllers\Blog\HotStoriesController;
use App\Http\Controllers\Blog\LyricsController;
use App\Http\Controllers\Blog\NewsController;
use App\Http\Controllers\Blog\PostController;
use App\Http\Controllers\Blog\WelcomeController;
use App\Http\Controllers\Editor\UploadController;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', WelcomeController::class)->name('home');

// Route::get('posts/{post}', fn (Post $post) => Inertia::render('posts/page',
//     ['post' => $post]
// ))->name('posts.show');

Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('lyrics/{lyric}', [LyricsController::class, 'show'])->name('lyrics.show');
Route::get('hot-stories', HotStoriesController::class)->name('hot.stories');
Route::get('music-videos', fn () => Inertia::render('music-videos/page'))->name('music.videos');
Route::get('news', NewsController::class)->name('news');
Route::get('artists', [ArtistController::class, 'index'])->name('artists');
Route::get('community', fn () => Inertia::render('community/page'))->name('community');
Route::get('advertise', fn () => Inertia::render('advertise/page'))->name('advertise');

Route::post('editor/upload', UploadController::class)->name('editor.upload');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
