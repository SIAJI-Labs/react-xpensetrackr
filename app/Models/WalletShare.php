<?php

namespace App\Models;

use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletShare extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'note',
        'passphrase',
        'valid_until',
        'token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'passphrase'
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
    public function walletShareItem()
    {
        return $this->belongsToMany(\App\Models\Wallet::class, (new \App\Models\WalletShareItem())->getTable())
            ->using(\App\Models\WalletShareItem::class)
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
     * Scope
     */
    public function scopeGetBalance()
    {
        $balance = 0;
        if($this->walletShareItem()->exists()){
            foreach($this->walletShareItem as $item){
                $tempBalance = $item->getBalance();

                $balance += $tempBalance;
            }
        }

        return $balance;
    }
}
