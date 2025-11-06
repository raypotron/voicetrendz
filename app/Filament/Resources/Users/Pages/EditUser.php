<?php

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use Spatie\Permission\Models\Role;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        unset($data['roles']);

        return $data;
    }

    protected function afterSave(): void
    {
        $roleIds = $this->data['roles'] ?? [];

        $roleNames = Role::whereIn('id', $roleIds)->pluck('name')->toArray();
        $this->record->syncRoles($roleNames);
    }
}
