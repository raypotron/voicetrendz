<?php

namespace App\Filament\Resources\TrendingTopics\Pages;

use App\Filament\Resources\TrendingTopics\TrendingTopicResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTrendingTopic extends ViewRecord
{
    protected static string $resource = TrendingTopicResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
