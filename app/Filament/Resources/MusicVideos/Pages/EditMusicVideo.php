<?php

namespace App\Filament\Resources\MusicVideos\Pages;

use App\Filament\Resources\MusicVideos\MusicVideoResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditMusicVideo extends EditRecord
{
    protected static string $resource = MusicVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
