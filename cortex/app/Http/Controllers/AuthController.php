<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    
    //add new user to DB
    public function register(Request $request){

        //Make sure data is contrained and valid before adding user to system
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', //CONFIRMED --> password_confirmation must be in there
            'username' => 'required|string|max:50|unique:users',
        ]);

        //Add user to system after validating entry
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            //'profileimagepath' => 'URI DUMP',
            'username' => $request->username,
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'User has been registered',
            //'token' => $token,//INTELLISENSE NOT READING THIS
            'user' => $user
        ], 201)->cookie('userAuth',"$token");

    }

    //User login
    public function login(Request $request){

        //Validate request
        $request->validate([
            'email' => 'required|email', //Prefer username
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        //check password
        if (!$user || !Hash::check($request->password, $user->password)){
            throw ValidationException::withMessages([
                'email' => ['Login failed! Double check your credentials and try again.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            //'token' => $user->createToken('api-token')->plainTextToken,
            //'user' => $user
        ])->cookie('userAuth',"$token");

    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        Cookie::queue(Cookie::forget('userAuth'));
        return response()->json(['message' => 'Logout successful']);
    }

}
