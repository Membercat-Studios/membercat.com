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

    private function fetchFromApi($endpoint, $errorMessage)
    {
        $response = Http::get("https://api.modrinth.com/v3/{$endpoint}");
        
        if ($response->successful()) {
            return $response->json();
        }

        return response()->json(['error' => $errorMessage], 500);
    }

    public function fetchRawData()
    {
        $cacheKey = self::CACHE_KEYS['projects'];
        $response = Cache::remember($cacheKey, 300, function () {
            return $this->fetchFromApi('organization/membercat/projects', 'Unable to fetch projects');
        });

        if (!isset($response['error'])) {
            return $response;
        }

        return $response;
    }

    public function fetchProject($projectId)
    {
        $cacheKey = self::CACHE_KEYS['project'] . $projectId;
        $response = Cache::remember($cacheKey, 300, function () use ($projectId) {
            return $this->fetchFromApi("project/{$projectId}", 'Unable to fetch project');
        });

        if (!isset($response['error'])) {
            return $response;
        }

        return $response;
    }

    public function fetchProjects(...$projectIds)
    {
        $projects = [];
        foreach ($projectIds as $projectId) {
            $projects[] = $this->fetchProject($projectId);
        }
        return $projects;
    }

    public function fetchMembercatProjects()
    {
        $projects = $this->fetchRawData();
        
        if (isset($projects['error'])) {
            return $projects;
        }

        return collect($projects);
    }

    public function top3Projects()
    {
        $projects = $this->fetchRawData();
        
        if (isset($projects['error'])) {
            return $projects;
        }
        
        return collect($projects)
        ->sortByDesc('downloads')
        ->take(3)
        ->map(function ($project) {
            return [
                'id' => $project['id'],
                'slug' => $project['slug'],
                'name' => $project['name'],
                'description' => $project['description'],
                'summary' => $project['summary'],
                'icon' => $project['icon_url'],
                'downloads' => $project['downloads'],
                'followers' => $project['followers'],
                'versions' => $project['versions'],
                'categories' => $project['categories'],
                'project_types' => $project['project_types'],
                'versions' => $project['versions'],
                
            ];
        })
        ->values()
        ->toArray();
    }
}