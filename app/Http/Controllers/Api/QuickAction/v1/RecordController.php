<?php

namespace App\Http\Controllers\Api\QuickAction\v1;

use App\Http\Controllers\Controller;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    use JsonResponseTrait;

    /**
     * 
     */
    public function validation(Request $request)
    {
        $request->validate([
            'key' => ['required', 'string', 'in:wallet,amount,note']
        ]);

        switch($request->key){
            case 'wallet':
                $request->validate([
                    'type' => ['required', 'string', 'in:income,expense,transfer'],
                    'from_wallet' => ['required', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
                    'to_wallet' => ['nullable', 'required_if:type,transfer', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid', 'different:from_wallet']
                ]);
                break;
            case 'amount':
                $request->validate([
                    'amount' => ['required', 'numeric'],
                    'extra_amount' => ['nullable', 'numeric'],
                    'extra_type' => ['nullable', 'string', 'in:amount,percentage'],
                ]);
                break;
        }

        return $this->formatedJsonResponse(200, 'Validated', []);
    }

    /**
     * 
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => ['required', 'string', 'in:expense,transfer,income'],
            'from_wallet' => ['required', 'string', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'to_wallet' => ['nullable', 'required_if:type,transfer', 'different:from_wallet', 'exists:'.(new \App\Models\Wallet())->getTable().',uuid'],
            'amount' => ['required', 'numeric'],
            'extra_amount' => ['nullable', 'numeric'],
            'extra_type' => ['nullable', 'string', 'in:amount,percentage'],
            'timestamp' => ['required', 'string'],
        ]);

        // Store to database
        \DB::transaction(function () use ($request) {
            $user = $request->user();
            $data = new \App\Models\Record();

            // Handle Timestamp
            $timestamp = date('Y-m-d H:i:00', strtotime($request->timestamp));
            // Fetch Timezone
            $timezone = $request->timezone;
            // Convert to formated datetime
            $formated = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, $timezone);
            $datetime = $formated->format('Y-m-d H:i:s');

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
            $data->is_pending = true;
            $data->timezone = $timezone;
            $data->save();
        });

        return $this->formatedJsonResponse(200, 'Data Stored', []);
    }
}
