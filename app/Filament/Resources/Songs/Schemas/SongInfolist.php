<?php

namespace App\Filament\Resources\Songs\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SongInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title'),
                TextEntry::make('slug'),
                TextEntry::make('excerpt'),
                TextEntry::make('content_format'),
                TextEntry::make('user_id')
                    ->numeric(),
                TextEntry::make('status'),
                TextEntry::make('published_at')
                    ->dateTime(),
                TextEntry::make('thumbnail_path'),
                TextEntry::make('file_path'),
                TextEntry::make('artist_id')
                    ->numeric(),
                TextEntry::make('album_id')
                    ->numeric(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
