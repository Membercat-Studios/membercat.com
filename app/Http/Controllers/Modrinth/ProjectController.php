<?php

namespace App\Http\Controllers\Modrinth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

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

    public function fetchRawData($skipCache = false)
    {
        $cacheKey = self::CACHE_KEYS['projects'];
        
        if ($skipCache) {
            Cache::forget($cacheKey);
        }
        
        $response = Cache::remember($cacheKey, 600, function () {
            return $this->fetchFromApi('organization/membercat/projects', 'Unable to fetch projects');
        });

        if (!isset($response['error'])) {
            return $response;
        }

        return $response;
    }

    public function fetchProject($projectId, $skipCache = false)
    {
        $cacheKey = self::CACHE_KEYS['project'] . $projectId;
        
        if ($skipCache) {
            Cache::forget($cacheKey);
        }
        
        $response = Cache::remember($cacheKey, 600, function () use ($projectId) {
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

    private function getBannerFromGallery($gallery)
    {
        if (empty($gallery)) {
            return null;
        }

        $featured = collect($gallery)->firstWhere('featured', true);
        if ($featured) {
            return $featured['url'];
        }

        $banner = collect($gallery)->first(function ($image) {
            return $image['name'] && stripos($image['name'], 'banner') !== false;
        });
        if ($banner) {
            return $banner['url'];
        }

        return $gallery[0]['url'] ?? null;
    }

    public function fetchMembercatProjects(Request $request)
    {
        $skipCache = $request->boolean('skipCache', false);
        $projects = $this->fetchRawData($skipCache);
        
        if (isset($projects['error'])) {
            return $projects;
        }

        $collection = collect($projects);
        
        $allCategories = $collection->flatMap(function ($project) {
            return $project['categories'];
        })->unique()->sort()->values();
        
        $allProjectTypes = $collection->flatMap(function ($project) {
            return $project['project_types'];
        })->unique()->sort()->values();
        
        if ($request->has('project_type') && $request->project_type !== 'all') {
            $collection = $collection->filter(function ($project) use ($request) {
                return in_array($request->project_type, $project['project_types']);
            });
        }
        
        if ($request->has('category') && $request->category !== 'all') {
            $collection = $collection->filter(function ($project) use ($request) {
                return in_array($request->category, $project['categories']);
            });
        }
        
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'updated':
                    $collection = $collection->sortByDesc('updated');
                    break;
                case 'downloads':
                    $collection = $collection->sortByDesc('downloads');
                    break;
                case 'newest':
                    $collection = $collection->sortByDesc('published');
                    break;
                case 'name':
                    $collection = $collection->sortBy('name');
                    break;
                default:
                    $collection = $collection->sortByDesc('downloads');
            }
        } else {
            $collection = $collection->sortByDesc('downloads');
        }
        
        $enhancedProjects = $collection->map(function ($project) use ($skipCache) {
            $fullProject = $this->fetchProject($project['id'], $skipCache);
            
            $project['banner_url'] = $this->getBannerFromGallery($fullProject['gallery'] ?? []);
            
            return $project;
        });
        
        return [
            'projects' => $enhancedProjects->values()->toArray(),
            'metadata' => [
                'categories' => $allCategories,
                'project_types' => $allProjectTypes,
                'total' => $enhancedProjects->count()
            ]
        ];
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
            $fullProject = $this->fetchProject($project['id']);
            
            return [
                'id' => $project['id'],
                'slug' => $project['slug'],
                'name' => $project['name'],
                'description' => $project['description'],
                'summary' => $project['summary'],
                'icon' => $project['icon_url'],
                'banner_url' => $this->getBannerFromGallery($fullProject['gallery'] ?? []),
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

    public function projectCount()
    {
        $projects = $this->fetchRawData();
        return count($projects);
    }
}