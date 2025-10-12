<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class CustomHeaderWidget extends Widget
{
    protected string $view = 'filament.widgets.custom-header-widget';

    protected int | string | array $columnSpan = '1';
}
