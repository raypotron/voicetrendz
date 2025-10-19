<?php

namespace App\Filament\Widgets;

use App\Models\Category;
use Filament\Widgets\ChartWidget;

class PostsByCategoryChart extends ChartWidget
{
    protected ?string $heading = 'Posts By Category Chart';

    protected function getData(): array
    {
        $categories = Category::pluck('name');
        $counts = Category::withCount('posts')->pluck('posts_count');

        return [
            'datasets' => [
                [
                    'label' => 'Number of Posts',
                    'data' => $counts
                ],
            ],
            'labels' => $categories,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
