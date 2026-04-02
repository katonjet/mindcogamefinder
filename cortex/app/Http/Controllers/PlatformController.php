<?php

namespace App\Http\Controllers;

use App\Models\Systemplatform;
use Illuminate\Http\Request;

class PlatformController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Get distinct platforms
        $p = Systemplatform::orderBy('title')->get();
        return $p ? response()->json($p) : response()->json(null, 404);
    }

}
