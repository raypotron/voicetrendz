<?php

namespace App\Filament\Widgets;

use Awssat\Visits\Models\Visit;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class GuestVisitsChart extends ChartWidget
{
    protected ?string $heading = 'Guest Visits (Last 7 Days)';

    protected function getData(): array
    {
         $dates = collect(range(6, 0))->map(
            fn($i) => Carbon::now()->subDays($i)->format('Y-m-d')
        );

        // Count visits per day
        $counts = $dates->map(function ($date) {
            return Visit::where('primary_key', 'visits:sitevisits_site_day')
                ->whereDate('created_at', $date)
                ->count();
        });

        return [
            'datasets' => [
                [
                    'label' => 'Visits',
                    'data' => $counts,
                    'backgroundColor' => 'rgba(59, 130, 246, 0.7)',
                    'borderColor' => 'rgba(59, 130, 246, 1)',
                ],
            ],
            'labels' => $dates,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    // protected static ?int $sort = 3;
}
