<?php

namespace App\Http\Controllers\Api\v1;

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
        $user = $request->user();
        $response = [];

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
                // Pagination
                $hasMore = false;
                $perPage = 5;
                if($request->has('per_page') && is_numeric($request->per_page)){
                    $perPage = $request->per_page;
                }

                // Query Builder - Income
                $toIncome = \App\Models\Wallet::select((new \App\Models\Wallet())->getTable().'.*')
                    ->join((new \App\Models\PlannedPayment())->getTable(), (new \App\Models\PlannedPayment())->getTable().'.to_wallet_id', '=', (new \App\Models\Wallet())->getTable().'.id')
                    ->where((new \App\Models\Wallet())->getTable().'.user_id', $user->id)
                    // ->where((new \App\Models\Wallet())->getTable().'.type', 'expense')
                    ->pluck((new \App\Models\Wallet())->getTable().'.id')
                    ->toArray();
                // Query Builder
                $wallet = \App\Models\Wallet::select((new \App\Models\Wallet())->getTable().'.*')
                    ->join((new \App\Models\PlannedPayment())->getTable(), (new \App\Models\PlannedPayment())->getTable().'.from_wallet_id', '=', (new \App\Models\Wallet())->getTable().'.id')
                    ->where((new \App\Models\Wallet())->getTable().'.user_id', $user->id)
                    ->pluck((new \App\Models\Wallet())->getTable().'.id')
                    ->toArray();;
                // Merge the array
                $array = array_unique(array_merge($toIncome, $wallet));

                // Create Eloquent Query
                $data = \App\Models\Wallet::with('parent')
                    ->whereIn('id', $array)
                    ->orderBy('order_main', 'asc');

                if($request->has('limit') && is_numeric($request->limit)){
                    $raw = (clone $data);
    
                    // Apply limit (only if there's no paginate)
                    $data = $data->limit($request->limit);
    
                    if($data->get()->count() < $raw->count()){
                        $hasMore = true;
                    }
                }

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

                $response = [
                    'data' => $data,
                    'has_more' => $hasMore
                ];
            } else {
                // Already passed
            }
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
}