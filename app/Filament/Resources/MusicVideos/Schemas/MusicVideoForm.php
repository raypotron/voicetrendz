<?php

namespace App\Filament\Resources\MusicVideos\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class MusicVideoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (callable $set, $state) {
                        $set('slug', Str::slug($state));
                    })
                    ->required(),
                TextInput::make('slug')
                    ->label('Slug')
                    ->disabled()
                    ->dehydrated()
                    ->hint('Generated automatically from title')
                    ->required(),
                FileUpload::make('thumbnail_path')
                    ->label('Thumbnail')
                    ->disk(config('filesystems.default'))
                    ->directory('uploads/thumbnail')
                    ->image()
                    ->imagePreviewHeight('150')
                    ->visibility('public')
                    ->preserveFilenames()
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('video_id')
                    ->label('Video Id')
                    ->required(),
                Select::make('artist_id')
                    ->label('Artist')
                    ->relationship('artist', 'stage_name')
                    ->searchable()
                    ->reactive()
                    ->preload(),
            ]);
    }
}
