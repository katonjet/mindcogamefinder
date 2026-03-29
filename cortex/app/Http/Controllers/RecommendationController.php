<?php

namespace App\Http\Controllers;

use App\Actions\GetFavoriteGames;
use App\Actions\GetPopularGames;
use App\Actions\GetSimilarGames;
use App\Models\Collection;
use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    public function getPopular(GetPopularGames $instance){
        $games = $instance->execute();
        return $games ? response()->json($games) : response()->json(null, 404);
    }

    public function getSimilar(GetSimilarGames $instance, User $user){
        $games = $instance->execute($user);
        return $games ? response()->json($games) : response()->json(null, 404);
    }

    //Requires login beyond this point
    public function getFavorite(GetFavoriteGames $instance, User $user){
        $games = $instance->execute($user);
        return $games ? response()->json($games) : response()->json(null, 404);
    }

    public function addGameFavorite(User $user, Game $game){

        if ($game && $user) {
            Collection::create([
                'user_id' => $user->id,
                'game_id' => $game->id,
                'type' => 'favorite',//Fields from here to below are deprecated. place holder values used for now
                'genre_id' => 1,
            ]);

            return response()->json([
                'message' => 'added to collection'
            ], 201);
        } else {
            return response()->json([
                'message' => 'error occured'
            ], 404);
        }
    }

    public function deleteGameFavorite(User $user, Game $game){

        if ($game && $user) {
            Collection::where('user_id', $user->id)->where('game_id', $game->id)->delete();
            return response()->json([
                'message' => 'removed from collection'
            ], 201);
        } else {
            return response()->json([
                'message' => 'error occured'
            ], 404);
        }
    }

    public function existsGameFavorite(User $user, Game $game){
        $exists = Collection::where('user_id', $user->id)->where('game_id', $game->id)->exists();
        return $exists ? response()->json(null, 201) : response()->json(null, 404);
    }

    public function listGameFavorite(User $user){
        $gamelist = Collection::select('game_id')->where('user_id', $user->id);
        $games = Game::whereIn('id' ,$gamelist)->get();
        return $games ? response()->json($games) : response()->json(null, 404);
    }
}
