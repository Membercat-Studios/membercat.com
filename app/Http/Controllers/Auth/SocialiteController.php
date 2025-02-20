<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    public function discordRedirect()
    {
        return Socialite::driver('discord')->redirect();
    }

    public function githubRedirect()
    {
        return Socialite::driver('github')->redirect();
    }

    public function discordCallback()
    {
        try {
            $discord = Socialite::driver('discord')->user();

            $user = User::updateOrCreate(
                ['email' => $discord->email],
                [
                    'name' => $discord->name ?? $discord->nickname,
                    'password' => bcrypt(Str::random(24)),
                    'discord_id' => $discord->id,
                    'discord_token' => $discord->token,
                    'discord_refresh_token' => $discord->refreshToken,
                ]
            );

            Auth::login($user);

            return redirect()->intended(route('home'));
        } catch (\Exception $e) {
            return redirect()->route('login')
                ->withErrors(['error' => 'Failed to authenticate with Discord']);
        }
    }

    public function githubCallback()
    {
        try {
            $github = Socialite::driver('github')->user();

            $user = User::updateOrCreate(
                ['email' => $github->email],
                [
                    'name' => $github->name ?? $github->nickname,
                    'password' => bcrypt(Str::random(24)),
                    'github_id' => $github->id,
                    'github_token' => $github->token,
                ]
            );

            Auth::login($user);

            return redirect()->intended(route('home'));
        } catch (\Exception $e) {
            return redirect()->route('login')
                ->withErrors(['error' => 'Failed to authenticate with GitHub']);
        }
    }
} 