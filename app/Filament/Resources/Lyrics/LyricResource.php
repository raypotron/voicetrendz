<?php

namespace App\Filament\Resources\Lyrics;

use App\Filament\Resources\Lyrics\Pages\CreateLyric;
use App\Filament\Resources\Lyrics\Pages\EditLyric;
use App\Filament\Resources\Lyrics\Pages\ListLyrics;
use App\Filament\Resources\Lyrics\Pages\ViewLyric;
use App\Filament\Resources\Lyrics\Schemas\LyricForm;
use App\Filament\Resources\Lyrics\Schemas\LyricInfolist;
use App\Filament\Resources\Lyrics\Tables\LyricsTable;
use App\Models\Lyric;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class LyricResource extends Resource
{
    protected static ?string $model = Lyric::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return LyricForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return LyricInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LyricsTable::configure($table);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['user', 'tags']);
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
            'index' => ListLyrics::route('/'),
            'create' => CreateLyric::route('/create'),
            'view' => ViewLyric::route('/{record}'),
            'edit' => EditLyric::route('/{record}/edit'),
        ];
    }
}
