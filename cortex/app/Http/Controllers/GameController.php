<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Gamegenrerelate;
use App\Models\Genre;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $games = Game::orderBy('updated_at', 'desc')
                    ->limit(20)
                    ->get();

        return $games ? response()->json($games) : response()->json(null, 404);       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        //$game =  Game::find($id);
        return $game ? response()->json($game) : response()->json(null, 404);
    }

    public function getGenres(Game $game){
        if ($game) {
            $genreIds = Gamegenrerelate::select('genre_id')->where('game_id', $game->id)->distinct();
            $genres = Genre::whereIn('id', $genreIds)->get();
            return $genres ? response()->json($genres) : response()->json(null, 404);
        }

        return response()->json(null, 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Game $game)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        //
    }
}
