<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileUploadTest;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\ReviewController;
use App\Http\Middleware\CorsMe;
use App\Http\Middleware\SaveMeAuth;
use App\Http\Middleware\BuildGameLibrary;

//file upload test
Route::post('uploadtest', [FileUploadTest::class, 'upload']);

Route::post('uploadgamebackdrop', [FileUploadTest::class, 'uploadGameBackdrop']);

Route::apiResource('games', GameController::class)->middleware(BuildGameLibrary::class);
Route::get('games/genres/{game}', [GameController::class, 'getGenres']);
Route::get('games/platforms/{game}', [GameController::class, 'getPlatforms']);
Route::get('games/bygenre/{g}', [GameController::class, 'getGamesByGenre']); //return games by genres
Route::get('games/byplatform/{p}', [GameController::class, 'getGamesByPlatform']); //return games by platforms

Route::get('genres', [GenreController::class, 'index']);

Route::get('platforms', [PlatformController::class, 'index']);

Route::get('reviews/game/{gameid}', [ReviewController::class, 'getReview']);
Route::middleware([
    SaveMeAuth::class,
    CorsMe::class,
])->group(function () {
    Route::get('reviews/user/{userid}', [ReviewController::class, 'getReviewFromUser'])->middleware('auth:sanctum');
    Route::apiResource('reviews', ReviewController::class)->middleware('auth:sanctum');
});


//Route::get('reviews/user/{userid}', [ReviewController::class, 'getReviewFromUser'])->middleware('auth:sanctum')->middleware(SaveMeAuth::class)->middleware(CorsMe::class);
//Route::apiResource('reviews', ReviewController::class)->middleware('auth:sanctum')->middleware(SaveMeAuth::class);