<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ViewEntry;
use Filament\Schemas\Schema;

class PostInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title'),
                TextEntry::make('slug'),
                TextEntry::make('excerpt'),
                ViewEntry::make('content')
                    ->label('Content')
                    ->view('infolists.entries.post-content')
                    ->columnSpanFull(),
                TextEntry::make('content_format'),
                TextEntry::make('user.name')
                    ->label('Author'),
                TextEntry::make('category.name')
                    ->label('Category'),
                TextEntry::make('status'),
                TextEntry::make('published_at')
                    ->dateTime(),
                TextEntry::make('meta_title'),
                TextEntry::make('thumbnail_path'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
