<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DocsController;
use Illuminate\Support\Facades\Gate;

Route::prefix('docs')->group(function () {
    Route::get('/', function () {
        if (auth()->user()->role !== 'admin') {
            return Inertia::render('Util/403')->toResponse(request())->setStatusCode(403);
        }
        return app(DocsController::class)->index();
    })->name('docs.index');

    Route::get('/{path}', function ($path) {
        if (auth()->user()->role !== 'admin') {
            return Inertia::render('Util/403')->toResponse(request())->setStatusCode(403);
        }
        return app(DocsController::class)->show($path);
    })->where('path', '.*')->name('docs.show');
});
