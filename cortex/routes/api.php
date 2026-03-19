<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileUploadTest;
use App\Http\Controllers\GameController;

//file upload test
Route::post('uploadtest', [FileUploadTest::class, 'upload']);

//
Route::post('uploadgamebackdrop', [FileUploadTest::class, 'uploadGameBackdrop']);


Route::apiResource('games', GameController::class);