<?php

namespace App\Filament\User\Pages;

use App\Models\Profile as ProfileModel;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use UnitEnum;

class Profile extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::UserCircle;

    protected static ?string $title = 'My Profile';

    protected static string|UnitEnum|null $navigationGroup = 'Account Settings';

    protected string $view = 'filament.user.pages.profile';

    public ?array $data = [];

    public function mount(): void
    {
        $user = Auth::user();
        $profile = $user->profile ?? new ProfileModel(['user_id' => $user->id]);

        $this->form->fill([
            'data' => array_merge(
                $user->only(['name', 'email']),
                $profile->only(['gender', 'phone_number', 'dob', 'state', 'country', 'marital_status', 'image_url'])
            ),
        ]);
    }

    protected function getFormSchema(): array
    {
        return [
            Group::make()
                ->statePath('data') // ✅ applies to both sections
                ->schema([
                    Section::make('Personal Information')
                        ->columns(2)
                        ->schema([
                            FileUpload::make('image_url')
                                ->label('Profile Picture')
                                ->disk(config('filesystems.default'))
                                ->directory('uploads/profile')
                                ->image()
                                ->avatar()
                                ->imagePreviewHeight('150')
                                ->visibility('public')
                                ->preserveFilenames()
                                ->columnSpanFull(),
                            TextInput::make('name')->label('Full Name'),
                            TextInput::make('email')
                                ->disabled(),
                            Select::make('gender')
                                ->options([
                                    'male' => 'Male',
                                    'female' => 'Female',
                                ]),
                            TextInput::make('phone_number')->tel(),
                            DatePicker::make('dob'),
                            Select::make('country')
                                ->label('Country')
                                ->options(collect(config('locations'))->keys()->mapWithKeys(fn ($c) => [$c => $c])->toArray())
                                ->live()
                                ->searchable(),

                            Select::make('state')
                                ->label('State/Province')
                                ->options(function (callable $get) {
                                    $country = $get('country');
                                    $locations = config('locations', []);

                                    if (! $country || ! isset($locations[$country])) {
                                        return [];
                                    }

                                    return collect($locations[$country])
                                        ->mapWithKeys(fn ($state) => [$state => $state])
                                        ->toArray();
                                })
                                ->afterStateHydrated(function (Forms\Components\Select $component, $state, $set, $get) {
                                    // ensure state options load on mount
                                    $country = $get('country');
                                    $locations = config('locations', []);

                                    if ($country && isset($locations[$country])) {
                                        $component->options(
                                            collect($locations[$country])
                                                ->mapWithKeys(fn ($s) => [$s => $s])
                                                ->toArray()
                                        );
                                    }
                                })
                                ->searchable(),

                            Select::make('marital_status')
                                ->options([
                                    'single' => 'Single',
                                    'married' => 'Married',
                                    'divorced' => 'Divorced',
                                ]),
                        ]),

                    Section::make('Change Password')
                        ->columns(2)
                        ->schema([
                            TextInput::make('current_password')
                                ->password()
                                ->revealable()
                                ->label('Current Password'),
                            TextInput::make('new_password')
                                ->password()
                                ->revealable()
                                ->label('New Password')
                                ->helperText('Leave blank if you don’t want to change it.'),
                        ]),
                ]),
        ];
    }

    public function submit(): void
    {
        $data = $this->form->getState();
        $user = Auth::user();

        if (! empty($data['data']['new_password'])) {
            $user->update([
                'name' => $data['data']['name'],
                'password' => Hash::make($data['data']['new_password']),
            ]);
        } else {
            $user->update(['name' => $data['data']['name']]);
        }

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            collect($data['data'])->only(['gender', 'phone_number', 'dob', 'state', 'country', 'marital_status', 'image_url'])->toArray()
        );

        Notification::make()
            ->title('Profile updated successfully!')
            ->success()
            ->send();

        $this->mount(); // refresh form data
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
