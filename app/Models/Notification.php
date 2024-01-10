<?php

namespace App\Models;

use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Notification extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'model',
        'model_id',
        'type',
        'message',
        'is_seen'
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
        'message' => 'array'
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

        // Listen to Created Event
        static::created(function ($model) {
            $user = $model->user;

            if(in_array($model->type, [
                'plannedPayment-reminder', 'pendingRecord-reminder'
            ])){
                // \Log::debug("Debug on Push Notification", [
                //     'preference' => $user->getPreference('has_notification') !== [] && in_array($user->getPreference('has_notification'), ['1', 'true']) ? true : false,
                //     'message' => [
                //         'validation' => !empty(json_decode($model->message, true)) && is_array(json_decode($model->message, true)) ? true : false,
                //         'data' => json_decode($model->message, true)
                //     ]
                // ]);

                // Check if user had push configuration
                if($user->getPreference('has_notification') !== [] && in_array($user->getPreference('has_notification'), ['1', 'true'])){
                    if(!empty(json_decode($model->message, true)) && is_array(json_decode($model->message, true))){
                        // Validate if user is subcribed to web push
                        $web_push = DB::table('push_subscriptions')
                            ->where('subscribable_type', get_class($user))
                            ->where('subscribable_id', $user->id)
                            ->first();

                        // \Log::info("Info at Web Push User", [
                        //     'data' => $web_push
                        // ]);
    
                        if(!empty($web_push)){
                            $data = json_decode($model->message, true);
    
                            // Send push Notification
                            $notification = new \App\Notifications\Push\WebPushNotification($data);
                            \Illuminate\Support\Facades\Notification::send($user, $notification);
                        }
                    }
                }
            }
        });
    }
}
