<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\JsonResponseTrait;

class RecordController extends Controller
{
    use JsonResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // sleep(10);

        $data = \App\Models\Record::query()
            ->with('category.parent', 'fromWallet.parent', 'toWallet.parent');

        // Apply Filter
        if($request->has('filter_status') && in_array($request->filter_status, ['pending', 'complete'])){
            $data->where('is_pending', $request->filter_status === 'pending');
        }

        // Apply ordering
        $sort_type = 'desc';
        if($request->has('sort') && in_array($request->sort, ['asc', 'desc'])){
            $sort_type = $request->sort;
        }
        if($request->has('sort_by') && in_array($request->sort_by, [])){
            $data->orderBy($request->sort_by, $sort_type);
        } else {
            $data->orderBy('datetime', $sort_type);
        }

        // Pagination
        $perPage = 5;
        if($request->has('per_page') && is_numeric($request->per_page)){
            $perPage = $request->per_page;
        }
        if($request->has('paginate') && in_array($request->paginate, ['true', '1'])){
            // Fetch data
            $data = $data->simplePaginate($perPage);
        } else {
            if($request->has('limit') && is_numeric($request->limit)){
                // Apply limit (only if there's no paginate)
                $data = $data->limit($request->limit);
            }

            // Fetch Data
            $data = [
                'data' => $data->get()
            ];
        }


        return $this->formatedJsonResponse(200, 'Data Fetched', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // sleep(10);
        
        $request->validate([
            'type' => ['required', 'string', 'in:expense,transfer,income'],
            'category' => ['nullable', 'string', 'exists:'.(new \App\Models\Category())->getTable().',uuid'],
            'from_wallet' => ['required', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'to_wallet' => ['nullable', 'required_if:type,transfer', 'different:from_wallet', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'amount' => ['required', 'numeric'],
            'extra_amount' => ['nullable', 'numeric'],
            'extra_type' => ['nullable', 'string', 'in:amount,percentage'],
            'date' => ['required', 'string'],
            'hours' => ['required', 'numeric', 'between:0,23'],
            'minutes' => ['required', 'numeric', 'between:0,59'],
            'notes' => ['required', 'string']
        ]);

        \DB::transaction(function () use ($request) {
            $date = date('Y-m-d', strtotime($request->date));
            $time = date('H:i', strtotime($request->hours.':'.$request->minutes));
            $timestamp = date('Y-m-d H:i:00', strtotime($date.' '.$time));
            // Fetch Timezone
            $timezone = $request->timezone;
            // Convert timestamp with related timezone to UTC
            $formated = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, $timezone);
            $utc = $formated->setTimezone('UTC')->format('Y-m-d H:i:s');

            // Store to database
        });

        // \Log::debug("Debug on Record API Controller", [
        //     'request' => $request->all()
        // ]);

        return $this->formatedJsonResponse(200, 'Data Stored', []);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
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

    /**
     * Fetch Pending Count
     */
    public function countPending(Request $request)
    {
        // sleep(10);
        
        $pending = \App\Models\Record::where('is_pending', true)
            ->count();
            
        return $this->formatedJsonResponse(200, 'Data Fetched', [
            'data' => $pending
        ]);
    }
}
