<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilePhotoController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'photo' => 'nullable|image|max:1024',
            'avatar_type' => 'required|in:upload,discord,github,gravatar',
        ]);

        $user = $request->user();

        switch ($request->avatar_type) {
            case 'upload':
                if ($request->hasFile('photo')) {
                    $user->updateProfilePhoto($request->file('photo'));
                }
                break;
            
            case 'discord':
                $user->forceFill([
                    'use_discord_avatar' => true,
                    'use_github_avatar' => false,
                    'use_gravatar' => false,
                    'profile_photo_path' => null,
                ])->save();
                break;
            
            case 'github':
                $user->forceFill([
                    'use_github_avatar' => true,
                    'use_discord_avatar' => false,
                    'use_gravatar' => false,
                    'profile_photo_path' => null,
                ])->save();
                break;
            
            case 'gravatar':
                $user->forceFill([
                    'use_gravatar' => true,
                    'use_discord_avatar' => false,
                    'use_github_avatar' => false,
                    'profile_photo_path' => null,
                ])->save();
                break;
        }

        return back()->with('status', 'Profile photo updated successfully');
    }
} 