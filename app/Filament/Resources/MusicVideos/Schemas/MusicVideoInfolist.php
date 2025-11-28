<?php

namespace App\Filament\Resources\MusicVideos\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class MusicVideoInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title'),
                TextEntry::make('slug'),
                ImageEntry::make('thumbnail_path')
                    ->label('Thumbnail'),
                TextEntry::make('video_id')
                    ->label('Video Id'),
                TextEntry::make('artist.stage_name'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
