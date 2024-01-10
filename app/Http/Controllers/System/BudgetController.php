<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('System/Budget/Index');
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
        $user = $request->user();
        $data = \App\Models\Budget::with('budgetCategory.parent', 'budgetWallet.parent', 'budgetTags')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Handle Period
        $original['start'] = $data->start;
        $original['end'] = $data->end;
        $previous['start'] = $original['start'];
        $previous['end'] = $original['end'];
        $previous['range'] = 0;
        if($request->has('previous') && !empty($request->previous) && is_numeric($request->previous) && $data->repetition === 'repeat'){
            $previous['range'] = $request->previous;
            $interval = match($data->interval){
                'weekly' => 'weeks',
                'monthly' => 'months',
                'yearly' => 'years',
                default => 'days'
            };

            $previous['start'] = date('Y-m-d H:i:s', strtotime($original['start'].' -'.$previous['range'].' '.$interval));
            $previous['end'] = date('Y-m-d H:i:s', strtotime($original['end'].' -'.$previous['range'].' '.$interval));
        }
            
        // Calculate usage based on period
        $used = $data->getUsedAmount($previous['start'], $previous['end']);
        $remaining = $data->getRemainingAmount($previous['start'], $previous['end']);
        // Handle usage data
        $usage['limit'] = $data->amount;
        $usage['used'] = $used;
        $usage['remaining'] = $remaining;

        return Inertia::render('System/Budget/Show', [
            'data' => new \App\Http\Resources\Budget\ShowResource($data),

            'original_start' => $original['start'],
            'original_end' => $original['end'],
            'previous_start' => $previous['start'],
            'previous_end' => $previous['end'],
            'range' => $previous['range'],

            'usage_limit' => $usage['limit'],
            'usage_used' => $usage['used'],
            'usage_remaining' => $usage['remaining'],
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
