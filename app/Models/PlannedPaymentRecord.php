<?php

namespace App\Models;

use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlannedPaymentRecord extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'planned_payment_id',
        'record_id',
        'status',
        'period'
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
    //

    /**
     * Foreign Key Relation
     * 
     * @return model
     */
    public function plannedPayment()
    {
        return $this->belongsTo(\App\Models\PlannedPayment::class, 'planned_payment_id')
            ->withTrashed();
    }
    public function record()
    {
        return $this->belongsTo(\App\Models\Record::class, 'record_id')
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

        // Listen to Created Event
        static::created(function ($model){
            $planned = $model->plannedPayment;

            // Update state
            if($planned->repeat_type === 'recurring'){
                // Validate Max recurring
                if($planned->getNextPayment() !== true){
                    // No next planned payment, delete instead
                    $planned->delete();
                } else {
                    // Update next date
                    $planned->date_start = date('Y-m-d', strtotime($planned->date_start.' +'.$planned->repeat_frequency.' '.$planned->getRepeatPeriod().'s'));
                    $planned->save();
                }
            } else {
                // No next planned payment, delete instead
                $planned->delete();
            }
        });
    }
}
