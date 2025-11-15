<?php

namespace App\Filament\Resources\Polls\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PollInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('question')
                    ->label('Question'),
                TextEntry::make('expires_at')
                    ->dateTime(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
