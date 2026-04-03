<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Gamegenrerelate;
use App\Models\Gameplatformrelate;
use App\Models\Genre;
use App\Models\Systemplatform;
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

    public function searchGames(Request $request){
        $searchQuery = $request->input('q');

        $games = Game::where('title', 'like', "%{$searchQuery}%")->get();

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

    public function getGenres(Game $game)
    {
        if ($game) {
            $genreIds = Gamegenrerelate::select('genre_id')->where('game_id', $game->id)->distinct();
            $genres = Genre::whereIn('id', $genreIds)->get();
            return $genres ? response()->json($genres) : response()->json(null, 404);
        }

        return response()->json(null, 404);
    }

    public function getPlatforms(Game $game)
    {
        if ($game) {
            $pId = Gameplatformrelate::select('systemplatform_id')->where('game_id', $game->id)->distinct();
            $platforms = Systemplatform::whereIn('id', $pId)->get();
            return $platforms ? response()->json($platforms) : response()->json(null, 404);
        }

        return response()->json(null, 404);
    }

    public function getGamesByGenre(Genre $g)
    {
        if ($g) {
            $games = Gamegenrerelate::with('game')->with('genre:id,title,themecolor')->orderBy('updated_at', 'desc')->where('genre_id', $g->id)->get();
            return $games ? response()->json($games) : response()->json(null, 404);
        }

        return response()->json(null, 404);
    }

    public function getGamesByPlatform(Systemplatform $p)
    {
        if ($p) {
            $games = Gameplatformrelate::with('game')->with('systemplatform:id,title,themecolor')->orderBy('updated_at', 'desc')->where('systemplatform_id', $p->id)->get();
            return $games ? response()->json($games) : response()->json(null, 404);
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
