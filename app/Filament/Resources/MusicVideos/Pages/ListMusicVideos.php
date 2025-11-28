<?php

namespace App\Filament\Resources\MusicVideos\Pages;

use App\Filament\Resources\MusicVideos\MusicVideoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListMusicVideos extends ListRecords
{
    protected static string $resource = MusicVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
