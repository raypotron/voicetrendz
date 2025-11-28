<?php

namespace App\Filament\Resources\MusicVideos\Pages;

use App\Filament\Resources\MusicVideos\MusicVideoResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewMusicVideo extends ViewRecord
{
    protected static string $resource = MusicVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
