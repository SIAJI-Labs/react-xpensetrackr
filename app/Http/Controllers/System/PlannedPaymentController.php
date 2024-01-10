<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PlannedPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $type = 'list';
        if($request->has('type') && in_array($request->type, ['list', 'summary'])){
            $type = $request->type;
        }

        return Inertia::render('System/PlannedPayment/Index', [
            'type' => $type
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();
        $data = \App\Models\PlannedPayment::withTrashed()
            ->with('fromWallet.parent', 'toWallet.parent', 'category.parent', 'plannedPaymentTags')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        return Inertia::render('System/PlannedPayment/Show', [
            'data' => $data
        ]);
    }
}
