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
                $toIncome = [];
                // Query Builder
                $wallet = [];
                // Merge the array
                $array = array_unique(array_merge($toIncome, $wallet));

                // Create Eloquent Query
                $data = \App\Models\Wallet::whereIn('id', $array)
                    ->orderBy('order_main', 'asc')
                    ->get();

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
            } else {
                // Already passed
            }
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', []);
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
