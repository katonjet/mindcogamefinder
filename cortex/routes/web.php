<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CorsMe;
use App\Http\Middleware\SaveMeAuth;
use Symfony\Component\HttpFoundation\Request;

Route::get('/', function () {
    return view('welcome');
});

//for CORS sanity check only
Route::get('/test', function () {
    return ['message' => 'API working'];
});

////////////////////////////////////////////////// User authentication logic - start //////////////////////////////////////////////////

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', SaveMeAuth::class, CorsMe::class])->group(function () {
    Route::get('user', function (Request $request){
        return $request->user();//Reflect currently logged in user (client side)
    });//->middleware(SaveMeAuth::class);
    Route::post('logout', [AuthController::class, 'logout']);//->middleware(SaveMeAuth::class);
});

////////////////////////////////////////////////// User authentication logic -   end //////////////////////////////////////////////////