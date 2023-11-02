<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

class RecordController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        return Inertia::render('System/Record/Index');
    }

    /**
     * Handle the incoming request.
     */
    public function show(Request $request)
    {
        return Inertia::render('System/Record/Show');
    }
}
