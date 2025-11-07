<x-filament-panels::page>
    {{ $this->form }}

    <div class="mt-2 flex justify-end">
        <x-filament::button type="button" wire:click="submit" wire:loading.attr="disabled">
            Save Changes
        </x-filament::button>
    </div>
</x-filament-panels::page>
