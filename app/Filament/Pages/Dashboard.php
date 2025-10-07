<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\PostsChart;
use BackedEnum;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;

class Dashboard extends Page
{
    protected string $view = 'filament.pages.dashboard';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::Home;


    protected function getWidgets(): array
    {
        return [
            PostsChart::class,
        ];
    }
}
