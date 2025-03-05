<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DocsController;

Route::prefix('docs')->group(function () {
    Route::get('/', [DocsController::class, 'index'])->name('docs.index');
    Route::get('/{section}/{page?}', [DocsController::class, 'show'])->name('docs.show');
});
