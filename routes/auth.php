<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\SocialiteController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::get('auth/discord/redirect', [SocialiteController::class, 'discordRedirect'])
        ->name('discord.redirect');
    Route::get('auth/discord/callback', [SocialiteController::class, 'discordCallback'])
        ->name('discord.callback');

    Route::get('auth/github/redirect', [SocialiteController::class, 'githubRedirect'])
        ->name('github.redirect');
    Route::get('auth/github/callback', [SocialiteController::class, 'githubCallback'])
        ->name('github.callback');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
