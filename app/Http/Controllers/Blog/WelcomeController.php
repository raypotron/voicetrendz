<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Services\ArtistService;
use App\Services\LyricService;
use App\Services\MusicVideoService;
use App\Services\NewReleaseService;
use App\Services\PollService;
use App\Services\PostService;
use App\Services\PressReleaseService;
use App\Services\SongService;
use App\Services\TrendingTopicService;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function __construct(
        private PostService $postService,
        private LyricService $lyricService,
        private SongService $songService,
        private PollService $pollService,
        private TrendingTopicService $trendingTopicService,
        private ArtistService $artistService,
        private PressReleaseService $pressReleaseService,
        private MusicVideoService $musicVideoService,
        private NewReleaseService $newReleaseService) {}

    public function __invoke()
    {
        $heroPosts = $this->postService->getPostsByTag('breaking news', 4);
        $hotStories = $this->postService->getPostsByTag('hottest', 4);
        $latestNews = $this->postService->getPostsByTag('latest news', 4);
        $songLyrics = $this->lyricService->getLyrics(5);
        $latestSongs = $this->songService->getSongs(5);
        $poll = $this->pollService->getLatestPoll();
        $trendingTopics = $this->trendingTopicService->getLatestTrendingTopics(5);
        $artists = $this->artistService->index(6);
        $pressReleases = $this->pressReleaseService->getPostsByCategory('press release', 3);
        $videos = $this->musicVideoService->getMusicVideos(4);
        $newReleases = $this->newReleaseService->get(4);

        return Inertia::render('welcome', compact(
            'heroPosts',
            'hotStories',
            'latestNews',
            'songLyrics',
            'latestSongs',
            'poll',
            'trendingTopics',
            'artists',
            'pressReleases',
            'videos',
            'newReleases',
        ));
    }
}
