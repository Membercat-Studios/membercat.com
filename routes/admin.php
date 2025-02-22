<?php

use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;
use Inertia\Inertia;

Route::prefix('admin')->middleware(['web', 'auth', AdminMiddleware::class])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
   
    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');
    
    Route::get('/users', [UsersController::class, 'index'])->name('admin.users');
    Route::get('/users/create', [UsersController::class, 'create'])->name('admin.users.create');
    Route::post('/users', [UsersController::class, 'store'])->name('admin.users.store');
    Route::get('/users/{user}/edit', [UsersController::class, 'edit'])->name('admin.users.edit');
    Route::put('/users/{user}', [UsersController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{user}', [UsersController::class, 'destroy'])->name('admin.users.destroy');
});

Route::prefix('mod')->middleware([ModMiddleware::class])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Mod/Dashboard');
    })->name('mod.dashboard');
});


