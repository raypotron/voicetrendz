<?php

namespace App\Services;

use App\Models\TrendingTopic;

class TrendingTopicService
{
    public function __construct(private TrendingTopic $trendingTopic) {}

    public function getLatestTrendingTopics(?int $limit = null)
    {
        return $this->trendingTopic->latest()
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get();
    }
}
