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
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if ($request->has('public_profile')) {
            $request->user()->public_profile = $request->boolean('public_profile');
        }

        $request->user()->save();

        return back();
    }

    /**
     * Update the user's status.
     */
    public function updateStatus(Request $request): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'string', 'in:online,idle,do not disturb,offline'],
        ]);

        $request->user()->status = $request->input('status');
        $request->user()->save();

        return Redirect::route('profile.edit');
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

    public function security(Request $request): Response
    {
        return Inertia::render('Profile/Security');
    }

    public function privacy(Request $request): Response
    {
        return Inertia::render('Profile/Privacy');
    }

    public function preferences(Request $request): Response
    {
        return Inertia::render('Profile/Preferences');
    }
}
