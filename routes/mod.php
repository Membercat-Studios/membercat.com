<?php

use App\Http\Controllers\Mod\UsersController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\ModMiddleware;
use Inertia\Inertia;

Route::prefix('mod')->middleware([ModMiddleware::class])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Mod/Dashboard');
    })->name('mod.dashboard');
});
