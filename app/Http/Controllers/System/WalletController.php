<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('System/Wallet/Index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();
        $data = \App\Models\Wallet::withTrashed()
            ->with('parent', 'child')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $data->balance = $data->getBalance();
        $data->children = [];

        // Manipulate child data
        if($data->child()->exists()){
            $data->children = $data->child()->get()->map(function($data){
                $data->balance = $data->getBalance();
                return $data;
            });
        }

        return Inertia::render('System/Wallet/Show', [
            'data' => $data,
            'related' => $data->children
        ]);
    }
}
