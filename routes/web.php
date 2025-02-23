<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\SocialiteController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile/edit/information', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile/edit/security', [ProfileController::class, 'security'])->name('profile.security');
    Route::get('/profile/edit/privacy', [ProfileController::class, 'privacy'])->name('profile.privacy');
    Route::get('/profile/edit/preferences', [ProfileController::class, 'preferences'])->name('profile.preferences');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/projects', function () {
    return Inertia::render('Projects');
})->name('projects');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/news', function () {
    return Inertia::render('News');
})->name('news');

Route::get('/settings', function () {
    return Inertia::render('Settings');
})->name('settings');

Route::middleware('guest')->group(function () {
    // discord auth
    Route::get('auth/discord/redirect', [SocialiteController::class, 'discordRedirect'])
        ->name('discord.redirect');
    Route::get('auth/discord/callback', [SocialiteController::class, 'discordCallback'])
        ->name('discord.callback');

    // github auth
    Route::get('auth/github/redirect', [SocialiteController::class, 'githubRedirect'])
        ->name('github.redirect');
    Route::get('auth/github/callback', [SocialiteController::class, 'githubCallback'])
        ->name('github.callback');
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/mod.php';