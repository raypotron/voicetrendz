<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\StoreVoteRequest;
use App\Services\VoteService;
use Exception;

class VotesController extends Controller
{
    public function __construct(private VoteService $voteService) {}

    public function store(StoreVoteRequest $request)
    {
        try {
            $this->voteService->create($request->validated());

            return redirect()->back()->with('success', 'Vote submitted successfully.');
        } catch (\Illuminate\Database\QueryException $e) {
           if ($e->errorInfo[1] == 1062) {
            // Duplicate entry (unique constraint)
            return redirect()->back()->withErrors(['poll_option_id' => 'You have already voted.']);
        }
        // Optional: handle any other DB errors
        return redirect()->back()->withErrors(['poll_option_id' => 'Vote failed! Please try again.']);
        }
    }
}
