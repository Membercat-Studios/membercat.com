<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ErrorController extends Controller
{
    public function unauthorized()
    {
        return Inertia::render('Util/401');
    }

    public function forbidden()
    {
        return Inertia::render('Util/403');
    }

    public function notFound()
    {
        return Inertia::render('Util/404');
    }

    public function serverError()
    {
        return Inertia::render('Util/500');
    }
} 