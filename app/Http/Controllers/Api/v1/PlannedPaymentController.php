<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\JsonResponseTrait;

class PlannedPaymentController extends Controller
{
    use JsonResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $data = \App\Models\PlannedPayment::query()
            ->with('category.parent', 'fromWallet.parent', 'toWallet.parent')
            ->where('user_id', $user->id);

        // Apply Filter
        if($request->has('keyword') && !empty($request->keyword)){
            $data->where('name', 'like', '%'.$request->keyword.'%');
        }

        // Apply ordering
        $sort_type = 'desc';
        if($request->has('sort') && in_array($request->sort, ['asc', 'desc'])){
            $sort_type = $request->sort;
        }
        if($request->has('sort_by') && in_array($request->sort_by, [])){
            $data->orderBy($request->sort_by, $sort_type);
        } else {
            $data->orderBy('date_start', $sort_type);
        }

        // Pagination
        $hasMore = false;
        $perPage = 5;
        if($request->has('per_page') && is_numeric($request->per_page)){
            $perPage = $request->per_page;
        }
        if($request->has('paginate') && in_array($request->paginate, ['true', '1'])){
            // Fetch data
            $data = $data->simplePaginate($perPage);
        } else {
            if($request->has('limit') && is_numeric($request->limit)){
                $raw = (clone $data);

                // Apply limit (only if there's no paginate)
                $data = $data->limit($request->limit);

                if($data->get()->count() < $raw->count()){
                    $hasMore = true;
                }
            }

            // Fetch Data
            $data = [
                'data' => $data->get(),
                'has_more' => $hasMore
            ];
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', $data);
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
        // Pagination
        $hasMore = false;
        $perPage = 5;
        if($request->has('per_page') && is_numeric($request->per_page)){
            $perPage = $request->per_page;
        }

        $data = \App\Models\PlannedPayment::query()
            ->with('category.parent', 'fromWallet.parent', 'toWallet.parent')
            ->where(\DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();
        // Fetch Record
        $record = $data->plannedPaymentRecord();
        if($request->has('limit') && is_numeric($request->limit)){
            $raw = (clone $record);

            // Apply limit (only if there's no paginate)
            $record = $record->limit($request->limit);

            if($record->get()->count() < $raw->count()){
                $hasMore = true;
            }
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', [
            'data' => $data,
            'record' => [
                'data' => $record->get()->load('record', 'record.fromWallet.parent', 'record.toWallet.parent', 'record.category.parent'),
                'has_more' => $hasMore
            ]
        ]);
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
