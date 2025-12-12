<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $timestamp = now();

        $genres = [
            ['name' => 'Soul', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'Pop', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'Jazz', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'Folk', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'Hip-hop', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'Afro Fusion', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'Pop', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'Afro Beats', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'Raggae', 'created_at' => $timestamp, 'updated_at' => $timestamp],
            ['name' => 'Afrowave', 'created_at' => $timestamp, 'updated_at' => $timestamp],
        ];

        Genre::insert($genres);
    }
}
