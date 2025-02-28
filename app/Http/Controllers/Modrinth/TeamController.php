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
    ];

    private function fetchFromApi($endpoint, $errorMessage)
    {
        $response = Http::get("https://api.modrinth.com/v3/organization/{$endpoint}");
        
        if ($response->successful()) {
            return $response->json();
        }

        return response()->json(['error' => $errorMessage], 500);
    }

    public function fetchRawData()
    {
        $cacheKey = self::CACHE_KEYS['team'];
        $response = Cache::remember($cacheKey, 300, function () { // 5 mins
            return $this->fetchFromApi('membercat', 'Unable to fetch team data');
        });

        if (!isset($response['error'])) {
            return $response;
        }

        return $response;
    }

    public function fetchMembers()
    {
        $cacheKey = self::CACHE_KEYS['team'] . ':members';
        $response = Cache::remember($cacheKey, 600, function () {
            return $this->fetchFromApi('membercat/members', 'Unable to fetch members');
        });

        if (!isset($response['error'])) {
            return $response;
        }

        return $response;
    }
}
