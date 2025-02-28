<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Modrinth\ProjectController;

Route::prefix('api/modrinth')->group(function () {
    Route::get('/top-projects', [ProjectController::class, 'top3Projects'])->name('modrinth.top-projects');
    Route::get('/projects', [ProjectController::class, 'fetchProjects'])->name('modrinth.projects');
    Route::get('/membercat-projects', [ProjectController::class, 'fetchMembercatProjects'])->name('modrinth.membercat-projects');
});
