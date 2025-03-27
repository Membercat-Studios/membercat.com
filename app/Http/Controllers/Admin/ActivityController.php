<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Activity');
    }
    
    public function recent()
    {
        return Activity::with('user')
            ->select('activities.*', 'users.name as user_name')
            ->leftJoin('users', 'activities.user_id', '=', 'users.id')
            ->orderBy('activities.created_at', 'desc')
            ->take(10)
            ->get();
    }
    
    public function list(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        
        return Activity::with('user')
            ->select('activities.*', 'users.name as user_name')
            ->leftJoin('users', 'activities.user_id', '=', 'users.id')
            ->orderBy('activities.created_at', 'desc')
            ->paginate($perPage);
    }
} 