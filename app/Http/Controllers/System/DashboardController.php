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
        $quote = \App\Models\Inspiration::orderBy('created_at', 'desc')
            ->first();
        if(!empty($quote)){
            $quote = '"'.$quote->quotes.'" — '.$quote->author;
        } else {
            $quote = \Illuminate\Foundation\Inspiring::quote();
        }

        return Inertia::render('System/Dashboard/Index', [
            'inspire' =>  $quote
        ]);
    }
}
