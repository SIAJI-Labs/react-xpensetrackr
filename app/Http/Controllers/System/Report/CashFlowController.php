<?php

namespace App\Http\Controllers\System\Report;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CashFlowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('System/Report/CashFlow/Index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        // Validate Period
        if(!validateDateFormat($id, 'Y-m')){
            return to_route('sys.report.cash-flow.index');
        }

        return Inertia::render('System/Report/CashFlow/Show', [
            'period' => $id
        ]);
    }
}
