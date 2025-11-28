<?php

namespace App\Filament\Resources\MusicVideos;

use App\Filament\Resources\MusicVideos\Pages\CreateMusicVideo;
use App\Filament\Resources\MusicVideos\Pages\EditMusicVideo;
use App\Filament\Resources\MusicVideos\Pages\ListMusicVideos;
use App\Filament\Resources\MusicVideos\Pages\ViewMusicVideo;
use App\Filament\Resources\MusicVideos\Schemas\MusicVideoForm;
use App\Filament\Resources\MusicVideos\Schemas\MusicVideoInfolist;
use App\Filament\Resources\MusicVideos\Tables\MusicVideosTable;
use App\Models\MusicVideo;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MusicVideoResource extends Resource
{
    protected static ?string $model = MusicVideo::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedVideoCamera;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return MusicVideoForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return MusicVideoInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MusicVideosTable::configure($table);
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
            'index' => ListMusicVideos::route('/'),
            'create' => CreateMusicVideo::route('/create'),
            'view' => ViewMusicVideo::route('/{record}'),
            'edit' => EditMusicVideo::route('/{record}/edit'),
        ];
    }
}
