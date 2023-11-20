<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('System/Dashboard/Index', [
            'inspire' =>  \Illuminate\Foundation\Inspiring::quote()
        ]);
    }
}
