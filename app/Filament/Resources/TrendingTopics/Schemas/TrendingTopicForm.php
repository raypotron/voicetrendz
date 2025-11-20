<?php

namespace App\Filament\Resources\TrendingTopics\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class TrendingTopicForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('topic')
                    ->hint('Should use PascalCase. eg: AfrobeatsFest')
                    ->required(),
                TextInput::make('key')
                    ->hint('A searchable term eg: Afrobeats')
                    ->required(),
            ]);
    }
}
