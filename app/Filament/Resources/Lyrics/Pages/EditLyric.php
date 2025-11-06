<?php

namespace App\Filament\Resources\Lyrics\Pages;

use App\Filament\Resources\Lyrics\LyricResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditLyric extends EditRecord
{
    protected static string $resource = LyricResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
