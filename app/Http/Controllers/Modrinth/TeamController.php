<?php

namespace App\Http\Controllers\Modrinth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class TeamController extends Controller
{
    const TEAM_ID = 'membercat';
    const CACHE_KEYS = [
        'team' => 'modrinth:team:' . self::TEAM_ID,
        'members' => 'modrinth:team:' . self::TEAM_ID . ':members',
    ];

    public function fetchRawData()
    {
        $cacheKey = self::CACHE_KEYS['team'];
        $response = Cache::remember($cacheKey, 300, function () { // 5 mins
            $response = Http::get('https://api.modrinth.com/v3/organization/membercat');

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        });

        if ($response) {
            return $response;
        }

        return response()->json(['error' => 'Unable to fetch team data'], 500);
    }

    public function fetchMembers()
    {
        $cacheKey = self::CACHE_KEYS['members'];
        $response = Cache::remember($cacheKey, 600, function () { // 10 mins
            $response = Http::get("https://api.modrinth.com/v3/organization/membercat/members");

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        });

        if ($response) {
            return $response;
        }

        return response()->json(['error' => 'Unable to fetch members'], 500);
    }
}
