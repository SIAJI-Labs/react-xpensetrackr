<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\JsonResponseTrait;
use Illuminate\Support\Facades\DB;

class WalletController extends Controller
{
    use JsonResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $data = \App\Models\Wallet::query()
            ->with('parent', 'child')
            ->where('user_id', $user->id);

        // Apply Filter
        if($request->has('keyword') && $request->keyword != ''){
            // Check if explode is array
            $explode = explode('-', $request->keyword);

            if(is_array($explode) && count($explode) > 1){
                // Search is array, fetch parent name
                $parent = rtrim($explode[0]);

                // fetch child name
                array_shift($explode);
                // remove whitespace from start of the string
                $child = ltrim(implode('', $explode));

                // Apply search
                $parent = \App\Models\Wallet::where(DB::raw('LOWER(name)'), 'like', '%'.strtolower($parent).'%')
                    ->whereNull('parent_id')
                    ->pluck('id')
                    ->toArray();

                $data = $data->where(function($q) use ($child, $parent){
                    return $q->where(DB::raw('LOWER(name)'), 'like', '%'.strtolower($child).'%')
                        ->whereIn('parent_id', $parent);
                    });
            } else {
                // Search on Parent
                $parent = \App\Models\Wallet::where(DB::raw('LOWER(name)'), 'like', '%'.strtolower($request->keyword).'%')
                    ->whereNull('parent_id')
                    ->pluck('id')
                    ->toArray();
    
                $data = $data->where(function($q) use ($parent, $request){
                    return $q->where(DB::raw('LOWER(name)'), 'like', '%'.strtolower($request->keyword).'%')
                        ->orWhereIn('parent_id', $parent);
                    });
            }
        }
        if($request->has('only_parent') && ($request->only_parent || $request->only_parent == 'true')){
            $data->whereNull('parent_id');
        }

        // Apply ordering
        $sort_type = 'asc';
        if($request->has('sort') && in_array($request->sort, ['asc', 'desc'])){
            $sort_type = $request->sort;
        }
        if($request->has('sort_by') && in_array($request->sort_by, ['name', 'order_main'])){
            // Validate allowed column to use in order
            $data->orderBy($request->sort_by, $sort_type);
        } else {
            // Default ordering column
            $data->orderBy('order_main', $sort_type);
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
                'data' => \App\Http\Resources\Wallet\ListResource::collection($data->get()),
                'has_more' => $hasMore,
                'total' => isset($raw) ? $raw->count() : null
            ];
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', $data);
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
        $request->validate([
            'parent_id' => ['nullable', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'name' => ['required', 'string', 'max:191']
        ]);

        DB::transaction(function () use ($request) {
            $user = $request->user();
            $parent_id = null;
            if($request->has('parent_id') && !empty($request->parent_id)){
                $parent = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $request->parent_id)
                    ->where('user_id', $user->id)
                    ->firstOrFail();

                $parent_id = $parent->id;
            }

            $data = new \App\Models\Wallet();
            $data->user_id = $request->user()->id;
            $data->parent_id = $parent_id;
            $data->name = $request->name;
            $data->starting_balance = $request->starting_balance ?? 0;
            $data->save();
        });

        return $this->formatedJsonResponse(200, 'Data Stored', []);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();

        $data = \App\Models\Wallet::with('parent')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        return $this->formatedJsonResponse(200, 'Data Fetched', [
            'data' => new \App\Http\Resources\Wallet\ShowResource($data)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'parent_id' => ['nullable', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'name' => ['required', 'string', 'max:191']
        ]);

        $user = $request->user();
        $data = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Validate can't use self as parent data
        if($request->has('parent_id') && $request->parent_id === $data->uuid){
            throw \Illuminate\Validation\ValidationException::withMessages([
                'parent_id' => 'Unable to assign parent wallet: Self-assignment is not permitted'
            ]);
        }

        DB::transaction(function () use ($request, $user, $data) {
            
            $parent_id = $data->parent_id;
            if($request->has('parent_id') && !empty($request->parent_id)){
                $parent = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $request->parent_id)
                    ->where('user_id', $user->id)
                    ->firstOrFail();

                $parent_id = $parent->id;
            } else {
                $parent_id = null;
            }

            $data->parent_id = $parent_id;
            $data->name = $request->name;
            $data->starting_balance = $request->starting_balance ?? 0;
            $data->save();
        });

        return $this->formatedJsonResponse(200, 'Data Updated', []);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        $data = \App\Models\Wallet::with('parent')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        DB::transaction(function () use ($request, $data) {
            // Remove data
            $data->delete();
        });

        return $this->formatedJsonResponse(200, 'Data Deleted', []);
    }

    /**
     * Re-Order
     */
    public function reOrder(Request $request)
    {
        DB::transaction(function () use ($request) {
            $user = $request->user();
            $order = json_decode($request->hierarchy, true);

            $numorder = 0;
            $numorderMain = 0;
            foreach ($order as $hierarchy) {
                // Update Main Order
                $wallet = \App\Models\Wallet::where('user_id', $user->id)
                    ->where(DB::raw('BINARY `uuid`'), $hierarchy['id'])
                    ->firstOrFail();
                $wallet->order = $numorder;
                $wallet->order_main = $numorderMain;
                if (!empty($wallet->parent_id)) {
                    $wallet->parent_id = null;
                }
                $wallet->save();
    
                // Request has Child Wallet
                if (isset($hierarchy['child']) && is_array($hierarchy['child']) && count($hierarchy['child']) > 0) {
                    $childOrder = 0;
                    foreach ($hierarchy['child'] as $child) {
                        $numorderMain++;
    
                        // Update Child Order
                        $subwallet = \App\Models\Wallet::where('user_id', $user->id)
                            ->where(DB::raw('BINARY `uuid`'), $child['id'])
                            ->firstOrFail();
                        $subwallet->order = $childOrder;
                        $subwallet->order_main = $numorderMain;
                        $subwallet->parent_id = $wallet->id;
                        $subwallet->save();
    
                        $childOrder++;
                    }
                }
    
                $numorderMain++;
                $numorder++;
            }
        });

        return $this->formatedJsonResponse(200, 'Data Updated', []);
    }
}
