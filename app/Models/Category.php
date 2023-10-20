<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
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
        'icon',
        'color',
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
        return $this->hasMany(\App\Models\Category::class, 'parent_id')
            ->orderBy('order_main', 'asc')
            ->with('parent');
    }
    public function record()
    {
        return $this->hasMany(\App\Models\Record::class, 'category_id');
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
        return $this->belongsTo(\App\Models\Category::class, 'parent_id')
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
                $last_order = \App\Models\Category::where('parent_id', $model->{'parent_id'})
                    ->orderBy('order', 'desc')
                    ->first();

                $model->{'order'} = !empty($last_order) ? ($last_order->order + 1) : 1;
                $model->{'order_main'} = 0;
            } else {
                $last_order = \App\Models\Category::orderBy('order_main', 'desc')
                    ->first();

                $model->{'order'} = 0;
                $model->{'order_main'} = !empty($last_order) ? ($last_order->order_main + 1) : 0;
            }
        });

        // Listen to Created Event
        static::created(function ($model) {
            (new \App\Models\Category())->reorderCategoryPosition();
        });

        // Listen to Updated Event
        static::updated(function ($model) {
            // Listen to Parent change (without changing order)
            if($model->parent_id !== $model->getOriginal('parent_id') && $model->order_main === $model->getOriginal('order_main')){
                // Temporary update the order
                $model->order = 0;
                
                if(!empty($model->parent_id)){
                    $parent = $model->parent;
                    $last_order = \App\Models\Category::where('parent_id', $parent->id)
                        ->orderBy('order', 'desc')->first()?->order ?? 0;
    
                    // Move to latest
                    $model->order = $last_order + 1;
                } else {
                    $model->order = 0;
                }
                
                $model->saveQuietly();

                // Update order
                (new \App\Models\Category())->reorderCategoryPosition();
            }
        });

        // Listen to Deleting Event
        static::deleted(function ($model) {
            $model->order = -1;
            $model->order_main = -1;
            $model->saveQuietly();

            // Update order
            // (new \App\Models\Category())->reorderCategoryPosition();
        });
    }

    /**
     * Custom Function
     * 
     * Adjust Category order
     */
    public function reorderCategoryPosition()
    {
        $main = \App\Models\Category::whereNull('parent_id')
            ->orderBy('order_main', 'asc')
            ->get();

        $order_main = 0;
        foreach($main as $category){
            $category->order_main = $order_main;
            $category->saveQuietly();

            $order_main += 1;
            if($category->child()->exists()){
                foreach($category->child()->orderBy('order')->get() as $child){
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
     */
    public function scopeGetDefaultCategory()
    {
        return [
            [
                'name' => 'Life & Entertainment',
                'icon' => null,
                'color' => null,
                'sub' => [
                    [
                        'name' => 'Beauty',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Education',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Hobbies',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Health Care',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Holiday',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Shopping',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Sport',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Subscription',
                        'icon' => null,
                        'color' => null,
                    ],
                ],
            ], [
                'name' => 'Food & Drink',
                'icon' => null,
                'color' => null,
                'sub' => [
                    [
                        'name' => 'Cafe',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Fast Food',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Groceries',
                        'icon' => null,
                        'color' => null,
                    ],
                ],
            ], [
                'name' => 'Housing',
                'icon' => null,
                'color' => null,
                'sub' => [
                    [
                        'name' => 'Bill',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Energy',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Maintenance',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Rent',
                        'icon' => null,
                        'color' => null,
                    ],
                ],
            ], [
                'name' => 'Transportation',
                'icon' => null,
                'color' => null,
                'sub' => [
                    [
                        'name' => 'Business Trip',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Public Transport',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Taxi',
                        'icon' => null,
                        'color' => null,
                    ],
                ],
            ], [
                'name' => 'Vehicle',
                'icon' => null,
                'color' => null,
                'sub' => [
                    [
                        'name' => 'Fuel',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Insurance',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Maintenance',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Parking',
                        'icon' => null,
                        'color' => null,
                    ], 
                ],
            ], [
                'name' => 'Income',
                'icon' => null,
                'color' => null,
                'sub' => [
                    [
                        'name' => 'Child Support',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Gift',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Invoice',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Interest',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Salary',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Other',
                        'icon' => null,
                        'color' => null,
                    ],
                ],
            ], [
                'name' => 'Expense',
                'icon' => null,
                'color' => null,
                'sub' => [
                    [
                        'name' => 'Bill',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Child Support',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Charge',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Fines',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Tax',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Other',
                        'icon' => null,
                        'color' => null,
                    ],
                ],
            ], [
                'name' => 'Other',
                'icon' => null,
                'color' => null,
                'sub' => [
                    [
                        'name' => 'Adjustment',
                        'icon' => null,
                        'color' => null,
                    ], [
                        'name' => 'Missing',
                        'icon' => null,
                        'color' => null,
                    ], 
                ],
            ],
        ];
    }
    public function scopeGetLastTransaction($query)
    {
        $result = [];

        $data = $this->record()->orderBy('datetime', 'desc')->first();
        if(!empty($data)){
            $result = $data;
        }

        return $result;
    }
}
