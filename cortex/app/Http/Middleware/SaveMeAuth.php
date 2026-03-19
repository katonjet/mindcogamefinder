<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Cookie\CookieValuePrefix;

class SaveMeAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next): Response
    {

        //$token = $request->cookie('userAuth');

        //$token = Cookie::get('userAuth');

        try {
            $token = Crypt::decrypt(Cookie::get('userAuth'), false);
            $token = CookieValuePrefix::remove($token);
        } catch (DecryptException $e) {
            // Handle decryption failure
            $token = null;
        }

        //echo $token;

        if ($token) {
            $request->headers->set('Authorization', 'Bearer ' . $token);   
        }
                    
        return $next($request);
    }
}
