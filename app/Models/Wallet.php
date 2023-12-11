<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'parent_id',
        'name',
        'type',
        'starting_balance',
        'order',
        'order_main'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        // 
    ];
    
    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * Primary Key Relation
     * 
     * @return model
     */
    public function child()
    {
        return $this->hasMany(\App\Models\Wallet::class, 'parent_id')
            ->orderBy('order', 'asc')
            ->with('parent');
    }
    public function record()
    {
        return $this->hasMany(\App\Models\Record::class, 'from_wallet_id');
    }
    public function recordRelated()
    {
        return $this->hasMany(\App\Models\Record::class, 'to_wallet_id');
    }
    public function plannedPayment()
    {
        return $this->hasMany(\App\Models\PlannedPayment::class, 'from_wallet_id');
    }
    public function plannedPaymentRelated()
    {
        return $this->hasMany(\App\Models\PlannedPayment::class, 'to_wallet_id');
    }
    public function walletGroup()
    {
        return $this->belongsToMany(\App\Models\WalletGroup::class, 'wallet_groups', 'group_id', 'wallet_id')
            ->withPivot('wallet_id')
            ->using(\App\Models\WalletGroupItem::class)
            ->orderBy('name', 'asc')
            ->withTimestamps();
    }

    /**
     * Foreign Key Relation
     * 
     * @return model
     */
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
    public function parent()
    {
        return $this->belongsTo(\App\Models\Wallet::class, 'parent_id')
            ->withTrashed();
    }

    /**
     * The "boot" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        // Listen to Create Event
        static::creating(function ($model) {
            // Always generate UUID on Data Create
            $model->{'uuid'} = (string) Str::uuid();
            $raw = $model;
            $last_order = null;

            // Check order
            if(!empty($model->{'parent_id'})){
                $last_order = \App\Models\Wallet::where('parent_id', $model->{'parent_id'})
                    ->orderBy('order', 'desc')
                    ->first();

                $model->{'order'} = !empty($last_order) ? ($last_order->order + 1) : 1;
                $model->{'order_main'} = 0;
            } else {
                $last_order = \App\Models\Wallet::orderBy('order_main', 'desc')
                    ->first();

                $model->{'order'} = 0;
                $model->{'order_main'} = !empty($last_order) ? ($last_order->order_main + 1) : 0;
            }
        });

        // Listen to Created Event
        static::created(function ($model) {
            (new \App\Models\Wallet())->reorderWalletPosition($model);
        });

        // Listen to Updated Event
        static::updated(function ($model) {
            // Listen to Parent change (without changing order)
            if($model->parent_id !== $model->getOriginal('parent_id')){
                // Temporary update the order
                $model->order = 0;
                
                if(!empty($model->parent_id)){
                    $parent = $model->parent;
                    $last_order = \App\Models\Wallet::where('parent_id', $parent->id)
                        ->orderBy('order', 'desc')->first()?->order ?? 0;
    
                    // Move to latest
                    $model->order = $last_order + 1;
                } else {
                    $model->order = 0;
                }
                
                $model->saveQuietly();

                // Update order
                (new \App\Models\Wallet())->reorderWalletPosition($model);
            }
        });

        // Listen to Deleting Event
        static::deleted(function ($model) {
            $model->order = -1;
            $model->order_main = -1;
            $model->saveQuietly();

            // Update order
            // (new \App\Models\Wallet())->reorderWalletPosition();
        });
    }

    /**
     * Scope
     * 
     * Get Wallet Balance
     */
    public function scopeGetBalance()
    {
        // Fetch starting balance
        $startingBalance = 0;
        if(!empty($this->starting_balance)){
            $startingBalance = $this->starting_balance;
        }

        $balance = $this->record()
            ->where('is_pending', false);

        // Sort balance
        $balance->orderBy('datetime', 'desc')
            ->orderBy('created_at', 'desc');

        return $startingBalance + $balance->sum(DB::raw('(amount + extra_amount) * IF(type = "expense", -1, 1)'));
    }

    /**
     * Custom Function
     * 
     * Adjust wallet order
     */
    public function reorderWalletPosition($model = null)
    {
        $main = \App\Models\Wallet::whereNull('parent_id')
            ->where('user_id', !empty($model) ? $model->user_id : -1)
            ->orderBy('order_main', 'asc')
            ->get();

        $order_main = 0;
        foreach($main as $wallet){
            $order = 0;

            $wallet->order = $order;
            $wallet->order_main = $order_main;
            $wallet->saveQuietly();

            $order_main += 1;
            if($wallet->child()->exists()){
                foreach($wallet->child()->orderBy('order')->get() as $child){
                    $order+= 1;

                    $child->order = $order;
                    $child->order_main = $order_main;
                    $child->saveQuietly();

                    $order_main += 1;
                }
            }
        }
    }

    /**
     * Scope
     * 
     * Get present or future projection
     */
    public function scopeGetExpectedProjection($query, $calc_period)
    {
        $expected_planned_income = [];
        $expected_planned_expense = [];
        $expected_income = 0;
        $expected_expense = 0;

        foreach(['plannedPayment', 'plannedPaymentRelated'] as $source){
            // Loop through planned payment (income / expense)
            foreach($this->{$source} as $planned){
                $planned_period = $planned->date_start;

                do {
                    $loop = false;

                    // Check if current loop period is still within calculation (same month & year)
                    if(
                        date('Y', strtotime($planned_period)) === date('Y', strtotime($calc_period))
                        && date('m', strtotime($planned_period)) === date('m', strtotime($calc_period))
                    ){
                        if($source === 'plannedPayment'){
                            // Validate if data already exists in expected_planned variable
                            if($planned->type === 'income'){
                                $expected_income += $planned->getFinalAmount();
                                $expected_planned_income[] = [
                                    'id' => $planned->id,
                                    'period' => $planned_period
                                ];
                            }
                            if($planned->type === 'expense' || ($planned->type === 'transfer')){
                                $expected_expense += $planned->getFinalAmount();
                                $expected_planned_expense[] = [
                                    'id' => $planned->id,
                                    'period' => $planned_period
                                ];
                            }
                        } else {
                            $expected_income += $planned->getFinalAmount();
                            $expected_planned_income[] = [
                                'id' => $planned->id,
                                'period' => $planned_period
                            ];
                        }
                    }

                    // Loop if planned period is still below active period
                    $next_period = null;
                    if(in_array($planned->repeat_period, ['daily', 'weekly'])){
                        if(date('Y-m-d', strtotime($planned_period)) <= date('Y-m-t', strtotime($calc_period))){
                            $next_period = date('Y-m-d', strtotime($planned_period.' +'.$planned->repeat_frequency.' '.$planned->getRepeatPeriod()));
                        }
                    } else {
                        if(date('Y-m', strtotime($planned_period)) < date('Y-m', strtotime($calc_period))){
                            $next_period = date('Y-m-01', strtotime($planned_period.' +'.$planned->repeat_frequency.' '.$planned->getRepeatPeriod()));
                        }
                    }
                    if(!empty($next_period)){
                        $loop = true;
                        $planned_period = $next_period;
                    }

                    // Override loop if occurence happening once
                    if($planned->repeat_type === 'once'){
                        $loop = false;
                    }
                } while($loop);
            }
        }

        return [
            'expected_planned_income' => $expected_planned_income,
            'expected_planned_expense' => $expected_planned_expense,
            'expected_income' => $expected_income,
            'expected_expense' => $expected_expense,
        ];
    }

    /**
     * Scope
     * 
     * Get expected plannad payment
     */
    public function scopeGetExpectedPlannedPayment($query, $period, $type, $action = 'sum', $override_id = null)
    {
        $id = $this->id;
        if(!empty($override_id)){
            $id = $override_id;
        }
        $result = 0;
        
        if(date('Y-m-01') === $period){ // Current period
            $base_query = \App\Models\PlannedPayment::whereMonth('date_start', date('m', strtotime($period)))
                ->whereYear('date_start', date('Y', strtotime($period)))
                ->where(function($q) use ($type, $id){
                    if($type === 'expense'){
                        return $q->where(function($q) use ($id){
                                return $q->where('from_wallet_id', $id)
                                    ->where('type', 'expense');
                            })
                            ->orWhere(function($q) use ($id){
                                return $q->where('from_wallet_id', $id)
                                    ->where('type', 'transfer')
                                    ->where('to_wallet_id', '!=', $id);
                            });
                    } else if($type === 'income') {
                        return $q->where(function($q) use ($id){
                                return $q->where('from_wallet_id', $id)
                                    ->where('type', 'income');
                            })
                            ->orWhere(function($q) use ($id){
                                return $q->where('from_wallet_id', '!=', $id)
                                    ->where('type', 'transfer')
                                    ->where('to_wallet_id', $id);
                            });
                    }
                });
                
            $result = $action === 'sum' ? $base_query->sum(DB::raw($type === 'expense' ? '(amount + extra_amount)' : 'amount')) : $base_query->count();
        } else {
            if($period < date('Y-m-01')){ // Previous period
                // Query Builder - Income
                $toIncome = [];
                if($type === 'income'){
                    $toIncome = \App\Models\Record::select((new \App\Models\Record())->getTable().'.*')
                        ->where((new \App\Models\Record())->getTable().'.user_id', $this->user->id)
                        // ->where((new \App\Models\Record())->getTable().'.type', 'income')
                        ->where((new \App\Models\Record())->getTable().'.to_wallet_id', $id)
                        ->join((new \App\Models\PlannedPaymentRecord())->getTable(), (new \App\Models\PlannedPaymentRecord())->getTable().'.record_id', '=', (new \App\Models\Record())->getTable().'.id')
                        ->whereMonth((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('m', strtotime($period)))
                        ->whereYear((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('Y', strtotime($period)))
                        ->pluck((new \App\Models\Record())->getTable().'.id')
                        ->toArray();
                }
                
                // Query Builder
                $record = \App\Models\Record::select((new \App\Models\Record())->getTable().'.*')
                    ->where((new \App\Models\Record())->getTable().'.user_id', $this->user->id)
                    ->where((new \App\Models\Record())->getTable().'.type', $type)
                    ->where((new \App\Models\Record())->getTable().'.from_wallet_id', $id)
                    ->join((new \App\Models\PlannedPaymentRecord())->getTable(), (new \App\Models\PlannedPaymentRecord())->getTable().'.record_id', '=', (new \App\Models\Record())->getTable().'.id')
                    ->whereMonth((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('m', strtotime($period)))
                    ->whereYear((new \App\Models\PlannedPaymentRecord())->getTable().'.period', date('Y', strtotime($period)))
                    ->pluck((new \App\Models\Record())->getTable().'.id')
                    ->toArray();

                // Merge array
                $array = array_unique(array_merge($toIncome, $record));

                // Result
                $base_query = \App\Models\Record::whereIn('id', $array);
                $result = $action === 'sum' ? $base_query->sum(DB::raw($type === 'expense' ? '(amount + extra_amount)' : 'amount')) : $base_query->count();
            }
        }

        return $result;
    }
}

