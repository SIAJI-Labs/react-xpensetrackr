<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'type',
        'from_wallet_id',
        'to_wallet_id',
        'amount',
        'extra_type',
        'extra_percentage',
        'extra_amount',
        'date',
        'time',
        'datetime',
        'note',
        'timezone',
        'is_pending'
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
    
    /**
     * Foreign Key Relation
     * 
     * @return model
     */
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
    public function fromWallet()
    {
        return $this->belongsTo(\App\Models\Wallet::class, 'from_wallet_id')
            ->with('parent')
            ->withTrashed();
    }
    public function toWallet()
    {
        return $this->belongsTo(\App\Models\Wallet::class, 'to_wallet_id')
            ->with('parent')
            ->withTrashed();
    }
    public function category()
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id')
            ->with('parent')
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
            $model->{'uuid'} = Str::uuid()->toString();
        });

        // Listen to Created
        static::created(function ($model) {
            // Create related transfer record
            if($model->{'type'} === 'expense' && !empty($model->{'to_wallet_id'})){
                // Create new record for income data
                $related = new \App\Models\Record();
                $related->uuid = Str::uuid()->toString();
                $related->user_id = $model->{'user_id'};
                $related->type = 'income';
                $related->category_id = $model->{'category_id'};
                $related->from_wallet_id = $model->{'to_wallet_id'};
                $related->to_wallet_id = $model->{'from_wallet_id'};
                $related->amount = $model->{'amount'};
                $related->extra_type = $model->{'extra_type'};
                $related->extra_percentage = 0;
                $related->extra_amount = 0;
                $related->date = $model->{'date'};
                $related->time = $model->{'time'};
                $related->datetime = $model->{'datetime'};
                $related->note = $model->{'note'};
                $related->timezone = $model->{'timezone'};
                $related->is_pending = $model->{'is_pending'};
                $related->saveQuietly();
            }
        });

        // Listen to Updated Event
        static::updated(function ($model) {
            // Check if record type is changed
            $previous_was_transfer = !empty($model->getOriginal('to_wallet_id'));

            if($previous_was_transfer){
                // Fetch related data
                $related_id = (new \App\Models\Record($model->getOriginal()))->getRelated()->id;
                $related = \App\Models\Record::find($related_id);

                // Only update on related income (because expense record already updated from related controller / livewire)
                if($related->type === 'income'){
                    if(!empty($model->to_wallet_id)){
                        // Type is not changed, thus update related data (income)
                        $related->user_id = $model->{'user_id'};
                        $related->type = 'income';
                        $related->category_id = $model->{'category_id'};
                        $related->from_wallet_id = $model->{'to_wallet_id'};
                        $related->to_wallet_id = $model->{'from_wallet_id'};
                        $related->amount = $model->{'amount'};
                        $related->extra_type = $model->{'extra_type'};
                        $related->extra_percentage = 0;
                        $related->extra_amount = 0;
                        $related->date = $model->{'date'};
                        $related->time = $model->{'time'};
                        $related->datetime = $model->{'datetime'};
                        $related->note = $model->{'note'};
                        $related->timezone = $model->{'timezone'};
                        $related->is_pending = $model->{'is_pending'};
                        $related->saveQuietly();
                    } else {
                        // Type is changed from transfer to either expense or income, thus remove relaled
                        if(!empty($related)){
                            $related->delete();
                        }
                    }
                }
            } else {
                // Check if target type is transfer
                if($model->type === 'expense' && !empty($model->to_wallet_id)){
                    // Create new record for income data
                    $related = new \App\Models\Record();
                    $related->uuid = Str::uuid()->toString();
                    $related->user_id = $model->{'user_id'};
                    $related->type = 'income';
                    $related->category_id = $model->{'category_id'};
                    $related->from_wallet_id = $model->{'to_wallet_id'};
                    $related->to_wallet_id = $model->{'from_wallet_id'};
                    $related->amount = $model->{'amount'};
                    $related->extra_type = $model->{'extra_type'};
                    $related->extra_percentage = 0;
                    $related->extra_amount = 0;
                    $related->date = $model->{'date'};
                    $related->time = $model->{'time'};
                    $related->datetime = $model->{'datetime'};
                    $related->note = $model->{'note'};
                    $related->timezone = $model->{'timezone'};
                    $related->is_pending = $model->{'is_pending'};
                    $related->saveQuietly();
                }
            }
        });

        // Listen to Deleted Event
        static::deleted(function ($model) {
            // Check if record type is changed
            $previous_was_transfer = !empty($model->getOriginal('to_wallet_id'));

            if($previous_was_transfer){
                // Fetch related data
                if(get_class((new \App\Models\Record($model->getOriginal()))->getRelated()) === get_class((new \App\Models\Record()))){
                    $related_id = (new \App\Models\Record($model->getOriginal()))->getRelated()->id;
                    $related = \App\Models\Record::find($related_id);
                    // Only update on related income
                    $related->delete();
                }
            }
        });
    }

    /**
     * Scope
     * 
     * Get final amount
     */
    public function scopeGetFinalAmount()
    {
        $final_amount = $this->amount;

        // Check if extra amount is exists
        if($this->extra_amount > 0){
            $final_amount += $this->extra_amount;
        }

        return $final_amount;
    }

    /**
     * Scope
     * 
     * Get related record
     */
    public function scopeGetRelated($query, $to_wallet_id = null)
    {
        $related = [];
        // Set default To Wallet
        if(empty($to_wallet_id)){
            $to_wallet_id = $this->to_wallet_id;
        }

        if(!empty($to_wallet_id)){
            $related = $this->where('user_id', $this->user_id)
                ->where('type', $this->type === 'expense' ? 'income' : 'expense')
                ->where('from_wallet_id', $to_wallet_id)
                ->where('to_wallet_id', $this->from_wallet_id)
                ->where('amount', $this->amount)
                ->where('extra_type', $this->extra_type)
                ->where('note', $this->note)
                ->where('datetime', $this->datetime)
                ->first();
        }

        return $related;
    }

    /**
     * Scope
     * 
     * Get pending count
     */
    public function scopeGetPending()
    {
        return $this->where('is_pending', true);
    }
}
