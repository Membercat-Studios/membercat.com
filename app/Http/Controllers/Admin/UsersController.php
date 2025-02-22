<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::query()
                ->select('id', 'name', 'email', 'role', 'email_verified_at', 'created_at')
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'verified' => !is_null($user->email_verified_at),
                    'created_at' => $user->created_at->diffForHumans(),
                ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|in:admin,mod,user',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('admin.users')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
                'public_profile' => $user->public_profile,
            ],
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|string|in:admin,mod,user',
            'password' => $request->password ? ['confirmed', Rules\Password::defaults()] : '',
            'status' => 'required|string|in:online,idle,do not disturb,offline',
            'public_profile' => 'boolean',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->status = $request->status;
        $user->public_profile = $request->public_profile;

        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return back()->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        // Prevent deleting self or other admins
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users')->with('error', 'You cannot delete your own account.');
        }

        if ($user->isAdmin()) {
            return redirect()->route('admin.users')->with('error', 'Administrator accounts cannot be deleted.');
        }

        $user->delete();
        return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
    }
} 