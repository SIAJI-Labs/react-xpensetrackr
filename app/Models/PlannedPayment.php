<?php

namespace App\Models;

use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlannedPayment extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'category_id',
        'type',
        'from_wallet_id',
        'to_wallet_id',
        'amount',
        'extra_type',
        'extra_percentage',
        'extra_amount',
        'date_start',
        'date_start_temp',
        'repeat_type',
        'repeat_frequency',
        'repeat_period',
        'repeat_until',
        'until_number',
        'note'
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
    public function plannedPaymentTags()
    {
        return $this->belongsToMany(\App\Models\Tags::class, 'planned_payment_tags', 'planned_payment_id', 'tags_id')
            ->withPivot('tags_id')
            ->using(\App\Models\PlannedPaymentTags::class)
            ->orderBy('name', 'asc')
            ->withTimestamps();
    }
    public function plannedPaymentRecord()
    {
        return $this->hasMany(\App\Models\PlannedPaymentRecord::class, 'planned_payment_id')
            ->orderBy('period', 'desc');
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
    public function category()
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id')
            ->with('parent');
    }
    public function fromWallet()
    {
        return $this->belongsTo(\App\Models\Wallet::class, 'from_wallet_id')
            ->with('parent');
    }
    public function toWallet()
    {
        return $this->belongsTo(\App\Models\Wallet::class, 'to_wallet_id')
            ->with('parent');
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

        // Listen to Create Event
        static::updating(function ($model) {
            // Validate last day of the month recurring payment
            if(in_array($model->repeat_period, ['monthly', 'yearly'])){
                // Get Original Date Start
                $original_date = $model->getOriginal('date_start');
                $original_date_temp = $model->getOriginal('date_start');

                // Get first day of next month
                $original_first_date = date('Y-m-d', strtotime(date('Y-m-01', strtotime($original_date)).' +1 months'));
                if(date('d', strtotime($original_date)) > date('t', strtotime($original_first_date))){
                    $model->date_start = date('Y-m-t', strtotime($original_first_date));
                    $model->date_start_temp = $original_date;
                } else {
                    if(!empty($original_date_temp) && !empty($model->date_start_temp)){
                        // Previous period is manipulate
                        $model->date_start = date('Y-m-d', strtotime(date('Y-m', strtotime($model->date_start)).'-'.date('d', strtotime($model->date_start_temp))));
                    }

                    $model->date_start_temp = null;
                }
            }
        });
    }

    /**
     * Scope
     * 
     * Validate if next period exists
     */
    public function scopeGetNextPayment()
    {
        $result = true;
        // Occuring only once
        if($this->repeat_type !== 'recurring' && $this->plannedPaymentRecord()->count() > 0){
            $result = [];
        }

        // Repeat, validate limit
        if($this->repeat_until !== 'forever'){
            // 
        }

        return $result;
    }

    /**
     * Scope
     * 
     * Get formated for repeat type
     */
    public function scopeGetRepeatPeriod()
    {
        $period = 'day';
        switch($this->repeat_period){
            case 'weekly':
                $period = 'week';
                break;
            case 'monthly':
                $period = 'month';
                break;
            case 'yearly':
                $period = 'year';
                break;
        }

        return $period;
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
}
