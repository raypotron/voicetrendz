<?php

namespace Database\Factories;

use App\Models\Genre;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lyric>
 */
class LyricFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $title = $this->faker->unique()->sentence(4);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => '<p>Mmm...<br>No no no no...<br>Oh, yeah.</p><p>I&#039;m in chains you&#039;re in chains too<br>I wear uniforms and, you wear uniforms too<br>I&#039;m a prisoner, you&#039;re a prisoner too<br>Mr Jailer</p><p>I have fears you have fears too<br>I will die, yourself will die too<br>Life is beautiful, don&#039;t you think so too<br>Mr Jailer</p><p>I&#039;m talking to you jailer<br>Stop calling me a prisoner<br>Let he who is without sin be the first to cast the stone<br>Mr Jailer<br>Mr Jailer man</p><p>You suppress all my strategies<br>You oppress every part of me<br>What you don&#039;t know, you&#039;re a victim too<br>Mr Jailer</p><p>You don&#039;t care about my point of view<br>If I die another will work for you<br>So you treat me like a modern slave<br>Mr Jailer</p><p>I&#039;m talking to you jailer<br>Stop calling me a prisoner<br>Let he who is without sin be the first to cast the stone<br>Mr Jailer<br>Mr Jailer man</p><p>You see,<br>If you walking in a market place<br>Don&#039;t throw stones<br>Even if you do you just might hit<br>One of your own<br>Life is not about your policies<br>All the time<br>So you better rearrange your philosophies<br>And be good to your fellow man, jailer!</p><p>Oh, I&#039;m talking to you jailer<br>Stop calling me a prisoner<br>Let he who is without sin be the first to cast the stone<br>Mr Jailer<br>Mr Jailer</p><p>I heard my baby say<br>I wanna be president<br>I want chop money<br>From my government<br>What he don&#039;t know, what he won&#039;t know, what he can&#039;t know<br>Jailer, jailer<br>Oh, be good woah,<br>Oh, be good woah,<br>Oh, be good woah,<br>So better be good woah<br>Oh, be good woah<br>Oh, be good woah<br>Oh, be good woah</p>',
            'user_id' => 1,
            'status' => 'published',
            'thumbnail_path' => 'uploads/artists/ASA_1.jpg',
            'artist_id' => 1
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($lyric){
            $genreIds = Genre::inRandomOrder()->take(rand(1, 3))->pluck('id');
            $tagIds = Tag::inRandomOrder()->take(rand(1,3))->pluck('id');

            $lyric->genres()->attach($genreIds);
            $lyric->tags()->attach($tagIds);
        });
    }
}
