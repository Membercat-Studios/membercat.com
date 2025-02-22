<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;


class ProductsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Products');
    }
}
