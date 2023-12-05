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

        $data->balance = $data->getBalance();
        if($data->walletGroupItem()->exists()){
            $data->walletGroupItem->map(function($data){
                $data->balance = $data->getBalance();
                
                return $data;
            });
        }

        return Inertia::render('System/WalletGroup/Show', [
            'data' => $data
        ]);
    }
}
