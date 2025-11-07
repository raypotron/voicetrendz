<?php

namespace App\Filament\Resources\Songs\Schemas;

use App\Models\Album;
use App\Services\SongService;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use getID3;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SongForm
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
                TextInput::make('excerpt'),
                TextInput::make('user_id')
                    ->label('Uploaded By')
                    ->default(fn () => Auth::user()?->name)
                    ->disabled()
                    ->dehydrated(false),
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'draft' => 'draft',
                        'published' => 'published',
                        'archived' => 'archived',
                    ])
                    ->required()
                    ->default('draft'),
                DateTimePicker::make('published_at'),
                FileUpload::make('thumbnail_path')
                    ->label('Thumbnail')
                    ->disk(config('filesystems.default'))
                    ->directory('uploads/thumbnail')
                    ->image()
                    ->imagePreviewHeight('150')
                    ->visibility('public')
                    ->preserveFilenames()
                    ->required(),
                FileUpload::make('file_path')
                    ->label('Upload Song')
                    ->disk(config('filesystems.default'))
                    ->directory('uploads/songs')
                    ->acceptedFileTypes(['audio/mpeg', 'audio/wav', 'audio/ogg'])
                    ->visibility('public')
                    ->preserveFilenames()
                    ->maxSize(10240)
                    ->previewable(),
                    // ->reactive()
                    // ->afterStateUpdated(function ($state, callable $set) {
                    //      if (!$state) return;

                    // // Resolve the actual UploadedFile Livewire object
                    // $path = Storage::disk(config('filesystems.default'))->path($state);

                    // // Analyze file metadata
                    // $service = app(SongService::class);
                    // $info = $service->analyze($path);

                    // $set('duration', $info['duration_formatted']);
                    // $set('duration_seconds', $info['duration_seconds']);
                    // $set('format', $info['format']);
                    // $set('bitrate', $info['bitrate']);
                    // }),

                // TextInput::make('duration')
                //     ->label('Duration')
                //     ->disabled(),

                // TextInput::make('duration_seconds')
                //     ->disabled()
                //     ->label('Duration (seconds)')
                //     ->numeric(),

                // TextInput::make('format')
                //     ->disabled()
                //     ->label('Format'),

                // TextInput::make('bitrate')
                //     ->disabled()
                //     ->label('Bitrate (bps)'),
                Select::make('artist_id')
                    ->label('Artist')
                    ->relationship('artist', 'name')
                    ->searchable()
                    ->reactive()
                    ->preload(),
                Select::make('album_id')
                    ->label('Album')
                    ->searchable()
                    ->options(function (callable $get) {
                        $artistId = $get('artist_id');
                        if (! $artistId) {
                            return [];
                        }

                        return Album::where('artist_id', $artistId)
                            ->pluck('name', 'id');
                    })
                    ->disabled(fn (callable $get) => empty($get('artist_id')) ||
                        Album::where('artist_id', $get('artist_id'))->count() === 0),
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
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
