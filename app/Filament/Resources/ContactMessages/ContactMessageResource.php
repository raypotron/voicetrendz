<?php

namespace App\Filament\Resources\ContactMessages;

use App\Filament\Resources\ContactMessages\Pages\CreateContactMessage;
use App\Filament\Resources\ContactMessages\Pages\EditContactMessage;
use App\Filament\Resources\ContactMessages\Pages\ListContactMessages;
use App\Filament\Resources\ContactMessages\Pages\ViewContactMessage;
use App\Filament\Resources\ContactMessages\Schemas\ContactMessageForm;
use App\Filament\Resources\ContactMessages\Schemas\ContactMessageInfolist;
use App\Filament\Resources\ContactMessages\Tables\ContactMessagesTable;
use App\Notifications\NewContactMessage;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Auth;

class ContactMessageResource extends Resource
{
    protected static ?string $model = DatabaseNotification::class;

    protected static ?string $navigationLabel = 'Contact Messages';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedEnvelopeOpen;

    protected static ?string $recordTitleAttribute = 'email';

    // public static function form(Schema $schema): Schema
    // {
    //     return ContactMessageForm::configure($schema);
    // }

    public static function infolist(Schema $schema): Schema
    {
        return ContactMessageInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ContactMessagesTable::configure($table);
    }

    public static function getEloquentQuery(): Builder
    {
        return DatabaseNotification::query()
            ->where('notifiable_id', Auth::id())
            ->where('notifiable_type', Auth::user()::class)
            ->where('type', NewContactMessage::class)
            ->latest();
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return Auth::user()?->unreadNotifications()->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'danger';
    }

    public static function canEdit(Model $record): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => ListContactMessages::route('/'),
            'view' => ViewContactMessage::route('/{record}'),
        ];
    }
}
