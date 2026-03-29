<?php

namespace App\Actions;

use App\Models\Game;

class GetPopularGames {

    public function execute(){

        //popular games with high rating
        $games = Game::orderByDesc('avgcount')
                ->orderByDesc('avgrating')
                ->get();

        if ($games->isEmpty()) {
            return null;
        } else {
            return $games;
        }

    }

}