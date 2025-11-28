<?php

namespace App\Filament\Resources\Songs\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SongInfolist
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
                TextEntry::make('genres.name')
                    ->label('Genres'),
                TextEntry::make('content_format')
                    ->label('Content Format'),
                TextEntry::make('user.name')
                    ->label('Author'),
                TextEntry::make('status')
                    ->label('Status'),
                TextEntry::make('apple_music')
                    ->label('Apple Music'),
                TextEntry::make('voicenute')
                    ->label('Voicenute'),
                TextEntry::make('spotify')
                    ->label('Spotify'),
                TextEntry::make('audio_mack')
                    ->label('Audio Mack'),
                TextEntry::make('spotify_url')
                    ->label('Spotify Track URL'),
                TextEntry::make('audiomack_url')
                    ->label('Audiomack Track URL'),
                TextEntry::make('published_at')
                    ->label('Published At')
                    ->dateTime(),
                ImageEntry::make('thumbnail_path')
                    ->label('Thumbnail'),
                TextEntry::make('file_path')
                    ->label('Song')
                    ->html()
                    ->formatStateUsing(fn (string $state) => $state
                        ? '<audio controls class="w-full">
                <source src="'.e($state).'" type="audio/mpeg">
                Your browser does not support the audio element.
           </audio>'
                        : '<span class="text-gray-500">No song uploaded</span>'
                    ),
                TextEntry::make('artist.stage_name'),
                TextEntry::make('album_id')
                    ->label('Album'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
