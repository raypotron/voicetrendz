<?php

namespace App\Filament\Resources\TrendingTopics;

use App\Filament\Resources\TrendingTopics\Pages\CreateTrendingTopic;
use App\Filament\Resources\TrendingTopics\Pages\EditTrendingTopic;
use App\Filament\Resources\TrendingTopics\Pages\ListTrendingTopics;
use App\Filament\Resources\TrendingTopics\Pages\ViewTrendingTopic;
use App\Filament\Resources\TrendingTopics\Schemas\TrendingTopicForm;
use App\Filament\Resources\TrendingTopics\Schemas\TrendingTopicInfolist;
use App\Filament\Resources\TrendingTopics\Tables\TrendingTopicsTable;
use App\Models\TrendingTopic;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TrendingTopicResource extends Resource
{
    protected static ?string $model = TrendingTopic::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedFire;

    protected static ?string $recordTitleAttribute = 'topic';

    public static function form(Schema $schema): Schema
    {
        return TrendingTopicForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TrendingTopicInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TrendingTopicsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTrendingTopics::route('/'),
            'create' => CreateTrendingTopic::route('/create'),
            'view' => ViewTrendingTopic::route('/{record}'),
            'edit' => EditTrendingTopic::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
