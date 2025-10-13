<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('excerpt'),
                RichEditor::make('content')
                    ->label('Post Content')
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
                    // ->extraAttributes(['style' => 'min-height: 400px;'])
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('content_format')
                    ->required()
                    ->default('html'),
                Select::make('category_id')
                    ->relationship('category', 'name')
                    ->label('Category')
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('status')
                    ->options([
                        'draft' => 'draft',
                        'published' => 'published',
                        'archived' => 'archived',
                    ])
                    ->required()
                    ->default('draft'),
                DateTimePicker::make('published_at'),
                TextInput::make('meta_title'),
                TextInput::make('thumbnail_path'),
                Textarea::make('meta_description')
                    ->columnSpanFull(),

            ]);
    }
}
