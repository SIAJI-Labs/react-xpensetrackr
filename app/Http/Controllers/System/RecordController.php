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
        $type = 'complete';
        if($request->has('type') && in_array($request->type, ['complete', 'pending'])){
            $type = $request->type;
        }

        return Inertia::render('System/Record/Index', [
            'type' => $type
        ]);
    }

    /**
     * Handle the incoming request.
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        $related = null;

        $data = \App\Models\Record::with('category.parent', 'fromWallet.parent', 'toWallet.parent', 'plannedPaymentRecord.plannedPayment', 'recordTags')
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
            'record' => new \App\Http\Resources\Record\ShowResource($data),
            'related' => !empty($related) ? (new \App\Http\Resources\Record\ShowResource($related)) : null,
        ]);
    }
}
