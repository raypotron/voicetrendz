<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\CustomHeaderWidget;
use App\Filament\Widgets\PostsChart;
use BackedEnum;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;

class CustomDashboard extends Page
{
    protected string $view = 'filament.pages.dashboard'; 

    protected static string|BackedEnum|null $navigationIcon = Heroicon::Home;

    protected function getHeaderWidgets(): array
    {
        return [
            CustomHeaderWidget::class,
        ];
    }


    protected function getWidgets(): array
    {
        return [
            PostsChart::class,
        ];
    }
}
