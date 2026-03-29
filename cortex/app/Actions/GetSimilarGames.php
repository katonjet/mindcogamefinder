<?php

namespace App\Actions;

use App\Models\Collection;
use App\Models\Game;
use App\Models\User;
use App\Models\Gamegenrerelate;

//Get games based on another game
class GetSimilarGames {

    public function execute(User $user){

        //Select a game from collection in random
        $game = Collection::where('user_id', $user->id)->inRandomOrder()->first();

        //select genres of the selected game
        $genres = Gamegenrerelate::select('genre_id')
                ->where('game_id', $game->game_id)
                ->distinct();

        //select game ids matching the genres of the randomly selected game
        $gameIds = Gamegenrerelate::select('game_id')
                ->whereIn('genre_id', $genres)
                ->orderBy('updated_at', 'desc')
                ->distinct();

        //make game list
        $games = Game::whereIn('id', $gameIds)
                ->whereNotIn('id', [$game->game_id]) //exclude randomly selected game
                ->limit(20)
                ->get();
        $randGameTitle = Game::where('id', $game->game_id)->first()->title;

        $gameRes['recommendTitle'] = "Because you favorited '$randGameTitle'";
        $gameRes['list'] = $games;

        if ($games->isEmpty()) {
            return null;
        } else {
            return $gameRes;
        }

    }

}