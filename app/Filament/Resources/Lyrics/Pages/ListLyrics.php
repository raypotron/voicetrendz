<?php

namespace App\Filament\Resources\Lyrics\Pages;

use App\Filament\Resources\Lyrics\LyricResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLyrics extends ListRecords
{
    protected static string $resource = LyricResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
