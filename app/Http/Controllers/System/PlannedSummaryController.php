<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PlannedSummaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $data = \App\Models\Wallet::where(\DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $period = null;
        if($request->has('period')){
            if(validateDateFormat($request->period, 'Y-m')){
                $period = $request->period.'-01';
            } else {
                return redirect()->route('sys.planned-payment.summary.show', $data->uuid);
            }
        }

        return Inertia::render('System/PlannedPayment/Summary/Show', [
            'wallet' => $data,
            'period' => $period
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
