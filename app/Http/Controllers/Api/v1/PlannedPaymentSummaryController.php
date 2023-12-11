<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\JsonResponseTrait;

class PlannedPaymentSummaryController extends Controller
{
    use JsonResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // sleep(5);
        $user = $request->user();
        $response = [];
        // Pagination
        $hasMore = false;
        $limit = 5;
        if($request->has('limit') && is_numeric($request->limit)){
            $limit = $request->limit;
        }

        if($request->has('filter_period')){
            $array = [];
            $period = $request->filter_period;

            // Validate Query
            if(date('Y-m-01', strtotime($period)) >= date('Y-m-01')){
                /**
                 * Future projection
                 * 
                 * Fetch related wallet list
                 */
                // Query Builder - Income
                $toIncome = \App\Models\Wallet::select((new \App\Models\Wallet())->getTable().'.*')
                    ->join(
                        (new \App\Models\PlannedPayment())->getTable(),
                        (new \App\Models\PlannedPayment())->getTable().'.to_wallet_id',
                        '=',
                        (new \App\Models\Wallet())->getTable().'.id')
                    ->where((new \App\Models\Wallet())->getTable().'.user_id', $user->id)
                    // ->where((new \App\Models\Wallet())->getTable().'.type', 'expense')
                    ->pluck((new \App\Models\Wallet())->getTable().'.id')
                    ->toArray();
                // Query Builder
                $wallet = \App\Models\Wallet::select((new \App\Models\Wallet())->getTable().'.*')
                    ->join(
                        (new \App\Models\PlannedPayment())->getTable(),
                        (new \App\Models\PlannedPayment())->getTable().'.from_wallet_id',
                        '=',
                        (new \App\Models\Wallet())->getTable().'.id')
                    ->where((new \App\Models\Wallet())->getTable().'.user_id', $user->id)
                    ->pluck((new \App\Models\Wallet())->getTable().'.id')
                    ->toArray();;
                // Merge the array
                $array = array_unique(array_merge($toIncome, $wallet));

                // Create Eloquent Query
                $data = \App\Models\Wallet::with('parent')
                    ->whereIn('id', $array)
                    ->orderBy('order_main', 'asc');

                $data = $data->get();
                // Mapping to get formated result
                $data = collect($data)->map(function($data) use ($period){
                    $expected_planned_income = [];
                    $expected_planned_expense = [];
                    $expected_income = 0;
                    $expected_expense = 0;
    
                    $projection = $data->getExpectedProjection($period);
    
                    // Update variable
                    $data->expected_planned_income = $projection['expected_planned_income']; // Amount
                    $data->expected_planned_expense = $projection['expected_planned_expense']; // Amount
                    $data->expected_income = $projection['expected_income']; // Countable
                    $data->expected_expense = $projection['expected_expense']; // Countable
    
                    return $data;
                })->filter(function($data){
                    // Remove empty data
                    return !empty($data->expected_planned_income) || !empty($data->expected_planned_expense);
                });
            } else if(date('Y-m-01', strtotime($period)) < date('Y-m-01')){ // Previous Period
                /**
                 * Already passed
                 */
                // Pagination
                $hasMore = false;
                $perPage = 5;
                if($request->has('per_page') && is_numeric($request->per_page)){
                    $perPage = $request->per_page;
                }

                // Query Builder - Income
                $toIncome = \App\Models\Wallet::select((new \App\Models\Wallet())->getTable().'.*')
                    ->join((new \App\Models\PlannedPayment())->getTable(), (new \App\Models\PlannedPayment())->getTable().'.to_wallet_id', '=', (new \App\Models\Wallet())->getTable().'.id')
                    ->join((new \App\Models\PlannedPaymentRecord())->getTable(), (new \App\Models\PlannedPaymentRecord())->getTable().'.planned_payment_id', '=', (new \App\Models\PlannedPayment())->getTable().'.id')
                    ->where((new \App\Models\Wallet())->getTable().'.user_id', $user->id)
                    ->whereNotNull((new \App\Models\PlannedPaymentRecord())->getTable().'.record_id')
                    ->where((new \App\Models\PlannedPaymentRecord())->getTable().'.status', 'approve')
                    ->whereMonth((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('m', strtotime($period)))
                    ->whereYear((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('Y', strtotime($period)))
                    ->pluck((new \App\Models\Wallet())->getTable().'.id')
                    ->toArray();
                // Query Builder
                $wallet = \App\Models\Wallet::select((new \App\Models\Wallet())->getTable().'.*')
                    ->join((new \App\Models\PlannedPayment())->getTable(), (new \App\Models\PlannedPayment())->getTable().'.from_wallet_id', '=', (new \App\Models\Wallet())->getTable().'.id')
                    ->join((new \App\Models\PlannedPaymentRecord())->getTable(), (new \App\Models\PlannedPaymentRecord())->getTable().'.planned_payment_id', '=', (new \App\Models\PlannedPayment())->getTable().'.id')
                    ->where((new \App\Models\Wallet())->getTable().'.user_id', $user->id)
                    ->whereNotNull((new \App\Models\PlannedPaymentRecord())->getTable().'.record_id')
                    ->where((new \App\Models\PlannedPaymentRecord())->getTable().'.status', 'approve')
                    ->whereMonth((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('m', strtotime($period)))
                    ->whereYear((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('Y', strtotime($period)))
                    ->pluck((new \App\Models\Wallet())->getTable().'.id')
                    ->toArray();

                // Merge array
                $array = array_unique(array_merge($toIncome, $wallet));

                // Eloquent
                $data = \App\Models\Wallet::whereIn('id', $array)
                    ->orderBy('order_main', 'asc');

                $data = $data->get();
                $data = collect($data)->filter(function($data, $period){
                    return $data->getExpectedPlannedPayment($period, 'income', 'count', $data->id) > 0 || $data->getExpectedPlannedPayment($period, 'expense', 'count', $data->id) > 0;
                });
            }

            if($request->has('limit') && is_numeric($request->limit)){
                $raw = (clone $data);
                // Apply limit (only if there's no paginate)
                $data = $data->take($limit);

                if(count($data) < $raw->count()){
                    $hasMore = true;
                }
            }

            $response = [
                'data' => $data->values(),
                'has_more' => $hasMore,
            ];
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', $response);
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
        $limit = 5;
        if($request->has('limit') && is_numeric($request->limit)){
            $limit = $request->limit;
        }

        $wallet = \App\Models\Wallet::with('parent')
            ->where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();
        $response = [
            'wallet' => $wallet
        ];

        if($request->has('filter_period')){
            $array = [];
            $period = $request->filter_period;

            if(date('Y-m-d', strtotime($period)) >= date('Y-m-01')){ //Current period
                $projection = $wallet->getExpectedProjection($period);

                $data = collect(array_merge($projection['expected_planned_income'], $projection['expected_planned_expense']))
                    ->sortBy('period')
                    ->map(function($data) use($user){
                        $planned = \App\Models\PlannedPayment::with('fromWallet.parent', 'toWallet.parent', 'category.parent')
                            ->where('id', $data['id'])
                            ->where('user_id', $user->id)
                            ->first();

                        // Override Period
                        $planned->date_start = $data['period'];

                        if(!empty($planned)){
                            $data['planned'] = $planned;
                        }
                        return $data;
                    })
                    ->values();
            } else {
                if(date('Y-m-d', strtotime($period)) < date('Y-m-01')){ // Previous period
                    // Query Builder - Income
                    $toIncome = \App\Models\Record::select((new \App\Models\Record())->getTable().'.*')
                        ->where((new \App\Models\Record())->getTable().'.user_id', $user->id)
                        ->where((new \App\Models\Record())->getTable().'.to_wallet_id', $id)
                        ->join((new \App\Models\PlannedPaymentRecord())->getTable(), (new \App\Models\PlannedPaymentRecord())->getTable().'.record_id', '=', (new \App\Models\Record())->getTable().'.id')
                        ->whereMonth((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('m', strtotime($period)))
                        ->whereYear((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('Y', strtotime($period)))
                        ->pluck((new \App\Models\Record())->getTable().'.id')
                        ->toArray();
                    
                    // Query Builder
                    $record = \App\Models\Record::select((new \App\Models\Record())->getTable().'.*')
                        ->where((new \App\Models\Record())->getTable().'.user_id', $user->id)
                        ->where((new \App\Models\Record())->getTable().'.from_wallet_id', $id)
                        ->join((new \App\Models\PlannedPaymentRecord())->getTable(), (new \App\Models\PlannedPaymentRecord())->getTable().'.record_id', '=', (new \App\Models\Record())->getTable().'.id')
                        ->whereMonth((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('m', strtotime($period)))
                        ->whereYear((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('Y', strtotime($period)))
                        ->pluck((new \App\Models\Record())->getTable().'.id')
                        ->toArray();

                    // Merge array
                    $array = array_unique(array_merge($toIncome, $record));

                    // Result
                    $base_query = \App\Models\Record::whereIn('id', $array)
                        ->orderBy('datetime', 'desc');
                    $data = $base_query->get();
                }
            }

            if($request->has('limit') && is_numeric($request->limit)){
                $raw = (clone $data);
                // Apply limit (only if there's no paginate)
                $data = $data->take($limit);

                if(count($data) < $raw->count()){
                    $hasMore = true;
                }
            }

            $response['data'] = $data;
            $response['has_more'] = $hasMore;
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', $response);
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
