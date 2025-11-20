<?php

namespace App\Filament\Resources\Lyrics\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class LyricForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
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
                TextInput::make('excerpt')
                    ->label('Excerpt'),
                Select::make('artist_id')
                    ->label('Artist')
                    ->relationship('artist', 'stage_name')
                    ->searchable()
                    ->reactive()
                    ->preload(),
                FileUpload::make('thumbnail_path')
                    ->label('Thumbnail')
                    ->disk(config('filesystems.default'))
                    ->directory('uploads/thumbnail')
                    ->image()
                    ->imagePreviewHeight('150')
                    ->visibility('public')
                    ->preserveFilenames()
                    ->required()
                    ->columnSpanFull(),
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'draft' => 'draft',
                        'published' => 'published',
                        'archived' => 'archived',
                    ])
                    ->required()
                    ->default('draft'),
                DateTimePicker::make('published_at')
                    ->label('Published At'),
                Select::make('tags')
                    ->label('Tags')
                    ->multiple()
                    ->relationship('tags', 'name')
                    ->createOptionForm([
                        TextInput::make('name')
                            ->label('Tag Name')
                            ->required(),
                    ])
                    ->preload()
                    ->searchable(),
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
                RichEditor::make('content')
                    ->label('Lyric Content')
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
                    ->fileAttachmentsDirectory('uploads/editor')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
