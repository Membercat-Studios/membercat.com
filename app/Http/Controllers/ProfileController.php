<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Display the security settings page.
     */
    public function security(): Response
    {
        return Inertia::render('Profile/Security');
    }

    /**
     * Display the privacy settings page.
     */
    public function privacy(): Response
    {
        return Inertia::render('Profile/Privacy');
    }

    /**
     * Display the preferences page.
     */
    public function preferences(): Response
    {
        return Inertia::render('Profile/Preferences');
    }

    /**
     * Update the user's profile information.
     */
    public function updateAll(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($request->user()->id)],
            'photo' => ['nullable', 'image', 'max:1024'],
            'avatar_type' => ['required', 'string', 'in:upload,discord,github,gravatar'],
            'status' => ['nullable', 'string', 'in:online,idle,do not disturb,offline'],
        ]);

        $user = $request->user();

        // Update basic info
        if ($request->email !== $user->email) {
            $user->email_verified_at = null;
        }
        
        $user->fill($request->only(['name', 'email', 'status']));

        // Handle avatar update
        switch ($request->avatar_type) {
            case 'upload':
                if ($request->hasFile('photo')) {
                    $user->updateProfilePhoto($request->file('photo'));
                }
                $user->forceFill([
                    'use_discord_avatar' => false,
                    'use_github_avatar' => false,
                    'use_gravatar' => false,
                ]);
                break;
            
            case 'discord':
                $user->forceFill([
                    'use_discord_avatar' => true,
                    'use_github_avatar' => false,
                    'use_gravatar' => false,
                    'profile_photo_path' => null,
                ]);
                break;
            
            case 'github':
                $user->forceFill([
                    'use_github_avatar' => true,
                    'use_discord_avatar' => false,
                    'use_gravatar' => false,
                    'profile_photo_path' => null,
                ]);
                break;
            
            case 'gravatar':
                $user->forceFill([
                    'use_gravatar' => true,
                    'use_discord_avatar' => false,
                    'use_github_avatar' => false,
                    'profile_photo_path' => null,
                ]);
                break;
        }

        $user->save();

        return back()->with('status', 'Profile updated successfully');
    }

    /**
     * Update privacy settings.
     */
    public function updatePrivacy(Request $request): RedirectResponse
    {
        $request->validate([
            'public_profile' => ['required', 'boolean'],
        ]);

        $request->user()->forceFill([
            'public_profile' => $request->public_profile,
        ])->save();

        return back()->with('status', 'Privacy settings updated successfully');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
