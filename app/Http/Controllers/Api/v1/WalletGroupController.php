<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\JsonResponseTrait;
use Illuminate\Support\Facades\DB;

class WalletGroupController extends Controller
{
    use JsonResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $data = \App\Models\WalletGroup::query()
            ->with('walletGroupItem.parent')
            ->where('user_id', $user->id);

        // Apply Filter
        if($request->has('keyword') && $request->keyword != ''){
            $data->where(DB::raw('LOWER(name)'), 'like', '%'.strtolower($request->keyword).'%');
        }

        // Apply ordering
        $sort_type = 'asc';
        if($request->has('sort') && in_array($request->sort, ['asc', 'desc'])){
            $sort_type = $request->sort;
        }
        if($request->has('sort_by') && in_array($request->sort_by, ['name'])){
            // Validate allowed column to use in order
            $data->orderBy($request->sort_by, $sort_type);
        } else {
            // Default ordering column
            $data->orderBy('name', $sort_type);
        }

        // Pagination
        $perPage = 5;
        $hasMore = false;
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
                // 'data' => $data->get()->map(function($data){
                //     $data->balance = $data->getBalance();
                    
                //     return $data;
                // }),
                'data' => \App\Http\Resources\WalletGroup\ListResource::collection($data->get()),
                'has_more' => $hasMore,
                'total' => isset($raw) ? $raw->count() : null
            ];
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'wallet.*' => ['required', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid']
        ]);

        DB::transaction(function () use ($request) {
            $user = $request->user();

            $data = new \App\Models\WalletGroup([
                'user_id' => $user->id,
                'name' => $request->name
            ]);
            $data->save();

            // Handle wallet
            if($request->has('wallet') && is_array($request->wallet)){
                $wallet = \App\Models\Wallet::where('user_id', $user->id)
                    ->whereIn(DB::raw('BINARY `uuid`'), $request->wallet)
                    ->pluck('id')
                    ->toArray();

                if(!empty($wallet)){
                    // Wallet Group Item
                    $data->walletGroupItem()->sync($wallet);
                }
            }
        });

        return $this->formatedJsonResponse(200, 'Data Stored', []);
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

        return $this->formatedJsonResponse(200, 'Data Fetched', [
            'data' => new \App\Http\Resources\WalletGroup\ShowResource($data)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'wallet.*' => ['required', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid']
        ]);

        DB::transaction(function () use ($request, $id) {
            $user = $request->user();

            $data = \App\Models\WalletGroup::where(DB::raw('BINARY `uuid`'), $id)
                ->where('user_id', $user->id)
                ->firstOrFail();
            $data->name = $request->name;
            $data->save();

            // Handle wallet
            $group = [];
            if($request->has('wallet') && is_array($request->wallet)){
                $wallet = \App\Models\Wallet::where('user_id', $user->id)
                    ->whereIn(DB::raw('BINARY `uuid`'), $request->wallet)
                    ->pluck('id')
                    ->toArray();

                if(!empty($wallet)){
                    // Wallet Group Item
                    $group = $wallet;
                }
            }

            $data->walletGroupItem()->sync($group);
        });

        return $this->formatedJsonResponse(200, 'Data Stored', []);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        $data = \App\Models\WalletGroup::where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        DB::transaction(function () use ($request, $data) {
            // $data->walletGroupItem()->delete();
            // Remove data
            $data->delete();
        });

        return $this->formatedJsonResponse(200, 'Data Deleted', []);
    }
}
