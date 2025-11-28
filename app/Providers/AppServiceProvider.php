<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('local') && class_exists(\Laravel\Telescope\TelescopeServiceProvider::class)) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        Inertia::share([
            // 'user' => fn () => Auth::user()?->only(['id', 'name']),
            'user' => fn () => Auth::user() ? [
                'id' => Auth::user()->id,
                'name' => Auth::user()->name,
                'roles' => Auth::user()->getRoleNames(),
            ] : null,
        ]);

        ini_set('max_execution_time', 1800);
        ini_set('upload_max_filesize', '20M');
        ini_set('post_max_size', '25M');
        ini_set('memory_limit', '128M');
    }
}
