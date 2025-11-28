<?php

use App\Http\Controllers\Blog\ArtistController;
use App\Http\Controllers\Blog\HotStoriesController;
use App\Http\Controllers\Blog\LikesController;
use App\Http\Controllers\Blog\LyricsController;
use App\Http\Controllers\Blog\MusicVideoController;
use App\Http\Controllers\Blog\NewsController;
use App\Http\Controllers\Blog\PollsController;
use App\Http\Controllers\Blog\PostController;
use App\Http\Controllers\Blog\SearchController;
use App\Http\Controllers\Blog\SongsController;
use App\Http\Controllers\Blog\VotesController;
use App\Http\Controllers\Blog\WelcomeController;
use App\Http\Controllers\Editor\ImageUploadController;
use App\Http\Controllers\Editor\SongUploadController;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/home', WelcomeController::class)->name('home');
Route::get('/', fn () => Inertia::render('SplashScreen'))->name('loading.screen');

// Route::get('posts/{post}', fn (Post $post) => Inertia::render('posts/page',
//     ['post' => $post]
// ))->name('posts.show');
Route::prefix('posts')->group(function () {
    Route::get('/{post}', [PostController::class, 'show'])->name('posts.show');
    Route::post('/{post}/track-view', [PostController::class, 'trackView'])->name('posts.track-view');
});

Route::prefix('lyrics')->group(function () {
    Route::get('/', [LyricsController::class, 'index'])->name('lyrics.index');
    Route::get('/{lyric}', [LyricsController::class, 'show'])->name('lyrics.show');
    Route::post('/{lyric}/track-view', [LyricsController::class, 'trackView'])->name('lyrics.track-view');
});

Route::prefix('artists')->group(function () {
    Route::get('/', [ArtistController::class, 'index'])->name('artists.index');
    Route::get('/{artist}', [ArtistController::class, 'show'])->name('artist.show');
});

Route::prefix('songs')->group(function () {
    Route::get('/', [SongsController::class, 'index'])->name('songs.index');
    Route::get('/{song}', [SongsController::class, 'show'])->name('songs.show');
    Route::post('/{song}/track-view', [SongsController::class, 'trackView'])->name('songs.track-view');
});

Route::get('news', NewsController::class)->name('news');
Route::get('search', SearchController::class)->name('search');
Route::get('polls', PollsController::class)->name('fan.polls');
Route::get('hot-stories', HotStoriesController::class)->name('hot.stories');
Route::post('upload/song', SongUploadController::class)->name('upload.song');
Route::get('music-videos', MusicVideoController::class)->name('music.videos');
Route::post('polls/vote', [VotesController::class, 'store'])->name('polls.vote');
Route::post('editor/upload', ImageUploadController::class)->name('editor.upload');
Route::post('like/{type}/{id}', [LikesController::class, 'toggle'])->name('like.toggle');

Route::get('community', fn () => Inertia::render('community/page'))->name('community');
Route::get('advertise', fn () => Inertia::render('advertise/page'))->name('advertise');
Route::get('about-us', fn () => Inertia::render('about/page'))->name('about');
Route::get('contact-us', fn () => Inertia::render('contact/page'))->name('contact');
Route::get('email-us', fn () => Inertia::render('email/page'))->name('email');
Route::get('support', fn () => Inertia::render('support/page'))->name('support');
Route::get('terms', fn () => Inertia::render('terms/page'))->name('terms');
Route::get('privacy-policy', fn () => Inertia::render('privacy-policy/page'))->name('privacy');


// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
