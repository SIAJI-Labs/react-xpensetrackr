<?php

namespace App\Http\Controllers\Api\v1\Report;

use DateTime;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\JsonResponseTrait;
use Illuminate\Support\Facades\DB;

class CashFlowController extends Controller
{
    use JsonResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Init year variable
        $year = date('Y');
        $month = null;
        $wallet = [];
        
        // Override init variable
        if($request->has('year') && validateDateFormat($request->year, 'Y')){
            $year = $request->year;
        }
        if($request->has('month') && validateDateFormat($request->month, 'm')){
            $month = $request->month;
        }
        if($request->has('wallet') && is_array($request->wallet) && !empty($request->wallet)){
            $wallet = \App\Models\Wallet::whereIn(DB::raw('BINARY `uuid`'), $request->wallet)
                ->pluck('id')
                ->toArray();
        }

        // Make a base query
        $base_query = \App\Models\Record::query()
            ->where('user_id', $user->id)
            ->whereYear('datetime', $year)
            ->where('is_pending', false);
        // Apply more filter
        if(!empty($wallet)){
            $base_query->whereIn('wallet_id', $wallet);
        }

        // Fetch data for graph
        $graph = [
            'year' => $year,
            'data' => []
        ];

        $sort = 'asc';
        if(empty($month)){
            // Handle for Monthly data
            $start = date('Y-m-d', strtotime($year.'-01-01'));
            $end = date('Y-m-d', strtotime($year.'-12-01'));
            // Override period
            if($request->has('sort') && in_array($request->sort, ['asc', 'desc'])){
                if($request->sort === 'desc'){
                    $sort = 'desc';
                    $start = date('Y-m-d', strtotime($year.'-12-01'));
                    $end = date('Y-m-d', strtotime($year.'-01-01'));
                }
            }

            do {
                $month_name = (DateTime::createFromFormat('Y-m-d', $start))->format('M');
                // Update base query
                $monthly = (clone $base_query)
                    ->whereMonth('datetime', (DateTime::createFromFormat('Y-m-d', $start))->format('m'));
                
                // Fetch Income
                $income = (clone $monthly)
                    ->where('type', 'income')
                    ->sum(DB::raw('amount + extra_amount'));
                // Fetch Expense
                $expense = (clone $monthly)
                    ->where('type', 'expense')
                    ->sum(DB::raw('amount + extra_amount')) * -1;

                $graph['data'][] = [
                    'label' => $month_name,
                    'period' => $year.'-'.date('m', strtotime($start)),
                    'income' => $income,
                    'expense' => $expense,
                    'cash_flow' => $income + $expense
                ];

                if($sort === 'asc'){
                    $start = date('Y-m-d', strtotime($start.' +1 month'));
                } else {
                    $start = date('Y-m-d', strtotime($start.' -1 month'));
                }

                // Validate
                $condition = $start <= $end;
                if($sort === 'desc'){
                    $condition = $start >= $end;
                }
            } while($condition);
        } else if(!empty($month)){
            // Handle for Daily Data
            $start = date('Y-m-d', strtotime($year.'-'.$month.'-01'));
            $end = date('Y-m-t', strtotime($year.'-'.$month.'-01'));
            if($request->has('sort') && in_array($request->sort, ['asc', 'desc'])){
                if($request->sort === 'desc'){
                    $sort = 'desc';
                    $start = date('Y-m-t', strtotime($year.'-'.$month.'-01'));
                    $end = date('Y-m-d', strtotime($year.'-'.$month.'-01'));
                }
            }

            // Start the looping functiong
            do {
                // Update base query
                $daily = (clone $base_query)
                    ->whereMonth('datetime', (DateTime::createFromFormat('m', $month))->format('m'))
                    ->whereDay('datetime', (DateTime::createFromFormat('Y-m-d', $start))->format('d'));

                // Fetch Income
                $income = (clone $daily)
                    ->where('type', 'income')
                    ->sum(DB::raw('amount + extra_amount'));
                // Fetch Expense
                $expense = (clone $daily)
                    ->where('type', 'expense')
                    ->sum(DB::raw('amount + extra_amount')) * -1;

                $graph['month'] = $month;
                $graph['data'][] = [
                    'label' => $start,
                    'income' => $income,
                    'expense' => $expense,
                    'cash_flow' => $income + $expense
                ];

                if($sort === 'asc'){
                    $start = date('Y-m-d', strtotime($start.' +1 days'));
                } else {
                    $start = date('Y-m-d', strtotime($start.' -1 days'));
                }

                // Validate
                $condition = $start <= $end;
                if($sort === 'desc'){
                    $condition = $start >= $end;
                }
            } while($condition);
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', [
            'graph' => $graph,
        ]);
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
