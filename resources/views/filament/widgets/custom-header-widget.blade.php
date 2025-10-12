<x-filament-widgets::widget>
    <x-filament::section>
    <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
        <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ config('app.name') }}</h1>
            <p class="text-sm text-gray-500">v{{ config('app.version') }}</p>
        </div>

        {{-- <div class="flex items-center space-x-5">
            <a href="https://voicetrendz.help" target="_blank" class="flex items-center text-gray-600 hover:text-primary-600 text-sm">
                <x-heroicon-o-book-open class="w-3.5 h-3.5 mr-1" />
                Help Center
            </a>

            <a href="https://voicetrendz.support" target="_blank" class="flex items-center text-gray-600 hover:text-primary-600 text-sm">
                <x-heroicon-o-lifebuoy class="w-3.5 h-3.5 mr-1" />
                Support
            </a>
        </div> --}}
    </div>
    </x-filament::section>
</x-filament-widgets::widget>
