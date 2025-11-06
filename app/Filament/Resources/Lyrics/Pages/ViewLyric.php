<?php

namespace App\Filament\Resources\Lyrics\Pages;

use App\Filament\Resources\Lyrics\LyricResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewLyric extends ViewRecord
{
    protected static string $resource = LyricResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
