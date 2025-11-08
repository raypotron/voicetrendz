<?php

namespace App\Filament\Resources\Artists\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

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
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('stage_name')
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (callable $set, $state) {
                        $set('slug', Str::slug($state));
                    })
                    ->required(),
                TextInput::make('slug')
                    ->label('Slug')
                    ->disabled()
                    ->dehydrated()
                    ->hint('Generated automatically from stage name')
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
                    ->searchable(),
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
