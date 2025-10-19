<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class NewRegistrationsChart extends ChartWidget
{
    protected ?string $heading = 'New Registrations (Last 7 days)';

    protected function getData(): array
    {
        $dates = collect(range(6, 0))->map(fn ($i) => Carbon::now()->subDays($i)->format('Y-m-d'));

        $counts = $dates->map(fn ($date) => User::whereDate('created_at', $date)->count()
        );

        return [
            'datasets' => [
                [
                    'label' => 'Users',
                    'data' => $counts,
                    'fill' => 'start',
                ],
            ],
            'labels' => $dates,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
