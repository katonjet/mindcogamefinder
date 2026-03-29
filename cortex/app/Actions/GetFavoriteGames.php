<?php

namespace App\Actions;

use App\Models\Gamegenrerelate;
use App\Models\Game;
use App\Models\User;
use App\Models\Collection;

//Get games based on favorites
class GetFavoriteGames {

    public function execute(User $user){

        $genres_unique = Collection::select('genre_id')
                    ->where('user_id', $user->id)
                    ->where('type', 'favorite')
                    ->distinct();
        
        $gameIds = Gamegenrerelate::select('game_id')
                ->whereIn('genre_id', $genres_unique)
                ->distinct();

        $games = Game::whereIn('id', $gameIds)
                ->orderByDesc('updated_at') // to make games relevant
                ->get();

        if ($games->isEmpty()) {
            return null;
        } else {
            return $games;
        }

    }

}