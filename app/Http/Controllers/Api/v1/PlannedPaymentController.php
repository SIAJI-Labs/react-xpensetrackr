<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\JsonResponseTrait;
use Illuminate\Support\Facades\DB;

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
        if($request->has('filter_state') && in_array($request->filter_state, ['overdue', 'today', 'upcoming'])){
            $interval = 5;
            // Override upcoming interval
            // if(!empty($user->getPreference('upcoming_planned_payment_interval'))){
            //     $interval = $user->getPreference('upcoming_planned_payment_interval');
            // } else {
            //     $interval = 5;
            // }
            
            if($request->filter_state === 'overdue'){
                $data->where('date_start', '<', date('Y-m-d'));
            } else if($request->filter_state === 'today'){
                $data->where('date_start', date('Y-m-d'));
            } else if($request->filter_state === 'upcoming'){
                $data->where('date_start', '<=', date('Y-m-d', strtotime('+'.($interval).' days')))
                    ->where('date_start', '>', date('Y-m-d'));
            }
        }

        // Apply ordering
        $sort_type = 'asc';
        if($request->has('sort') && in_array($request->sort, ['asc', 'desc'])){
            $sort_type = $request->sort;
        }
        if($request->has('sort_by') && in_array($request->sort_by, ['date_start', 'name'])){
            // Validate allowed column to use in order
            $data->orderBy($request->sort_by, $sort_type);
        } else {
            // Default ordering column
            $data->orderBy('date_start', $sort_type);
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
                'data' => $data->get(),
                'has_more' => $hasMore,
                'total' => $raw->count()
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
            'type' => ['required', 'string', 'in:expense,transfer,income'],
            'category' => ['nullable', 'string', 'exists:'.(new \App\Models\Category())->getTable().',uuid'],
            'from_wallet' => ['required', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'to_wallet' => ['nullable', 'required_if:type,transfer', 'different:from_wallet', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'amount' => ['required', 'numeric'],
            'extra_amount' => ['nullable', 'numeric'],
            'extra_type' => ['nullable', 'string', 'in:amount,percentage'],
            'occurence' => ['required', 'string', 'in:recurring,once'],
            'frequency' => ['nullable', 'required_if:occurence,recurring', 'numeric', 'min:1'],
            'frequency_type' => ['nullable', 'required_if:occurence,recurring', 'string', 'in:daily,weekly,monthly,yearly'],
            'date' => ['required', 'string'],
            'notes' => ['nullable', 'string']
        ]);

        // Validate date start must be greater or equal with today
        if(date('Y-m-d', strtotime($request->date)) < date('Y-m-d')){
            throw \Illuminate\Validation\ValidationException::withMessages([
                'date' => 'Start at value must be greater or equal than today!'
            ]);
        }
        
        // Store to database
        DB::transaction(function () use ($request) {
            $user = $request->user();
            $data = new \App\Models\PlannedPayment();

            // Fetch Category
            $category_id = null;
            if($request->has('category') && !empty($request->category)){
                $fetchCategory = \App\Models\Category::where(DB::raw('BINARY `uuid`'), $request->category)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchCategory)){
                    $category_id = $fetchCategory->id;
                }
            }

            // Fetch From Wallet
            $fromWallet_id = null;
            if($request->has('from_wallet') && !empty($request->from_wallet)){
                $fetchFromWallet = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $request->from_wallet)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchFromWallet)){
                    $fromWallet_id = $fetchFromWallet->id;
                }
            }

            // Fetch To Wallet
            $toWallet_id = null;
            if($request->has('to_wallet') && !empty($request->to_wallet)){
                $fetchToWallet = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $request->to_wallet)
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

            // Fill model attribute
            $data->user_id = $user->id;
            $data->name = $request->name;
            $data->category_id = $category_id;
            $data->type = $request->type;
            $data->from_wallet_id = $fromWallet_id;
            $data->to_wallet_id = $toWallet_id;
            $data->amount = $request->amount;
            $data->extra_type = $request->extra_type;
            $data->extra_percentage = $request->extra_type === 'percentage' ? ($request->extra_amount ?? 0) : 0;
            $data->extra_amount = $request->extra_type === 'percentage' ? (($request->extra_amount ?? 0) * ($request->amount ?? 0)) / 100 : ($request->extra_amount ?? 0);
            $data->date_start = date('Y-m-d', strtotime($request->date));
            $data->repeat_type = $request->occurence;
            $data->repeat_frequency = $request->occurence === 'recurring' ? $request->frequency : 1;
            $data->repeat_period = $request->occurence === 'recurring' ? $request->frequency_type : 'daily';
            $data->repeat_until = $request->occurence === 'recurring' ? 'forever' : 'number';
            $data->until_number = $request->occurence === 'recurring' ? null : 1;
            $data->note = $request->notes;
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
        // Pagination
        $hasMore = false;
        $perPage = 5;
        if($request->has('per_page') && is_numeric($request->per_page)){
            $perPage = $request->per_page;
        }

        $data = \App\Models\PlannedPayment::query()
            ->withTrashed()
            ->with('category.parent', 'fromWallet.parent', 'toWallet.parent')
            ->where(DB::raw('BINARY `uuid`'), $id)
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
        $request->validate([
            'name' => ['required', 'string'],
            'type' => ['required', 'string', 'in:expense,transfer,income'],
            'category' => ['nullable', 'string', 'exists:'.(new \App\Models\Category())->getTable().',uuid'],
            'from_wallet' => ['required', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'to_wallet' => ['nullable', 'required_if:type,transfer', 'different:from_wallet', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'amount' => ['required', 'numeric'],
            'extra_amount' => ['nullable', 'numeric'],
            'extra_type' => ['nullable', 'string', 'in:amount,percentage'],
            'occurence' => ['required', 'string', 'in:recurring,once'],
            'frequency' => ['required', 'numeric', 'min:1'],
            'frequency_type' => ['required', 'string', 'in:daily,weekly,monthly,yearly'],
            'date' => ['required', 'string'],
            'notes' => ['nullable', 'string']
        ]);

        $user = $request->user();
        $data = \App\Models\PlannedPayment::where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Validate date start must be greater or equal with today
        if(date('Y-m-d', strtotime($request->date)) < date('Y-m-d')){
            throw \Illuminate\Validation\ValidationException::withMessages([
                'date' => 'Start at value is invalid, value cannot be less than previous value ('.(date('d F, Y', strtotime($data->date_start))).')!'
            ]);
        }
        
        // Store to database
        DB::transaction(function () use ($request, $user, $data) {
            // Fetch Category
            $category_id = null;
            if($request->has('category') && !empty($request->category)){
                $fetchCategory = \App\Models\Category::where(DB::raw('BINARY `uuid`'), $request->category)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchCategory)){
                    $category_id = $fetchCategory->id;
                }
            }

            // Fetch From Wallet
            $fromWallet_id = null;
            if($request->has('from_wallet') && !empty($request->from_wallet)){
                $fetchFromWallet = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $request->from_wallet)
                    ->where('user_id', $user->id)
                    ->first();
                if(!empty($fetchFromWallet)){
                    $fromWallet_id = $fetchFromWallet->id;
                }
            }

            // Fetch To Wallet
            $toWallet_id = null;
            if($request->has('to_wallet') && !empty($request->to_wallet)){
                $fetchToWallet = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $request->to_wallet)
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

            // Fill model attribute
            $data->user_id = $user->id;
            $data->name = $request->name;
            $data->category_id = $category_id;
            $data->type = $request->type;
            $data->from_wallet_id = $fromWallet_id;
            $data->to_wallet_id = $toWallet_id;
            $data->amount = $request->amount;
            $data->extra_type = $request->extra_type;
            $data->extra_percentage = $request->extra_type === 'percentage' ? ($request->extra_amount ?? 0) : 0;
            $data->extra_amount = $request->extra_type === 'percentage' ? (($request->extra_amount ?? 0) * ($request->amount ?? 0)) / 100 : ($request->extra_amount ?? 0);
            $data->date_start = date('Y-m-d', strtotime($request->date));
            $data->repeat_type = $request->occurence;
            $data->repeat_frequency = $request->occurence === 'recurring' ? $request->frequency : 1;
            $data->repeat_period = $request->occurence === 'recurring' ? $request->frequency_type : 'daily';
            $data->repeat_until = $request->occurence === 'recurring' ? 'forever' : 'number';
            $data->until_number = $request->occurence === 'recurring' ? null : 1;
            $data->note = $request->notes;
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

        $data = \App\Models\PlannedPayment::with('category.parent', 'fromWallet.parent', 'toWallet.parent')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if($request->has('action')){
            if($request->action === 'skip'){
                // Create record
                $record = new \App\Models\PlannedPaymentRecord();
                $record->planned_payment_id = $data->id;
                $record->record_id = null;
                $record->status = 'reject';
                $record->period = $data->date_start;
                $record->save();
            } else if($request->action === 'delete'){
                // Delete
                $data->delete();
            }
        } else {
            // Delete
            $data->delete();
        }

        return $this->formatedJsonResponse(200, 'Data Deleted', []);
    }
}
