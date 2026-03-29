<?php

namespace App\Actions;

use App\Models\Game;

class GetPopularGames {

    public function execute(){

        //popular games with high rating
        $games = Game::orderBy('avgcount', 'desc')
                ->orderBy('avgrating', 'desc')
                ->limit(20)
                ->get();

        if ($games->isEmpty()) {
            return null;
        } else {
            return $games;
        }

    }

}