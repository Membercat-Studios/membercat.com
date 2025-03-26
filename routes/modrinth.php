<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Modrinth\ProjectController;
use App\Http\Controllers\Modrinth\TeamController;

Route::prefix('api/modrinth')->group(function () {
    Route::get('/top-projects', [ProjectController::class, 'top3Projects'])->name('modrinth.top-projects');
    Route::get('/projects', [ProjectController::class, 'fetchProjects'])->name('modrinth.projects');
    Route::get('/project-count', [ProjectController::class, 'projectCount'])->name('modrinth.project-count');
    Route::get('/membercat-projects', [ProjectController::class, 'fetchMembercatProjects'])->name('modrinth.membercat-projects');
    Route::get('/team', [TeamController::class, 'fetchRawData'])->name('modrinth.team');
    Route::get('/team/members', [TeamController::class, 'fetchMembers'])->name('modrinth.team.members');
});
