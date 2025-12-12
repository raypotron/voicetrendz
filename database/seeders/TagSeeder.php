<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $timestamp = now();

        $tags = [
            ['name' => 'breaking news', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'hottest', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'latest news', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'lyrics', 'created_at' => $timestamp, 'updated_at' => $timestamp],

        ];

        Tag::insert($tags);
    }
}
