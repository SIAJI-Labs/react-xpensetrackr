<?php

namespace App\Models;

use Illuminate\Support\Str;
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
            ->orderBy('order_main', 'asc')
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

        return $startingBalance + $balance->sum(\DB::raw('(amount + extra_amount) * IF(type = "expense", -1, 1)'));
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
}

