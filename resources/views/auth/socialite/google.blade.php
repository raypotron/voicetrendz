<x-filament::button
    tag="a"
    :href="route('socialite.redirect', 'google')"
    color="gray"
    class="w-full flex items-center justify-center gap-2"
>
    <x-slot name="icon">
        <svg class="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.18 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.46 13.36 17.77 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.22-.43-4.75H24v9h12.7c-.55 2.97-2.23 5.48-4.74 7.18l7.54 5.86C43.92 37.18 46.5 31.15 46.5 24z"/>
            <path fill="#FBBC05" d="M10.53 28.41c-.5-1.47-.78-3.04-.78-4.66s.28-3.19.78-4.66l-7.98-6.19C.92 16.06 0 19.94 0 24s.92 7.94 2.55 11.09l7.98-6.68z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.92-2.13 15.9-5.81l-7.54-5.86c-2.1 1.41-4.78 2.24-8.36 2.24-6.23 0-11.54-3.86-13.46-9.09l-7.98 6.68C6.51 42.62 14.62 48 24 48z"/>
        </svg>
    </x-slot>
    {{ Route::is('filament.user.auth.register') ? 'Sign up with Google' : 'Sign in with Google' }}
</x-filament::button>
