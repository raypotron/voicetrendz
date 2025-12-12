<?php

namespace Database\Factories;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artist>
 */
class ArtistFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->sentence(3);

        return [
            'name' => $name,
            'stage_name' => $this->faker->userName,
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence,
            'social_media_followers' => $this->faker->randomDigit().'M',
            'bio' => '<p>Asa (pronounced “Asha”) is a Nigerian-French singer, songwriter, and recording artist known for her soulful blend of pop, jazz, and Nigerian folk music. Born Bukola Elemide on September 17, 1982, in Paris, France, she moved to Lagos, Nigeria, during her childhood, which gave her music a rich mix of Western and African influences.</p><p>Her music is celebrated for its deeply emotional storytelling, socially conscious themes, and soothing, velvety voice. Asa often addresses topics like love, heartbreak, identity, and social issues, blending introspective lyrics with memorable melodies. She gained international recognition with her self-titled debut album, <em>“Asa”</em> (2007), which included hits like <em>“Jailer”</em> and <em>“Fire on the Mountain.”</em></p><p>Known for her understated style and authentic artistry, Asa has continued to evolve musically over the years, releasing albums like <em>“Beautiful Imperfection”</em> (2010) and <em>“Bed of Stone”</em> (2014). She’s respected not just in Nigeria but globally, especially among listeners who appreciate thoughtful, soulful music that resonates on both personal and social levels.</p>',
            'image_url' => 'uploads/artists/ASA_1.jpg',
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($artist) {
            $genreIds = Genre::inRandomOrder()
                ->take(rand(1, 3))
                ->pluck('id');

            $artist->genres()->attach($genreIds);
        });
    }
}
