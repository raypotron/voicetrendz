<?php

namespace App\Http\Middleware;

use App\Models\SiteVisit;
use Closure;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;
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
        $agent = new Agent();
        $device = $agent->isMobile() ? 'Mobile' :
        ($agent->isTablet() ? 'Tablet' : 'Desktop');
        $browser = $agent->browser();
        $platform = $agent->platform();

        $site = SiteVisit::firstOrCreate(['ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'browser' => $browser,
            'platform' => $platform,
            'device' => $device]);
        visits($site)->increment();

        // visits($site)->
        // app(Visits::class)->set('site')
        return $next($request);
    }
}
