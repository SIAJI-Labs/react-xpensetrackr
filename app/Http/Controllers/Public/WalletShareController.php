<?php

namespace App\Http\Controllers\Public;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class WalletShareController extends Controller
{
    use JsonResponseTrait;
    public $sessionPrefix = 'jeGg_passphrase/';

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $token)
    {
        $valid_until = null;
        $is_found = true;
        $has_passphrase = false;

        $data = \App\Models\WalletShare::where(DB::raw('BINARY `token`'), $token)
            ->first();
        
        // Session::forget($this->sessionPrefix.$data->uuid);

        if(!empty($data)){
            // Validate if still valid
            if(!empty($data->valid_until)){
                $valid_until = $data->valid_until;
            }

            // Check if related data need passphrase
            if(!empty($data->passphrase)){
                $has_passphrase = true;

                // Validate session
                if(Session::has($this->sessionPrefix.$data->uuid)){
                    $has_passphrase = false;
                }
            }

            // If passphrase is not validated
            if($has_passphrase){
                $data = new \App\Http\Resources\WalletShare\ProtectedResource($data);
            } else {
                $data = new \App\Http\Resources\WalletShare\ShowResource($data);
            }
        } else {
            // Data not found
            $is_found = false;
        }

        return Inertia::render('Public/WalletShare/Index', [
            'is_found' => $is_found,
            'valid_until' => $valid_until,
            'has_passphrase' => $has_passphrase,
            'data' => $data
        ]);
    }

    /**
     * Validate passphrase
     */
    public function passphrase(Request $request, $token)
    {
        $request->validate([
            'passphrase' => ['required', 'string']
        ]);

        // Fetch
        $data = \App\Models\WalletShare::where(DB::raw('BINARY `token`'), $token)
            ->first();

        if(!empty($data)){
            // Validate
            if(Hash::check($request->passphrase, $data->passphrase)){
                Session::put($this->sessionPrefix.$data->uuid, [
                    'token' => $data->token
                ]);

                return $this->formatedJsonResponse();
            }

            throw \Illuminate\Validation\ValidationException::withMessages([
                'passphrase' => 'Missmatch passphrase'
            ]);
        }

        throw \Illuminate\Validation\ValidationException::withMessages([
            'passphrase' => 'Data cannot be found!'
        ]);
    }

    /**
     * Record List
     */
    public function recordList(Request $request, $token)
    {
        $data = [];
        $has_passphrase = false;

        $shared = \App\Models\WalletShare::where(DB::raw('BINARY `token`'), $token)
            ->first();

        if(!empty($shared)){
            // Validate Passphrase
            if(!empty($shared->passphrase)){
                $has_passphrase = true;

                // Validate session
                if(Session::has($this->sessionPrefix.$shared->uuid)){
                    $has_passphrase = false;
                }
            }

            // Handle passphrase state
            if($has_passphrase){
                $data = [];
            } else {
                // Fetch Record List
                $data = \App\Models\Record::query()
                    ->with('category.parent', 'fromWallet.parent', 'toWallet.parent', 'recordTags');

                // Apply keyword search
                if($request->has('keyword') && !empty($request->keyword)){
                    $data->where('note', 'like', '%'.$request->keyword.'%');
                }
                // Apply Filter
                if($request->has('filter_status') && in_array($request->filter_status, ['pending', 'complete'])){
                    $data->where('is_pending', $request->filter_status === 'pending');
                }

                // Apply Wallet
                $wallet = $shared->walletShareItem()->pluck('wallet_id')->toArray();
                $data->where(function($q) use ($wallet){
                    return $q->where(function($q) use ($wallet){
                            return $q->where('type', 'expense')
                                ->whereIn('from_wallet_id', $wallet);
                        })
                        ->orWhere(function($q) use ($wallet){
                            return $q->where('type', 'income')
                                ->whereIn('from_wallet_id', $wallet);
                        });
                });

                // Apply ordering
                $sort_type = 'desc';
                if($request->has('sort') && in_array($request->sort, ['asc', 'desc'])){
                    $sort_type = $request->sort;
                }
                if($request->has('sort_by') && in_array($request->sort_by, ['datetime'])){
                    // Validate allowed column to use in order
                    $data->orderBy($request->sort_by, $sort_type);
                } else {
                    // Default ordering column
                    $data->orderBy('datetime', $sort_type);
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
                        'data' => \App\Http\Resources\Record\ListResource::collection($data->get()),
                        'has_more' => $hasMore,
                        'total' => isset($raw) ? $raw->count() : null
                    ];
                }
            }
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', $data);
    }

    /**
     * Record Detail
     */
    public function recordDetail(Request $request, $token, $uuid)
    {
        $data = [];
        $shared = \App\Models\WalletShare::where(DB::raw('BINARY `token`'), $token)
            ->first();

        if(!empty($shared) && $shared->walletShareItem()->exists()){
            // Validate Passphrase
            if(!empty($shared->passphrase)){
                $has_passphrase = true;

                // Validate session
                if(Session::has($this->sessionPrefix.$shared->uuid)){
                    $has_passphrase = false;
                }
            }

            if(!$has_passphrase){
                // Fetch record
                $data = \App\Models\Record::with('category.parent', 'fromWallet.parent', 'toWallet.parent', 'recordTags')
                    ->where(DB::raw('BINARY `uuid`'), $uuid)
                    ->firstOrFail();
                $wallets = [];
                $wallets[] = $data->from_wallet_id;
                if(!empty($data->to_wallet_id)){
                    $wallets[] = $data->to_wallet_id;
                }

                // Fetch shared wallet
                $sharedWallet = $shared->walletShareItem()->pluck('wallet_id')->toArray();
                // Validate if related record is part of shared wallet
                $is_included = false;
                foreach($wallets as $wallet){
                    if(!$is_included && in_array($wallet, $sharedWallet)){
                        $is_included = true;
                    }
                }

                // Invalidate data
                if(!$is_included){
                    $data = [];
                } else {
                    // Use formated
                    $data = new \App\Http\Resources\Record\ShowResource($data);
                }
            }
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', $data);
    }
}
