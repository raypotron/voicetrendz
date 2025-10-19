<?php

namespace App\Filament\Resources\Artists\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ArtistForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('image_url')
                    ->label('Display Picture')
                    ->disk(config('filesystems.default'))
                    ->directory('uploads/artists')
                    ->image()
                    ->imagePreviewHeight('150')
                    ->avatar()
                    ->visibility('public')
                    ->preserveFilenames()
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('description')
                    ->required(),
                TextInput::make('social_media_followers')
                    ->label('Social Media Followers')
                    ->required(),
                Select::make('genres')
                    ->label('Genres')
                    ->multiple()
                    ->relationship('genres', 'name')
                    ->createOptionForm([
                        TextInput::make('name')
                            ->label('Genre Name')
                            ->required(),
                    ])
                    ->preload()
                    ->searchable()
                    ->columnSpanFull(),
                RichEditor::make('bio')
                    ->label('Artist Bio')
                    ->toolbarButtons([
                        'bold',
                        'bulletList',
                        'h2',
                        'h3',
                        'italic',
                        'underline',
                        'strike',
                        'link',
                        'orderedList',
                        'undo',
                        'redo',
                        'blockquote',
                        'codeBlock',
                        'attachFiles',
                    ])
                    ->fileAttachmentsDisk(config('filesystems.default'))
                    ->fileAttachmentsVisibility('public')
                    ->fileAttachmentsDirectory('uploads/artists')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
