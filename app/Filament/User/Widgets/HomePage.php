<?php

namespace App\Filament\User\Widgets;

use Filament\Widgets\Widget;

class HomePage extends Widget
{
    protected string $view = 'filament.user.widgets.home-page';

    protected static ?int $sort = -4;
}
