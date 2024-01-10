<?php

namespace App\Models;

use DateTime;
use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Budget extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'amount',
        'repetition',
        'interval',
        'start',
        'end'
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
    public function budgetCategory()
    {
        return $this->belongsToMany(\App\Models\Category::class, (new \App\Models\BudgetCategory())->getTable())
            ->using(\App\Models\BudgetCategory::class)
            ->withPivot('created_at', 'updated_at')
            ->withTimestamps();
    }
    public function budgetTags()
    {
        return $this->belongsToMany(\App\Models\Tags::class, (new \App\Models\BudgetTags())->getTable())
            ->using(\App\Models\BudgetTags::class)
            ->withPivot('created_at', 'updated_at')
            ->withTimestamps();
    }
    public function budgetWallet()
    {
        return $this->belongsToMany(\App\Models\Wallet::class, (new \App\Models\BudgetWallet())->getTable())
            ->using(\App\Models\BudgetWallet::class)
            ->withPivot('created_at', 'updated_at')
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
    }

    /**
     * Mutator & Accessor
     * 
     * Set start date
     */
    protected function start(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: function($value){
                if($this->repetition === 'repeat'){
                    // Set related date
                    switch($this->interval){
                        case 'weekly':
                            // Get first monday of the week
                            $value = date('Y-m-d', strtotime('monday this week'));
                            break;
                        case 'monthly':
                            // Get first day of the month
                            $value = date('Y-m-01');
                            break;
                        case 'yearly':
                            // Get first day of the month
                            $value = date('Y-01-01');
                            break;
                        default:
                            $value = date('Y-m-d');
                            break;
                    }
                }

                // Set to 00:00:00
                $value = date('Y-m-d', strtotime($value)).' 00:00:00';

                // Check if user had timezone
                if(!empty($this->user->getPreference('timezone'))){
                    // Set UTC
                    $tz_utc = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $value, 'UTC');
                    // Get User Timezone
                    $tz_user = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $value, 'UTC');
                    $tz_user->setTimezone($this->user->getPreference('timezone'))->format('Y-m-d H:i:s');

                    // Get second different
                    $diff = strtotime($value) - strtotime(date('Y-m-d H:i:s', strtotime($tz_user)));
                    $value = date('Y-m-d H:i:s', strtotime($value.' '.($diff / 60).' minutes'));
                }

                // Timestamp in UTC
                return $value;
            }
        );
    }

    /**
     * Mutator & Accessor
     * 
     * Set end date
     */
    protected function end(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: function($value){
                if($this->repetition === 'repeat'){
                    // Set related date
                    switch($this->interval){
                        case 'weekly':
                            // Get last day of the week
                            $value = date('Y-m-d', strtotime('sunday this week'));
                            break;
                        case 'monthly':
                            // Get last day of the month
                            $value = date('Y-m-t');
                            break;
                        case 'yearly':
                            // Get last day of the year
                            $value = date('Y-01-01');
                            break;
                        default:
                            $value = date('Y-m-d');
                            break;
                    }
                }

                // Set to 00:00:00
                $value = date('Y-m-d', strtotime($value)).' 23:59:59';

                // Check if user had timezone
                if(!empty($this->user->getPreference('timezone'))){
                    // Set UTC
                    $tz_utc = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $value, 'UTC');
                    // Get User Timezone
                    $tz_user = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $value, 'UTC');
                    $tz_user->setTimezone($this->user->getPreference('timezone'))->format('Y-m-d H:i:s');

                    // Get second different
                    $diff = strtotime($value) - strtotime(date('Y-m-d H:i:s', strtotime($tz_user)));
                    $value = date('Y-m-d H:i:s', strtotime($value.' '.($diff / 60).' minutes'));
                }

                // Timestamp in UTC
                return $value;
            }
        );
    }

    /**
     * Scope
     * 
     * Get remaining amount
     */
    public function scopeGetRemainingAmount($query, $start = null, $end = null)
    {
        $amount = $this->amount;

        $calculate = max(0, $amount - $this->getUsedAmount($start, $end));
        return $calculate;
    }

    /**
     * Scope
     * 
     * Get used amount
     */
    public function scopeGetUsedAmount($query, $start = null, $end = null)
    {
        $amount = 0;

        if(empty($start)){
            $start = $this->start;
        }
        if(empty($end)){
            $end = $this->end;
        }

        if(!empty($this->getRecordId($start, $end))){
            $amount = \App\Models\Record::whereIn('id', $this->getRecordId($start, $end))
                ->sum(DB::raw('amount + extra_amount'));
        }

        return $amount;
    }

    /**
     * Scope
     * 
     * Get related record with matching condition
     */
    public function scopeGetRecordId($query, $start = null, $end = null)
    {
        $data = [];
        // Fetch Condition
        $include = [
            'category' => $this->budgetCategory()
                ->pluck((new \App\Models\Category())->getTable().'.id')
                ->toArray(),
            'wallet' => $this->budgetWallet()
                ->pluck((new \App\Models\Wallet())->getTable().'.id')
                ->toArray(),
            'tags' => $this->budgetTags()
                ->pluck((new \App\Models\Tags())->getTable().'.id')
                ->toArray()
        ];

        // Validate period
        if(empty($start)){
            $start = $this->start;
        }
        if(empty($end)){
            $end = $this->end;
        }

        // Validate condition
        if((isset($include['category']) && count($include['category']) <= 0) && (isset($include['wallet']) && count($include['wallet']) <= 0) && (isset($include['tags']) && count($include['tags']) <= 0)){
            $include = [];
        }

        if(isset($include) && (isset($include['category']) || isset($include['wallet']) || isset($include['tags']))){
            $data = \App\Models\Record::query()
                ->select((new \App\Models\Record())->getTable().'.*')
                ->where('user_id', $this->user_id)
                ->where('type', 'expense')
                ->where('is_pending', false)
                ->whereBetween('datetime', [$start, $end]);

            // Apply Include condition
            if(isset($include) && isset($include['category']) && !empty($include['category'])){
                $data->whereIn('category_id', $include['category']);
            }
            if(isset($include) && isset($include['tags']) && !empty($include['tags'])){
                $data->join((new \App\Models\RecordTags())->getTable(), (new \App\Models\RecordTags())->getTable().'.record_id', '=', (new \App\Models\Record())->getTable().'.id')
                    ->whereIn((new \App\Models\RecordTags())->getTable().'.tags_id', $include['tags']);
            }
            if(isset($include) && isset($include['wallet']) && !empty($include['wallet'])){
                $data->whereIn('from_wallet_id', $include['wallet']);
            }

            $data = $data->get()->pluck('id')->toArray();
        }

        // \Log::debug("Debug on Budget Model", [
        //     'include' => $include,
        //     'start' => $start,
        //     'end' => $end,
        //     'validate' => [
        //         'category' => isset($include) && isset($include['category']) && !empty($include['category']),
        //         'wallet' => isset($include) && isset($include['wallet']) && !empty($include['wallet']),
        //         'tags' => isset($include) && isset($include['tags']) && !empty($include['tags'])
        //     ],
        //     'data' => $data
        // ]);

        return $data;
    }

    /**
     * Scope
     * 
     * Get interval days range
     */
    public function scopeGetIntervalDaysRange($query)
    {
        $result = 0;

        // Calculate days difference
        $startDateString = $this->start;
        $endDateString = $this->end;

        // Create DateTime objects from the date strings
        $start = new DateTime($startDateString);
        $end = new DateTime($endDateString);

        // Calculate the difference between the two dates
        $interval = $start->diff($end);
        // Get the number of days from the interval
        $result = $interval->days;
        
        return $result;
    }
}
