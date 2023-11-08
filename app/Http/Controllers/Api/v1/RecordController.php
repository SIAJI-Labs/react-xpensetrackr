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
        $user = $request->user();

        $data = \App\Models\Record::query()
            ->with('category.parent', 'fromWallet.parent', 'toWallet.parent')
            ->where('user_id', $user->id);

        // Apply Filter
        if($request->has('filter_status') && in_array($request->filter_status, ['pending', 'complete'])){
            $data->where('is_pending', $request->filter_status === 'pending');
        }
        if($request->has('keyword') && !empty($request->keyword)){
            $data->where('note', 'like', '%'.$request->keyword.'%');
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
            'notes' => ['nullable', 'string']
        ]);

        // Store to database
        \DB::transaction(function () use ($request) {
            $user = $request->user();
            $data = new \App\Models\Record();

            // Handle Timestamp
            $date = date('Y-m-d', strtotime($request->date));
            $seconds = date('s', strtotime($request->date));
            $time = date('H:i:s', strtotime($request->hours.':'.$request->minutes.':'.$seconds));
            $timestamp = date('Y-m-d H:i:00', strtotime($date.' '.$time));
            // Fetch Timezone
            $timezone = $request->timezone;
            // Convert to formated datetime
            $formated = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, $timezone);
            $datetime = $formated->format('Y-m-d H:i:s');

            // Fetch Category
            $category_id = null;
            if($request->has('category') && !empty($request->category)){
                $fetchCategory = \App\Models\Category::where(\DB::raw('BINARY `uuid`'), $request->category)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchCategory)){
                    $category_id = $fetchCategory->id;
                }
            }

            // Fetch From Wallet
            $fromWallet_id = null;
            if($request->has('from_wallet') && !empty($request->from_wallet)){
                $fetchFromWallet = \App\Models\Wallet::where(\DB::raw('BINARY `uuid`'), $request->from_wallet)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchFromWallet)){
                    $fromWallet_id = $fetchFromWallet->id;
                }
            }

            // Fetch To Wallet
            $toWallet_id = null;
            if($request->has('to_wallet') && !empty($request->to_wallet)){
                $fetchToWallet = \App\Models\Wallet::where(\DB::raw('BINARY `uuid`'), $request->to_wallet)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchToWallet)){
                    $toWallet_id = $fetchToWallet->id;
                }
            }

            // Override Amount if not valid
            if($request->amount === '' || empty($request->amount) || $request->amount === null){
                $request->merge(['amount' => 0]);
            }
            if($request->extra_amount === '' || empty($request->extra_amount) || $request->extra_amount === null){
                $request->merge(['extra_amount' => 0]);
            }

            // Start saving to database
            $data->user_id = $user->id;
            $data->category_id = $category_id;
            $data->type = $request->type === 'transfer' ? 'expense' : $request->type;
            $data->from_wallet_id = $fromWallet_id;
            $data->to_wallet_id = $toWallet_id;
            $data->amount = $request->amount;
            $data->extra_type = $request->extra_type;
            $data->extra_percentage = $request->extra_type === 'percentage' ? ($request->extra_amount ?? 0) : 0;
            $data->extra_amount = $request->extra_type === 'percentage' ? (($request->extra_amount ?? 0) * ($request->amount ?? 0)) / 100 : ($request->extra_amount ?? 0);
            $data->date = date('Y-m-d', strtotime($datetime));
            $data->time = date('H:i:s', strtotime($datetime));
            $data->datetime = date('Y-m-d H:i:s', strtotime($datetime));
            $data->note = $request->notes;
            $data->is_pending = false;
            $data->timezone = $timezone;
            $data->save();
        });

        // \Log::debug("Debug on Record API Controller", [
        //     'request' => $request->all()
        // ]);

        return $this->formatedJsonResponse(200, 'Data Stored', []);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();

        $data = \App\Models\Record::with('category.parent', 'fromWallet.parent', 'toWallet.parent')
            ->where(\DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if($request->has('action')){
            if($request->action === 'edit'){
                // Override if transfer
                if($data->toWallet()->exists() && $data->type !== 'expense'){
                    // Use related expense data
                    $data = $data->getRelated();

                    // Load relationship
                    $data->load('category.parent', 'fromWallet.parent', 'toWallet.parent');
                }
            }
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
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
            'notes' => ['nullable', 'string']
        ]);

        $user = $request->user();
        $data = \App\Models\Record::with('category.parent', 'fromWallet.parent', 'toWallet.parent')
            ->where(\DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        \DB::transaction(function () use ($request, $data, $user) {
            // Handle Timestamp
            $date = date('Y-m-d', strtotime($request->date));
            $seconds = date('s', strtotime($request->date));
            $time = date('H:i:s', strtotime($request->hours.':'.$request->minutes.':'.$seconds));
            $timestamp = date('Y-m-d H:i:00', strtotime($date.' '.$time));
            // Fetch Timezone
            $timezone = $request->timezone;
            // Convert to formated datetime
            $formated = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, $timezone);
            $datetime = $formated->format('Y-m-d H:i:s');

            // Fetch Category
            $category_id = null;
            if($request->has('category') && !empty($request->category)){
                $fetchCategory = \App\Models\Category::where(\DB::raw('BINARY `uuid`'), $request->category)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchCategory)){
                    $category_id = $fetchCategory->id;
                }
            }

            // Fetch From Wallet
            $fromWallet_id = null;
            if($request->has('from_wallet') && !empty($request->from_wallet)){
                $fetchFromWallet = \App\Models\Wallet::where(\DB::raw('BINARY `uuid`'), $request->from_wallet)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchFromWallet)){
                    $fromWallet_id = $fetchFromWallet->id;
                }
            }

            // Fetch To Wallet
            $toWallet_id = null;
            if($request->type === 'transfer' && $request->has('to_wallet') && !empty($request->to_wallet)){
                $fetchToWallet = \App\Models\Wallet::where(\DB::raw('BINARY `uuid`'), $request->to_wallet)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchToWallet)){
                    $toWallet_id = $fetchToWallet->id;
                }
            }

            // Override Amount if not valid
            if($request->amount === '' || empty($request->amount) || $request->amount === null){
                $request->merge(['amount' => 0]);
            }
            if($request->extra_amount === '' || empty($request->extra_amount) || $request->extra_amount === null){
                $request->merge(['extra_amount' => 0]);
            }

            // Start saving to database
            $data->category_id = $category_id;
            $data->type = $request->type === 'transfer' ? 'expense' : $request->type;
            $data->from_wallet_id = $fromWallet_id;
            $data->to_wallet_id = $toWallet_id;
            $data->amount = $request->amount;
            $data->extra_type = $request->extra_type;
            $data->extra_percentage = $request->extra_type === 'percentage' ? ($request->extra_amount ?? 0) : 0;
            $data->extra_amount = $request->extra_type === 'percentage' ? (($request->extra_amount ?? 0) * ($request->amount ?? 0)) / 100 : ($request->extra_amount ?? 0);
            $data->date = date('Y-m-d', strtotime($datetime));
            $data->time = date('H:i:s', strtotime($datetime));
            $data->datetime = date('Y-m-d H:i:s', strtotime($datetime));
            $data->note = $request->notes;
            $data->is_pending = false;
            $data->timezone = $timezone;
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

        $data = \App\Models\Record::with('category.parent', 'fromWallet.parent', 'toWallet.parent')
            ->where(\DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        \DB::transaction(function () use ($request, $data) {
            // Remove data
            // $data->delete();
        });

        return $this->formatedJsonResponse(200, 'Data Deleted', []);
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
