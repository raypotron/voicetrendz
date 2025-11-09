<?php

use App\Http\Controllers\Blog\ArtistController;
use App\Http\Controllers\Blog\HotStoriesController;
use App\Http\Controllers\Blog\LyricsController;
use App\Http\Controllers\Blog\NewsController;
use App\Http\Controllers\Blog\PostController;
use App\Http\Controllers\Blog\SongsController;
use App\Http\Controllers\Blog\WelcomeController;
use App\Http\Controllers\Editor\ImageUploadController;
use App\Http\Controllers\Editor\SongUploadController;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', WelcomeController::class)->name('home');

// Route::get('posts/{post}', fn (Post $post) => Inertia::render('posts/page',
//     ['post' => $post]
// ))->name('posts.show');

Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::prefix('lyrics')->group(function(){
    Route::get('/', [LyricsController::class, 'index'])->name('lyrics.index');
    Route::get('/{lyric}', [LyricsController::class, 'show'])->name('lyrics.show');
});
Route::get('hot-stories', HotStoriesController::class)->name('hot.stories');
Route::get('music-videos', fn () => Inertia::render('music-videos/page'))->name('music.videos');
Route::get('news', NewsController::class)->name('news');
Route::prefix('artists')->group(function(){
    Route::get('/', [ArtistController::class, 'index'])->name('artists.index');
    Route::get('/{artist}', [ArtistController::class, 'show'])->name('artist.show');
});
Route::prefix('songs')->group(function(){
    Route::get('/', [SongsController::class, 'index'])->name('songs.index');
    Route::get('/{song}', [SongsController::class, 'show'])->name('songs.show');
});
Route::get('community', fn () => Inertia::render('community/page'))->name('community');
Route::get('advertise', fn () => Inertia::render('advertise/page'))->name('advertise');

Route::post('editor/upload', ImageUploadController::class)->name('editor.upload');
Route::post('upload/song', SongUploadController::class)->name('upload.song');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
