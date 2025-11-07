<?php

namespace App\Filament\Resources\Songs\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SongForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('excerpt'),
                Textarea::make('content')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('content_format')
                    ->required()
                    ->default('html'),
                TextInput::make('user_id')
                    ->numeric(),
                TextInput::make('status')
                    ->required()
                    ->default('draft'),
                DateTimePicker::make('published_at'),
                TextInput::make('thumbnail_path'),
                TextInput::make('file_path')
                    ->required(),
                TextInput::make('artist_id')
                    ->numeric(),
                TextInput::make('album_id')
                    ->numeric(),
            ]);
    }
}
