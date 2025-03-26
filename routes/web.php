<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\ProfilePhotoController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\Admin\AdminNewsController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Moderation\ModerationController;
use App\Http\Controllers\ReportController;
use App\Services\ActivityService;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
})->name('home');

Route::get('/projects', function () {
    return Inertia::render('Projects');
})->name('projects');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/news', [NewsController::class, 'index'])->name('news');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');

Route::get('/settings', function () {
    return Inertia::render('Settings');
})->name('settings');

Route::middleware('guest')->group(function () {
    Route::get('auth/discord/redirect', [SocialiteController::class, 'discordRedirect'])
        ->name('discord.redirect');
    Route::get('auth/discord/callback', [SocialiteController::class, 'discordCallback'])
        ->name('discord.callback');

    Route::get('auth/github/redirect', [SocialiteController::class, 'githubRedirect'])
        ->name('github.redirect');
    Route::get('auth/github/callback', [SocialiteController::class, 'githubCallback'])
        ->name('github.callback');
});

Route::middleware(['auth', 'can:manage-news'])->group(function () {
    Route::get('/admin/news', [AdminNewsController::class, 'index'])->name('admin.news.index');
    Route::get('/admin/news/create', [AdminNewsController::class, 'create'])->name('admin.news.create');
    Route::post('/admin/news', [AdminNewsController::class, 'store'])->name('admin.news.store');
    Route::get('/admin/news/{news}/edit', [AdminNewsController::class, 'edit'])->name('admin.news.edit');
    Route::put('/admin/news/{news}', [AdminNewsController::class, 'update'])->name('admin.news.update');
    Route::delete('/admin/news/{news}', [AdminNewsController::class, 'destroy'])->name('admin.news.destroy');
});

Route::get('/401', [ErrorController::class, 'unauthorized'])->name('error.401');
Route::get('/403', [ErrorController::class, 'forbidden'])->name('error.403');
Route::get('/404', [ErrorController::class, 'notFound'])->name('error.404');
Route::get('/500', [ErrorController::class, 'serverError'])->name('error.500');

Route::fallback(function () {
    return Inertia::render('Util/404')->toResponse(request())->setStatusCode(404);
});

Route::post('/log-activity', function (Request $request) {
    $validated = $request->validate([
        'type' => 'required|string',
        'action' => 'required|string',
        'target' => 'nullable|string',
        'target_id' => 'nullable|string',
    ]);
    
    ActivityService::log(
        $validated['type'],
        $validated['action'],
        $validated['target'] ?? null,
        $validated['target_id'] ?? null
    );
    
    return response()->json(['success' => true]);
})->name('log.activity');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/mod.php';
require __DIR__.'/modrinth.php';
require __DIR__.'/docs.php';