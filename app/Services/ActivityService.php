<?php

namespace App\Services;

use App\Models\Activity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ActivityService
{
    public static function log($type, $action, $target = null, $targetId = null)
    {
        $user = Auth::user();
        
        return Activity::create([
            'user_id' => $user ? $user->id : null,
            'user_name' => $user ? $user->name : 'Guest',
            'type' => $type,
            'action' => $action,
            'target' => $target,
            'target_id' => $targetId,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }
} 