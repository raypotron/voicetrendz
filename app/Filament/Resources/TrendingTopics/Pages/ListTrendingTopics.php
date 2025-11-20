<?php

namespace App\Filament\Resources\TrendingTopics\Pages;

use App\Filament\Resources\TrendingTopics\TrendingTopicResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTrendingTopics extends ListRecords
{
    protected static string $resource = TrendingTopicResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
