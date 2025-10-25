<?php

namespace App\Filament\Resources\Posts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PostsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('slug')
                    ->searchable(),
                TextColumn::make('excerpt')
                    ->searchable(),
                TextColumn::make('content_format')
                    ->searchable(),
                TextColumn::make('user.name')
                    ->label('Author')
                    ->sortable()
                    ->formatStateUsing(fn ($record) => $record->user?->name ?? '—'),
                TextColumn::make('category.name')
                    ->label('Category')
                    ->sortable()
                    ->formatStateUsing(fn ($record) => $record->category?->name ?? '—'),
                TextColumn::make('status')
                    ->searchable(),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('tags.name')
                    ->label('Tags')
                    ->badge()
                    ->separator(', ')
                    ->formatStateUsing(fn ($record) => $record->tags?->pluck('name')->join(', ') ?? '—'),
                TextColumn::make('meta_title')
                    ->searchable(),
                ImageColumn::make('thumbnail_path')
                    ->label('Thumbnail'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->paginated([5,10,15,25,]);
    }
}
