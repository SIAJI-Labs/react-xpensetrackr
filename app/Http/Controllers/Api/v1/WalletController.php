<?php

namespace App\Http\Controllers\Api\v1;

// use Inertia\Inertia;

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
        // sleep(10);
        $user = $request->user();

        $data = \App\Models\Wallet::query()
            ->with('parent')
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

        // Apply ordering
        $sort_type = 'asc';
        if($request->has('sort') && in_array($request->sort, ['asc', 'desc'])){
            $sort_type = $request->sort;
        }
        if($request->has('sort_by') && in_array($request->sort_by, ['name', 'order_main'])){
            $data->orderBy($request->sort_by, $sort_type);
        } else {
            $data->orderBy('order_main', $sort_type);
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
                'data' => $data->get()->map(function($data){
                    $data->balance = $data->getBalance();
                    
                    return $data;
                })
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
            $data->parent_id = $parent_id;
            $data->name = $request->name;
            $data->save();
        });

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
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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

        DB::transaction(function () use ($request, $id) {
            $user = $request->user();
            
            $data = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $id)
                ->where('user_id', $user->id)
                ->firstOrFail();
            $parent_id = $data->parent_id;
            if($request->has('parent_id') && !empty($request->parent_id)){
                $parent = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $request->parent_id)
                    ->where('user_id', $user->id)
                    ->firstOrFail();

                $parent_id = $parent->id;
            }

            $data->parent_id = $parent_id;
            $data->name = $request->name;
            $data->save();
        });

        return $this->formatedJsonResponse(200, 'Data Stored', []);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
