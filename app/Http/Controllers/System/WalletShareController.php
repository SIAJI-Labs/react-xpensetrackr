<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WalletShareController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('System/WalletShare/Index');
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
        $data = \App\Models\WalletShare::with('walletShareItem')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        return Inertia::render('System/WalletShare/Show', [
            'data' => new \App\Http\Resources\WalletShare\ShowResource($data)
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
