<?php

namespace App\Http\Middleware;

use App\Models\Game;
use App\Models\Gamegenrerelate;
use App\Models\Gameplatformrelate;
use App\Models\Genre;
use App\Models\Systemplatform;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BuildGameLibrary
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
    
        $cached = DB::table('games')->latest()->first();

        if (!$cached || now()->diffInHours($cached->updated_at) > 24) { //run trigger if db not updated in past 24 hours or nothing is in db

            $apiKey = config('app.rawgKey');

            try {
                $serverResponse = Http::get("https://api.rawg.io/api/games?key=$apiKey&page_size=75"); //return 75 games
            } catch (\Exception $e) {
                Log::error('API request failed: ' . $e->getMessage());
            }

            if ($serverResponse->successful()) {

                $json = $serverResponse->json();

                foreach ($json['results'] as $game) {
                
                    //get game details
                    $gameId = $game['id'];
                    $gameDetails = Http::get("https://api.rawg.io/api/games/$gameId?key=$apiKey");

                    if ($gameDetails->successful()) {

                        $json_game = $gameDetails->json();

                        //save game backdrop
                        $backdropContent = file_get_contents($json_game['background_image']);
                        $slugId = $json_game['slug'];
                        Storage::disk('public')->put("game_backdrop/$slugId.jpg",$backdropContent);

                        //Save game
                        if (!Game::where('title', $json_game['name'])->exists()){
                            $savedGame = Game::create([
                                'title' => $json_game['name'],
                                'desc' => $json_game['description'],
                                'releasedate' => $json_game['released'],
                                'backdropimagepath' => "/storage/game_backdrop/$slugId.jpg",
                                'avgrating' => $json_game['rating'],
                                'avgcount' => $json_game['ratings_count'],
                            ]);
                        }

                        //Check Genre existance + bind to game
                        foreach ($json_game['genres'] as $g) {
                        
                            $genreDetect = Genre::where('title', $g['name'])->first(); //detect if Genre exists

                            if (!$genreDetect) {
                                $randomHexColor = bin2hex(random_bytes(3));
                                $genreDetect = Genre::create([
                                    'title' => $g['name'],
                                    'themecolor' => "#$randomHexColor",
                                ]);
                            }

                            //Bind genre to game
                            if (!Gamegenrerelate::where('game_id', $savedGame->id)->where('genre_id', $genreDetect->id)->exists()) {
                                Gamegenrerelate::create([
                                    'game_id' => $savedGame->id,
                                    'genre_id' => $genreDetect->id,
                                ]);
                            }

                        }

                        //Check Platform existance + bind to game
                        foreach ($json_game['platforms'] as $p) {
                        
                            $platformArrayBlock = $p['platform'];
                            $platformDetect = Systemplatform::where('title', $platformArrayBlock['name'])->first(); //detect if Genre exists

                            if (!$platformDetect) {
                                $randomHexColor = bin2hex(random_bytes(3));
                                $platformDetect = Systemplatform::create([
                                    'title' => $platformArrayBlock['name'],
                                    'themecolor' => "#$randomHexColor",
                                ]);
                            }

                            //Bind genre to game
                            if (!Gameplatformrelate::where('game_id', $savedGame->id)->where('systemplatform_id', $platformDetect->id)->exists()) {
                                Gameplatformrelate::create([
                                    'game_id' => $savedGame->id,
                                    'systemplatform_id' => $platformDetect->id,
                                ]);
                            }

                        }


                    }

                
                }

            }

        }

        return $next($request);
    }
}
