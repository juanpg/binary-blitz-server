<?php

namespace App\Http\Middleware;

use Closure;
use Config;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Http;

class ValidateRecaptchaToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->input('token', '');

        abort_if(strlen($token) === 0, response()->json(["message"=>"Invalid token"], 400));

        $http = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => Config::get('app.google_captcha_secret_key'),
            'response' => $token
        ]);

        abort_if(!$http->ok(), response()->json(["message"=>"Error validating the token"], 400));

        $obj = $http->json();

        abort_if(!$obj["success"], response()->json([
            "message"=>$obj
        ], 403));

        return $next($request);
    }
}
