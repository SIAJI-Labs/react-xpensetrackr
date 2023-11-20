<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        return Inertia::render('System/Record/Index');
    }

    /**
     * Handle the incoming request.
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        $related = null;

        $data = \App\Models\Record::with('category.parent', 'fromWallet.parent', 'toWallet.parent', 'plannedPaymentRecord.plannedPayment')
            ->withTrashed()
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if($data->trashed()){
            return redirect()->route('sys.record.index');
        }

        // Check related
        if($data->toWallet()->exists() && !empty($data->getRelated())){
            $related = $data->getRelated();
            $related->load('category.parent', 'fromWallet.parent', 'toWallet.parent');
        }

        return Inertia::render('System/Record/Show', [
            'record' => $data,
            'related' => $related
        ]);
    }
}
