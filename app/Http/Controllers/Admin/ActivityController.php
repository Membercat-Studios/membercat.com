<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function recent()
    {
        return Activity::latest()
            ->take(10)
            ->get();
    }
} 