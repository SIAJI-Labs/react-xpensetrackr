<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use NotificationChannels\WebPush\HasPushSubscriptions;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasPushSubscriptions;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /*
     * Primary Key Relation
     * 
     * @return model
     */
    public function userPreference()
    {
        return $this->hasMany(\App\Models\UserPreference::class, 'user_id');
    }
    public function notification()
    {
        return $this->hasMany(\App\Models\Notification::class, 'user_id');
    }
    public function category()
    {
        return $this->hasMany(\App\Models\Category::class, 'user_id');
    }
    public function wallet()
    {
        return $this->hasMany(\App\Models\Wallet::class, 'user_id');
    }
    public function tags()
    {
        return $this->hasMany(\App\Models\Tags::class, 'user_id');
    }
    public function record()
    {
        return $this->hasMany(\App\Models\Record::class, 'user_id');
    }
    public function plannedPayment()
    {
        return $this->hasMany(\App\Models\PlannedPayment::class, 'user_id');
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
        static::created(function($model) {
            // Sent registration confirmation mail
            // $mailable = new \App\Mail\Auth\RegistrationMail($model);
            // dispatch(new \App\Jobs\SendEmailJob($model->email, $mailable));
        });

        // Listen to Deleted Event
        static::deleting(function($model) {
            // Remove all push notification
            DB::table('push_subscriptions')
                ->where('subscribable_type', get_class($model))
                ->where('subscribable_id', $model->id)
                ->delete();
        });
    }

    /**
     * Scope
     * 
     * Fetch related preference
     */
    public function scopeGetPreference($query, $key = 'timezone')
    {
        $value = [];

        // Check if key is exists on database
        $data = $this->userPreference()->where('key', $key)
            ->first();
        if(!empty($data)){
            $value  = $data->value;
        } else {
            // Handle default value
            $value = match($key){
                'pagination' => env('PAGINATION_DEFAULT', 5),
                default => []
            };
        }

        return $value;
    }
    
    /**
     * Scope
     * 
     * Fetch avatar
     */
    public function scopeGetAvatar($query, $type = null)
    {
        // Avatar lists
        $avatar_list = config('siaji.list_of.avatar');
        // Base URL (for avatar API)
        $base = 'https://api.dicebear.com/6.x';
        $selected = !empty($type) ? $type : (!empty($this->avatar) && in_array($this->avatar, $avatar_list) ? $this->avatar : 'initials');

        $avatar = null;
        if(empty($type) && !empty($this->avatar)){
            if(in_array($this->avatar, $avatar_list)){
                $avatar = $base.'/'.camel2dashed($selected).'/svg?seed='.$this->name;
            } else if(Storage::exists($this->avatar)){
                $avatar = asset($this->avatar);
            }
        } else if(!empty($type)){
            if(in_array($type, $avatar_list)){
                $avatar = $base.'/'.camel2dashed($type).'/svg?seed='.$this->name;
            }
        }

        // Default avatar
        if(empty($avatar)){
            $avatar = $base.'/'.camel2dashed('initials').'/svg?seed='.$this->name;
        }
        
        return $avatar;
    }
    public function scopeGetAvatarType()
    {
        // Avatar lists
        $avatar_list = config('siaji.list_of.avatar');
        $avatar = 'template';
        if(!empty($this->avatar) && !in_array($this->avatar, $avatar_list) && Storage::exists($this->avatar)){
            $avatar = 'custom';
        }

        return $avatar;
    }
    public function scopeGetAvatarAttribution($query, $avatar = null)
    {
        $attribution = config('siaji.list_of.avatar_attribution');
        if(empty($avatar)){
            $avatar = $this->avatar ?? 'initials';
        }

        return isset($attribution[$avatar]) ? $attribution[$avatar] : [];
    }

    /**
     * Scope
     * 
     * Fetch user state (check if user already had specific data)
     */
    public function scopeRegistrationState($query, $key = null)
    {
        $is_finished = false;

        // Count wallet
        $wallet_count = $this->wallet()->count();
        // Count category
        $category_count = $this->category()->count();
        // Check Timezone
        $timezone = !empty($this->getPreference('timezone'));

        if(!empty($key)){
            // Check state based on related key
            switch($key){
                case 'username':
                    $is_finished = !empty($this->username);
                    break;
                case 'wallet':
                    $is_finished = $wallet_count > 0;
                    break;
                case 'category':
                    $is_finished = $category_count > 0;
                    break;
                case 'timezone':
                    $is_finished = $timezone;
                    break;
            }
        } else {
            // Check username & timezone are exists
            if(!empty($this->username) && $timezone){
                if($wallet_count > 0 && $category_count > 0){
                    $is_finished = true;
                }
            }
        }

        // Bypass for testing
        if(env('APP_ENV') === 'testing'){
            $is_finished = true;
        }

        return $is_finished;
    }

    /**
     * Scope
     * 
     * Fetch user datetime based on timezone
     */
    public function scopeUserDatetime($query, $timestamp = null)
    {
        $date = date('Y-m-d H:i:s');
        if(!empty($timestamp)){
            $date = date('Y-m-d H:i:s', strtotime($timestamp));
        }

        $timezone = $this->getPreference('timezone') ?? 'UTC';
        if(!empty($timezone)){
            $formated = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date, $timezone);
            $date = $formated->setTimezone('UTC')->format('Y-m-d H:i:s');
        }

        return $date;
    }
}
