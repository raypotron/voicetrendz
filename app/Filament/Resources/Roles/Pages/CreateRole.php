<?php

namespace App\Filament\Resources\Roles\Pages;

use App\Filament\Resources\Roles\RoleResource;
use Filament\Resources\Pages\CreateRecord;

class CreateRole extends CreateRecord
{
    protected static string $resource = RoleResource::class;

    protected function afterCreate(): void
    {
        $permissions = $this->data['permissions'] ?? [];
        $this->record->syncPermissions($permissions);
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        unset($data['permissions']);

        return $data;
    }
}
