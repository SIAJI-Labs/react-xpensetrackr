<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WalletBalanceAdjustmentController extends Controller
{
    use JsonResponseTrait;

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'actual_balance' => ['required', 'numeric', 'different:current_balance'],
        ]);

        $user = $request->user();
        $data = \App\Models\Wallet::where(DB::raw('BINARY `uuid`'), $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        DB::transaction(function() use ($user, $data, $request){
            $timestamp = date('Y-m-d H:i:s');
            
            $amount = 0;
            $type = 'expense';
            if($request->actual_balance > $data->getBalance()){
                $type = 'income';
                $amount = $request->actual_balance - $data->getBalance();
            } else {
                $amount = $data->getBalance() - $request->actual_balance;
            }

            // Generate transaction to adjust wallet balance
            $record = new \App\Models\Record([
                'user_id' => $user->id,
                'type' => $type,
                'from_wallet_id' => $data->id,
                'amount' => $amount,
                'extra_type' => 'amount',
                'extra_percentage' => 0,
                'extra_amount' => 0,
                'date' => date('Y-m-d', strtotime($timestamp)),
                'time' => date('H:i:s', strtotime($timestamp)),
                'datetime' => $timestamp,
                'note' => 'Balance adjustment',
                'timezone' => null,
                'is_pending' => false
            ]);
            $record->save();
        });

        return $this->formatedJsonResponse(200, 'Data Updated', []);
    }
}
