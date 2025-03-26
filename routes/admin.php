<?php

use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\AdminNewsController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;
use Inertia\Inertia;
use App\Http\Controllers\Admin\NewsCategoryController;
use App\Http\Controllers\Admin\ActivityController;

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
    Route::post('/users/{user}/make-admin', [UsersController::class, 'makeAdmin'])->name('admin.users.make-admin');
    Route::post('/users/{user}/remove-admin', [UsersController::class, 'removeAdmin'])->name('admin.users.remove-admin');
    Route::get('/users/user-count', [UsersController::class, 'getUserCount'])->name('admin.users.user-count');
    
    Route::get('/news', [AdminNewsController::class, 'index'])->name('admin.news.index');
    Route::get('/news/create', [AdminNewsController::class, 'create'])->name('admin.news.create');
    Route::post('/news', [AdminNewsController::class, 'store'])->name('admin.news.store');
    Route::get('/news/{news}/edit', [AdminNewsController::class, 'edit'])->name('admin.news.edit');
    Route::put('/news/{news}', [AdminNewsController::class, 'update'])->name('admin.news.update');
    Route::delete('/news/{news}', [AdminNewsController::class, 'destroy'])->name('admin.news.destroy');

    Route::post('/news/categories', [NewsCategoryController::class, 'store'])->name('admin.news.categories.store');
    Route::put('/news/categories/{category}', [NewsCategoryController::class, 'update'])->name('admin.news.categories.update');
    Route::delete('/news/categories/{category}', [NewsCategoryController::class, 'destroy'])->name('admin.news.categories.destroy');

    Route::get('/activity/recent', [ActivityController::class, 'recent'])->name('admin.activity.recent');
});




