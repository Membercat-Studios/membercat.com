<?php

namespace App\Http\Controllers\Modrinth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ProjectController extends Controller 
{
    const TEAM_ID = 'membercat';
    const CACHE_KEYS = [
        'projects' => 'modrinth:team:' . self::TEAM_ID . ':projects',
        'project' => 'modrinth:project:',
    ];

    public function fetchRawData()
    {
        $cacheKey = self::CACHE_KEYS['projects'];
        $response = Cache::remember($cacheKey, 300, function () { // 5 mins
            $response = Http::get('https://api.modrinth.com/v3/organization/membercat/projects');
            
            if ($response->successful()) {
                return $response->json();
            }

            return null;
        });

        if ($response) {
            return $response;
        }

        return response()->json(['error' => 'Unable to fetch projects'], 500);
    }

    public function fetchProject($projectId)
    {
        $cacheKey = self::CACHE_KEYS['project'] . $projectId;
        $response = Cache::remember($cacheKey, 300, function () use ($projectId) { // 5 mins
            $response = Http::get("https://api.modrinth.com/v3/project/{$projectId}");

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        });

        if ($response) {
            return $response;
        }

        return response()->json(['error' => 'Unable to fetch project'], 500);
    }

    public function fetchProjects(...$projectIds)
    {
        $projects = [];

        foreach ($projectIds as $projectId) {
            $projects[] = $this->fetchProject($projectId);
        }

        return $projects;
    }
}