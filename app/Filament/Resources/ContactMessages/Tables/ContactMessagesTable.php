<?php

namespace App\Filament\Resources\ContactMessages\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Notifications\DatabaseNotification;

class ContactMessagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('data.name')
                    ->label('Name')
                    ->searchable(),
                TextColumn::make('data.email')
                    ->label('Email address')
                    ->searchable(),
                TextColumn::make('data.subject')
                    ->label('Subject')
                    ->icon(fn (DatabaseNotification $record) => is_null($record->read_at)
                        ? 'heroicon-m-envelope'
                        : null
                    )
                    ->iconColor('warning')
                    ->searchable(),
                TextColumn::make('data.to')
                    ->label('To')
                    ->searchable(),
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
                Filter::make('unread')
                    ->label('Unread')
                    ->query(fn ($query) => $query->whereNull('read_at')),

                Filter::make('read')
                    ->label('Read')
                    ->query(fn ($query) => $query->whereNotNull('read_at')),
            ])
            ->recordActions([
                ViewAction::make()
                    ->action(fn (DatabaseNotification $record) => self::viewNotification($record)),
                // EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    protected static function viewNotification(DatabaseNotification $notification): void
    {
        if (is_null($notification->read_at)) {
            $notification->markAsRead();
        }

        redirect(
            route(
                'filament.admin.resources.contact-messages.view'
            )
        );
    }
}
