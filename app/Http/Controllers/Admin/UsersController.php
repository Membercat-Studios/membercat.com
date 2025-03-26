<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Services\ActivityService;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::query()
                ->select(
                    'id',
                    'name',
                    'email',
                    'role',
                    'created_at',
                    'discord_id',
                    'discord_username',
                    'github_id',
                    'github_username'
                )
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'discord_id' => $user->discord_id,
                    'discord_username' => $user->discord_username,
                    'github_id' => $user->github_id,
                    'github_username' => $user->github_username,
                    'created_at' => $user->created_at->diffForHumans(),
                ]),
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users')->with('error', 'You cannot delete your own account.');
        }

        if ($user->isAdmin()) {
            return redirect()->route('admin.users')->with('error', 'Administrator accounts cannot be deleted.');
        }

        $user->delete();
        return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
    }

    public function makeAdmin(User $user)
    {
        if ($user->isAdmin()) {
            return redirect()->route('admin.users')->with('error', 'User is already an admin.');
        }

        $user->role = User::ROLE_ADMIN;
        $user->save();

        ActivityService::log(
            'admin_action',
            'made user an admin',
            $user->name,
            $user->id
        );

        return redirect()->route('admin.users')->with('success', 'User has been made an admin.');
    }

    public function removeAdmin(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users')->with('error', 'You cannot remove your own admin privileges.');
        }

        if (!$user->isAdmin()) {
            return redirect()->route('admin.users')->with('error', 'User is not an admin.');
        }

        $user->role = User::ROLE_USER;
        $user->save();

        ActivityService::log(
            'admin_action',
            'removed admin privileges from',
            $user->name,
            $user->id
        );

        return redirect()->route('admin.users')->with('success', 'Admin privileges removed successfully.');
    }

    public function getUserCount()
    {
        return User::count();
    }
} 