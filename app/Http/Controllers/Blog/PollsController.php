<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Poll;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PollsController extends Controller
{
    public function __invoke()
    {
        $polls = Poll::with(['options', 'votes'])->get()->map(function ($poll) {
            // Total votes for this poll from poll_votes table
            $totalVotes = $poll->votes->count();

            // Transform options with their individual vote counts from poll_votes
            $pollOptions = $poll->options->map(function ($option) use ($poll, $totalVotes) {
                $optionVotes = $poll->votes->where('poll_option_id', $option->id)->count();

                return [
                    'id' => $option->id,
                    'text' => $option->option_text,
                    'votes' => $optionVotes,
                    'percentage' => $totalVotes ? round(($optionVotes / $totalVotes) * 100) : 0,
                ];
            });

            // Get user's vote if logged in
            $userVoted = null;
            if (Auth::check()) {
                $vote = $poll->votes->firstWhere('user_id', Auth::id());
                $userVoted = $vote?->poll_option_id;
            }

            return [
                'id' => $poll->id,
                'title' => $poll->question,
                'category' => $poll->category,
                'isActive' => $poll->isActive(),
                'totalVotes' => $totalVotes,
                'endDate' => $poll->expires_at->format('Y-m-d'),
                'options' => $pollOptions,
                'userVoted' => $userVoted,
            ];
        });

        return Inertia::render('polls/page', ['polls' => $polls]);
    }
}
