<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller
{
    use JsonResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $data = \App\Models\Budget::query()
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
                'data' => \App\Http\Resources\Budget\ListResource::collection($data->get()),
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
            'name' => ['required', 'string'],
            'limit' => ['required', 'string', 'min:1'],
            'occurence' => ['required', 'string', 'in:recurring,once'],
            'interval' => ['required', 'string', 'in:daily,weekly,monthly,yearly'],
            'from_period' => ['nullable', 'required_if:occurence,once', 'before_or_equal:until_period'],
            'until_period' => ['nullable', 'required_if:occurence,once', 'after_or_equal:from_period'],
            'notes' => ['nullable', 'string'],
            'category.*' => ['nullable', 'string', 'exists:'.(new \App\Models\Category())->getTable().',uuid'],
            'wallet.*' => ['nullable', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'tags.*' => ['nullable', 'string', 'exists:'.(new \App\Models\Tags())->getTable().',uuid'],
        ]);

        // Store to database
        DB::transaction(function () use ($request) {
            $user = $request->user();
            $data = new \App\Models\Budget();

            // Group Item
            $items = [];
            if(!empty($request->category)){
                $items['category'] = \App\Models\Category::where('user_id', $user->id)
                    ->whereIn(DB::raw('BINARY `uuid`'), $request->category)
                    ->pluck('id')
                    ->toArray();
            }
            if(!empty($request->wallet)){
                $items['wallet'] = \App\Models\Wallet::where('user_id', $user->id)
                    ->whereIn(DB::raw('BINARY `uuid`'), $request->wallet)
                    ->pluck('id')
                    ->toArray();
            }
            if(!empty($request->tags)){
                $items['tags'] = \App\Models\Tags::where('user_id', $user->id)
                    ->whereIn(DB::raw('BINARY `uuid`'), $request->tags)
                    ->pluck('id')
                    ->toArray();
            }

            // Override Amount if not valid
            if($request->limit === '' || empty($request->limit) || $request->limit === null){
                $request->merge([
                    'limit' => 0
                ]);
            }

            // Fill model attribute
            $data->user_id = $user->id;
            $data->name = $request->name;
            $data->description = $request->notes;
            $data->amount = $request->limit;
            $data->repetition = $request->occurence === 'recurring' ? 'repeat' : 'once';
            $data->interval = $request->occurence === 'recurring' ? $request->interval : null;
            $data->start = $request->occurence === 'once' ? $request->from_period : null;
            $data->end = $request->occurence === 'once' ? $request->until_period : null;
            $data->save();

            if(isset($items) && is_array($items)){
                // Category
                if(isset($items['category']) && is_array($items['category'])){
                    $data->budgetCategory()->sync($items['category']);
                }
                // Wallet
                if(isset($items['wallet']) && is_array($items['wallet'])){
                    $data->budgetWallet()->sync($items['wallet']);
                }
                // Category
                if(isset($items['tags']) && is_array($items['tags'])){
                    $data->budgetTags()->sync($items['tags']);
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

        $data = \App\Models\Budget::with('budgetCategory.parent', 'budgetWallet.parent', 'budgetTags')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        return $this->formatedJsonResponse(200, 'Data Fetched', [
            'data' => new \App\Http\Resources\Budget\ShowResource($data)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'limit' => ['required', 'string', 'min:1'],
            'occurence' => ['required', 'string', 'in:recurring,once'],
            'interval' => ['required', 'string', 'in:daily,weekly,monthly,yearly'],
            'from_period' => ['nullable', 'required_if:occurence,once', 'before_or_equal:until_period'],
            'until_period' => ['nullable', 'required_if:occurence,once', 'after_or_equal:from_period'],
            'notes' => ['nullable', 'string'],
            'category.*' => ['nullable', 'string', 'exists:'.(new \App\Models\Category())->getTable().',uuid'],
            'wallet.*' => ['nullable', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'tags.*' => ['nullable', 'string', 'exists:'.(new \App\Models\Tags())->getTable().',uuid'],
        ]);

        // Store to database
        DB::transaction(function () use ($request, $id) {
            $user = $request->user();
            $data = \App\Models\Budget::where('user_id', $user->id)
                ->where(DB::raw('BINARY `uuid`'), $id)
                ->firstOrFail();

            // Group Item
            $items = [];
            $items['category'] = [];
            $items['wallet'] = [];
            $items['tags'] = [];
            if(!empty($request->category)){
                $items['category'] = \App\Models\Category::where('user_id', $user->id)
                    ->whereIn(DB::raw('BINARY `uuid`'), $request->category)
                    ->pluck('id')
                    ->toArray();
            }
            if(!empty($request->wallet)){
                $items['wallet'] = \App\Models\Wallet::where('user_id', $user->id)
                    ->whereIn(DB::raw('BINARY `uuid`'), $request->wallet)
                    ->pluck('id')
                    ->toArray();
            }
            if(!empty($request->tags)){
                $items['tags'] = \App\Models\Tags::where('user_id', $user->id)
                    ->whereIn(DB::raw('BINARY `uuid`'), $request->tags)
                    ->pluck('id')
                    ->toArray();
            }

            // Override Amount if not valid
            if($request->limit === '' || empty($request->limit) || $request->limit === null){
                $request->merge([
                    'limit' => 0
                ]);
            }

            // Fill model attribute
            $data->user_id = $user->id;
            $data->name = $request->name;
            $data->description = $request->notes;
            $data->amount = $request->limit;
            $data->repetition = $request->occurence === 'recurring' ? 'repeat' : 'once';
            $data->interval = $request->occurence === 'recurring' ? $request->interval : null;
            $data->start = $request->occurence === 'once' ? $request->from_period : null;
            $data->end = $request->occurence === 'once' ? $request->until_period : null;
            $data->save();

            if(isset($items) && is_array($items)){
                // Category
                if(isset($items['category']) && is_array($items['category'])){
                    $data->budgetCategory()->sync($items['category']);
                }
                // Wallet
                if(isset($items['wallet']) && is_array($items['wallet'])){
                    $data->budgetWallet()->sync($items['wallet']);
                }
                // Category
                if(isset($items['tags']) && is_array($items['tags'])){
                    $data->budgetTags()->sync($items['tags']);
                }
            }
        });

        return $this->formatedJsonResponse(200, 'Data Updated', []);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        $data = \App\Models\Budget::where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        DB::transaction(function () use ($request, $data) {
            // Remove data
            $data->budgetCategory()->sync([]);
            $data->budgetWallet()->sync([]);
            $data->budgetTags()->sync([]);
            $data->delete();
        });

        return $this->formatedJsonResponse(200, 'Data Deleted', []);
    }
}
