<?php

namespace App\Filament\Widgets;

use App\Models\Post;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class PostsChart extends ChartWidget
{
    protected ?string $heading = 'Posts Created per Month';

    protected function getData(): array
    {

        $data = Post::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as total')
        )
        ->groupBy('month')
        ->pluck('total', 'month');

        $months = range(1, 12);
        $values = array_map(fn($m) => $data[$m] ?? 0, $months);

        return [
            'datasets' => [
                [
                    'label' => 'Posts',
                    'data' => $values,
                ],
            ],
            'labels' => array_map(fn($m) => date('M', mktime(0, 0, 0, $m, 1)), $months),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
