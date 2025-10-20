<?php

namespace App\Http\Middleware;

use App\Models\Post;
use App\Models\SiteVisit;
use Awssat\Visits\Visits;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $site = SiteVisit::class;
        visits($site)->increment();
        return $next($request);
    }
}
