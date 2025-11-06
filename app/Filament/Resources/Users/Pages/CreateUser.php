<?php

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use Filament\Resources\Pages\CreateRecord;
use Spatie\Permission\Models\Role;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        unset($data['roles']);

        return $data;
    }

    protected function afterCreate(): void
    {
        $roleIds = $this->data['roles'] ?? [];

        $roleNames = Role::whereIn('id', $roleIds)->pluck('name')->toArray();
        $this->record->syncRoles($roleNames);
    }
}
