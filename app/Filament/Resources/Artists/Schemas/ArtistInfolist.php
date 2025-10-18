<?php

namespace App\Filament\Resources\Artists\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ArtistInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name'),
                TextEntry::make('description'),
                TextEntry::make('social_media_followers')
                    ->label('Followers'),
                ImageEntry::make('image_url')
                    ->label('Profile Picture'),
                TextEntry::make('bio')
                    ->label('Bio')
                    ->html(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
