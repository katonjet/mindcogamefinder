<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMe
{
    /**
     * Handle an incoming request to fix Chrome / Chromium browsers from getting CORS error.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowedHeaders =   'Origin, Content-Type, Host, Cookie, Accept, Accept-Encoding, Accept-Language, Connection, Content-Length, Authorization, X-Xsrf-Token, Referer, User-Agent';
        $response = $next($request);
        return $response
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT, PATCH')
            ->header('Access-Control-Allow-Headers', $allowedHeaders);
    }
}
