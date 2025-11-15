<?php

namespace App\Filament\Resources\Polls\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PollForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('question')
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
                Repeater::make('options')
                    ->relationship()
                    ->schema([
                        TextInput::make('option_text')
                            ->label('Option Text')
                            ->required(),
                    ])
                    ->defaultItems(0)
                    ->minItems(1)
                    ->columnSpanFull(),
                DateTimePicker::make('expires_at')
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->columnSpanFull(),
            ]);
    }
}
