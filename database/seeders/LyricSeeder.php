<?php

namespace Database\Seeders;

use App\Models\Lyric;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LyricSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lyric::factory()->count(5)->create();
    }
}
