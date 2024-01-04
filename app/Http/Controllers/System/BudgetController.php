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

        // Previous Period
        $prev_start = null;
        $prev_end = null;
        if($data->repetition === 'repeat' && in_array($data->interval, ['daily', 'weekly', 'monthly', 'yearly'])){
            $interval = match($data->interval){
                'daily' => 'days',
                'weekly' => 'weeks',
                'monthly' => 'months',
                'yearly' => 'years',

                default => 'days'
            };

            $prev_start = date('Y-m-d H:i:s', strtotime($data->start.' -1 '.$interval));
            $prev_end = date('Y-m-d H:i:s', strtotime($data->end.' -1 '.$interval));
        }
            
        return Inertia::render('System/Budget/Show', [
            'data' => new \App\Http\Resources\Budget\ShowResource($data),
            'previous_start' => $prev_start,
            'previous_end' => $prev_end,
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
