<?php

namespace App\Filament\User\Pages;

use Filament\Pages\Page;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Hash;
use UnitEnum;

class Profile extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::UserCircle;
    protected string $view = 'filament.user.pages.profile';
    protected static ?string $title = 'My Profile';
    protected static string|UnitEnum|null $navigationGroup = 'Account Settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(auth()->user()->only(['name', 'email']));
    }

    protected function getFormSchema(): array
    {
        return [
            Forms\Components\TextInput::make('name')
                ->label('Full Name')
                ->required()
                ->maxLength(255),

            Forms\Components\TextInput::make('email')
                ->email()
                ->required()
                ->maxLength(255),

            Forms\Components\TextInput::make('password')
                ->label('New Password')
                ->password()
                ->revealable()
                ->dehydrated(fn ($state) => filled($state))
                ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                ->maxLength(255)
                ->helperText('Leave blank to keep your current password.'),
        ];
    }

    protected function getFormModel(): mixed
    {
        return auth()->user();
    }

    public function submit(): void
    {
        $this->form->getState();
        $user = auth()->user();

        $user->update($this->form->getState());

        Notification::make()
            ->title('Profile updated successfully!')
            ->success()
            ->send();
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Changes')
                ->submit('submit')
                ->color('primary'),
        ];
    }
}
