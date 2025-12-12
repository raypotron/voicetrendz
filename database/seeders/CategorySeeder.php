<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $timestamp = now();

        $categories = [
            ['name' => 'news', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'press release', 'created_at' => $timestamp, 'updated_at' => $timestamp],
        ];

        Category::insert($categories);
    }
}
