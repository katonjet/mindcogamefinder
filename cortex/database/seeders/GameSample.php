<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Game;

class GameSample extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Game::create([
            'desc' => "Lego Batman: Legacy of the Dark Knight is an upcoming Lego-themed action-adventure game developed by Traveller's Tales and published by Warner Bros. Games. It is the fourth installment in the Lego Batman video game series, and features an original story inspired by films and other media from the Batman franchise. Announced at Gamescom in 2025, the game is set to be released on Nintendo Switch 2, PlayStation 5, Windows, and Xbox Series X and Series S on May 29, 2026. ",
            'title' => 'Lego Batman: Legacy of the Dark Knight',
            'releasedate' => '2026-05-29',
            'platforms' => json_encode(['PC', 'Steam Deck', 'Whatever']),
            'genres' => json_encode(['Action', 'Adventure']),
            'backdropimagepath' => '/storage/game_backdrop/3qoD0W7z5PLy1osXa6FFwo2xWYsX4qvwBn8L4zMN.jpg'
        ]);
    }
}
