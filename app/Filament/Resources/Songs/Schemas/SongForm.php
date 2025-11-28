<?php

namespace App\Filament\Resources\Songs\Schemas;

use App\Models\Album;
use App\Services\SongService;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;
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
                    ->disk('public')
                    ->directory('uploads/songs')
                    ->acceptedFileTypes(['audio/mpeg', 'audio/wav', 'audio/ogg'])
                    ->visibility('public')
                    ->preserveFilenames()
                    ->maxSize(10240)
                    ->previewable()
                    ->formatStateUsing(fn ($state, $record) => $record?->file_path)
                    ->dehydrateStateUsing(fn ($state, $record) => $state ?: $record?->file_path),
                Placeholder::make('audio_preview')
                    ->label('Current song')
                    ->content(fn ($record) => $record?->file_path
                        ? new HtmlString(sprintf(
                            '<audio controls style="width:100%%"><source src="%s" type="audio/mpeg">Your browser does not support the audio element.</audio>',
                            e($record->file_path) // still escape the URL itself
                        ))
                        : 'No uploaded song.')
                    ->visible(fn ($record) => filled($record?->file_path)),
                // ->formatStateUsing(fn ($state, $record) => $record?->file_url),
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
                    ->relationship('artist', 'stage_name')
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
                TextInput::make('apple_music')
                    ->label('Apple Music'),
                TextInput::make('voicenute')
                    ->label('Voicenute'),
                TextInput::make('spotify')
                    ->label('Spotify'),
                TextInput::make('audio_mack')
                    ->label('Audio Mack'),
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
