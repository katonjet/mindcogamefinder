<?php

namespace App\Actions;

use App\Models\Game;
use App\Models\Gamegenrerelate;

//Get games based on another game
class GetSimilarGames {

    public function execute(Game $game){

        $genres = Gamegenrerelate::select('genre_id')
                ->where('game_id', $game->id)
                ->distinct();

        $games = Game::whereIn('genre_id', $genres)
                ->orderByDesc('updated_at')
                ->get();

        if ($games->isEmpty()) {
            return null;
        } else {
            return $games;
        }

    }

}