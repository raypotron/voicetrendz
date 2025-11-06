<?php

namespace App\Filament\Resources\Lyrics\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class LyricInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')
                    ->label('Title'),
                TextEntry::make('slug')
                    ->label('Slug'),
                TextEntry::make('excerpt')
                    ->label('Excerpt'),
                TextEntry::make('content_format')
                    ->label('Content Format'),
                TextEntry::make('user.name')
                    ->label('Author'),
                TextEntry::make('status')
                    ->label('Status'),
                TextEntry::make('published_at')
                    ->label('Published At')
                    ->dateTime(),
                TextEntry::make('tags.name')
                    ->label('Tags'),
                TextEntry::make('genres.name')
                    ->label('Genres'),
                ImageEntry::make('thumbnail_path')
                    ->label('Thumbnail'),
                TextEntry::make('created_at')
                    ->label('CreatedAt')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->label('UpdatedAt')
                    ->dateTime(),
            ]);
    }
}
