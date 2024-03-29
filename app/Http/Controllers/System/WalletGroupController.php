<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WalletGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('System/WalletGroup/Index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();
        $data = \App\Models\WalletGroup::with('walletGroupItem')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        return Inertia::render('System/WalletGroup/Show', [
            'data' => new \App\Http\Resources\WalletGroup\ListResource($data),
        ]);
    }
}
