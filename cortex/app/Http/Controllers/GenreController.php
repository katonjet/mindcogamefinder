<?php

namespace App\Http\Controllers;

use App\Models\Genre;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Get distinct genres
        $genres = Genre::orderBy('title')->get();
        return $genres ? response()->json($genres) : response()->json(null, 404);
    }
    
}
