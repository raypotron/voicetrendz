<x-filament-panels::page>
    <form wire:submit.prevent="submit">
        {{ $this->form }}

        <div class="mt-6">
            <x-filament::button type="submit" color="primary">
                Save Changes
            </x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
