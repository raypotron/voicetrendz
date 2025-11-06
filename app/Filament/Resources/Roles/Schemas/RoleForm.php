<?php

namespace App\Filament\Resources\Roles\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Spatie\Permission\Models\Permission;

class RoleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Role Name')
                    ->required()
                    ->unique(ignoreRecord: true),

                TextInput::make('guard_name')
                    ->label('Guard Name')
                    ->default('web')
                    ->readOnly()
                    ->required(),

                Select::make('permissions')
                    ->label('Permissions')
                    ->multiple()
                    ->options(Permission::pluck('name', 'name'))
                    ->preload()
                    ->searchable(),
            ]);
    }
}
