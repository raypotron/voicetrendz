<?php

namespace App\Services;

use App\Models\Poll;

class PollService
{
    public function __construct(private Poll $poll) {}

    public function getLatestPoll()
    {
        return $this->poll->active()->with('options')->latest()->first();
    }
}
