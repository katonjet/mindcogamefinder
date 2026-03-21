<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileUploadTest;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ReviewController;
use App\Http\Middleware\SaveMeAuth;

//file upload test
Route::post('uploadtest', [FileUploadTest::class, 'upload']);

Route::post('uploadgamebackdrop', [FileUploadTest::class, 'uploadGameBackdrop']);

Route::apiResource('games', GameController::class);

Route::get('reviews/{gameid}', [ReviewController::class, 'getReview']);
Route::get('reviews/user/{userid}', [ReviewController::class, 'getReviewFromUser'])->middleware('auth:sanctum')->middleware(SaveMeAuth::class);
Route::apiResource('reviews', ReviewController::class)->middleware('auth:sanctum')->middleware(SaveMeAuth::class);