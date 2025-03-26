<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Exception\ClientException;
use App\Services\ActivityService;

class SocialiteController extends Controller
{
    public function discordRedirect()
    {
        try {
            return Socialite::driver('discord')
                ->setScopes(['identify', 'email'])
                ->redirect();
        } catch (Exception $e) {
            Log::error('Discord redirect failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect('/login')
                ->with('error', 'Could not connect to Discord. Please try again later.');
        }
    }

    public function githubRedirect()
    {
        try {
            return Socialite::driver('github')->redirect();
        } catch (Exception $e) {
            Log::error('GitHub redirect failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect('/login')
                ->with('error', 'Could not connect to GitHub. Please try again later.');
        }
    }

    public function discordCallback()
    {
            $discordUser = Socialite::driver('discord')->user();
            
            $user = User::where('discord_id', $discordUser->id)
                       ->orWhere('email', $discordUser->email)
                       ->first();

            if ($user) {
                $user->update([
                    'discord_id' => $discordUser->id,
                    'discord_username' => $discordUser->nickname,
                    'discord_token' => $discordUser->token,
                    'discord_refresh_token' => $discordUser->refreshToken,
                    'discord_avatar' => $discordUser->avatar,
                    'name' => $discordUser->name ?? $discordUser->nickname,
                    'email' => $discordUser->email,
                ]);
            } else {
                $user = User::create([
                    'name' => $discordUser->name ?? $discordUser->nickname,
                    'email' => $discordUser->email,
                    'password' => bcrypt(Str::random(24)),
                    'discord_id' => $discordUser->id,
                    'discord_username' => $discordUser->nickname,
                    'discord_token' => $discordUser->token,
                    'discord_refresh_token' => $discordUser->refreshToken,
                    'discord_avatar' => $discordUser->avatar,
                    'role' => 'user',
                ]);
            }

            Auth::login($user);
            
            ActivityService::log('authentication', 'logged in via discord');
            
            return redirect('/');
    }

    public function githubCallback()
    {
            $githubUser = Socialite::driver('github')->user();
            
            $user = User::where('github_id', $githubUser->id)
                       ->orWhere('email', $githubUser->email)
                       ->first();

            if ($user) {
                $user->update([
                    'github_id' => $githubUser->id,
                    'github_username' => $githubUser->nickname,
                    'github_token' => $githubUser->token,
                    'github_avatar' => $githubUser->avatar,
                    'name' => $githubUser->name ?? $githubUser->nickname,
                    'email' => $githubUser->email,
                ]);
            } else {
                $user = User::create([
                    'name' => $githubUser->name ?? $githubUser->nickname,
                    'email' => $githubUser->email,
                    'password' => bcrypt(Str::random(24)),
                    'github_id' => $githubUser->id,
                    'github_username' => $githubUser->nickname,
                    'github_token' => $githubUser->token,
                    'github_avatar' => $githubUser->avatar,
                    'role' => 'user',
                ]);
            }

            Auth::login($user);
            
            ActivityService::log('authentication', 'logged in via github');
            
            return redirect('/');
    }
} 