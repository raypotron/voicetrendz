<?php

namespace App\Filament\Resources\Lyrics\Pages;

use App\Filament\Resources\Lyrics\LyricResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateLyric extends CreateRecord
{
    protected static string $resource = LyricResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = Auth::id();
        return $data;
    }
}
