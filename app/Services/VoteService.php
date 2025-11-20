<?php

namespace App\Services;

use App\Models\Vote;

class VoteService
{
    public function __construct(private Vote $vote){}

    public function create(array $data)
    {
        $voted = $this->vote->create($data);

        return $voted;
    }
}
