<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Guest
Route::group([
    'as' => 'api.',
], function(){
    // Authentication
    Route::group([
        'prefix' => 'auth',
        'as' => 'auth.'
    ], function(){
        // v1
        Route::group([
            'prefix' => 'v1',
            'as' => 'v1.'
        ], function(){
            // Login
            Route::post('login', [\App\Http\Controllers\Api\v1\Auth\LoginController::class, 'login'])->name('login');
        });
    });
});

// Auth
Route::group([
    'as' => 'api.',
    'middleware' => ['auth:sanctum']
], function(){
    // Quick Action
    Route::group([
        'prefix' => 'quick-action',
        'as' => 'quick-action.'
    ], function(){
        // v1
        Route::group([
            'prefix' => 'v1',
            'as' => 'v1.'
        ], function(){
            // Record
            Route::group([
                'prefix' => 'record',
                'as' => 'record.'
            ], function(){
                // Validation
                Route::post('validation', [\App\Http\Controllers\Api\QuickAction\v1\RecordController::class, 'validation'])->name('validation');
                // Validation
                Route::post('/', [\App\Http\Controllers\Api\QuickAction\v1\RecordController::class, 'store'])->name('store');
            });
        });
    });

    // Category
    Route::group([
        'prefix' => 'category',
        'as' => 'category.'
    ], function(){
        // v1
        Route::group([
            'prefix' => 'v1',
            'as' => 'v1.'
        ], function(){
            // List
            Route::get('list', [\App\Http\Controllers\Api\v1\CategoryController::class, 'index'])->name('list');
        });
    });

    // Planned Payment
    Route::group([
        'prefix' => 'planned-payment',
        'as' => 'planned-payment.'
    ], function(){
        // Summary
        Route::group([
            'prefix' => 'summary',
            'as' => 'summary.'
        ], function(){
            // v1
            Route::group([
                'prefix' => 'v1',
                'as' => 'v1.'
            ], function(){
                // List/Index
                Route::get('list', [\App\Http\Controllers\Api\v1\PlannedPaymentSummaryController::class, 'index'])->name('list');
                // Show
                Route::get('{uuid}', [\App\Http\Controllers\Api\v1\PlannedPaymentSummaryController::class, 'show'])->name('show');
            });
        });

        // v1
        Route::group([
            'prefix' => 'v1',
            'as' => 'v1.'
        ], function(){
            // List/Index
            Route::get('list', [\App\Http\Controllers\Api\v1\PlannedPaymentController::class, 'index'])->name('list');
            // Show
            Route::get('{uuid}', [\App\Http\Controllers\Api\v1\PlannedPaymentController::class, 'show'])->name('show');
            
            // Store
            Route::post('store', [\App\Http\Controllers\Api\v1\PlannedPaymentController::class, 'store'])->name('store');
            // Update
            Route::put('{uuid}', [\App\Http\Controllers\Api\v1\PlannedPaymentController::class, 'update'])->name('update');
            // Delete
            Route::delete('{uuid}', [\App\Http\Controllers\Api\v1\PlannedPaymentController::class, 'destroy'])->name('destroy');
        });
    });

    // Record
    Route::group([
        'prefix' => 'record',
        'as' => 'record.'
    ], function(){
        // v1
        Route::group([
            'prefix' => 'v1',
            'as' => 'v1.'
        ], function(){
            // Fetch Pending Count
            Route::get('count-pending', [\App\Http\Controllers\Api\v1\RecordController::class, 'countPending'])->name('count-pending');
            
            // List/Index
            Route::get('list', [\App\Http\Controllers\Api\v1\RecordController::class, 'index'])->name('list');
            // Show
            Route::get('{uuid}', [\App\Http\Controllers\Api\v1\RecordController::class, 'show'])->name('show');
            
            // Store
            Route::post('store', [\App\Http\Controllers\Api\v1\RecordController::class, 'store'])->name('store');
            // Update
            Route::put('{uuid}', [\App\Http\Controllers\Api\v1\RecordController::class, 'update'])->name('update');
            // Delete
            Route::delete('{uuid}', [\App\Http\Controllers\Api\v1\RecordController::class, 'destroy'])->name('destroy');
        });
    });

    // Category
    Route::group([
        'prefix' => 'category',
        'as' => 'category.'
    ], function(){
        // v1
        Route::group([
            'prefix' => 'v1',
            'as' => 'v1.'
        ], function(){
            // Re-Order
            Route::post('re-order', [\App\Http\Controllers\Api\v1\CategoryController::class, 'reOrder'])->name('re-order');
            // List
            Route::get('list', [\App\Http\Controllers\Api\v1\CategoryController::class, 'index'])->name('list');// Show
            Route::get('{uuid}', [\App\Http\Controllers\Api\v1\CategoryController::class, 'show'])->name('show');
            
            // Store
            Route::post('store', [\App\Http\Controllers\Api\v1\CategoryController::class, 'store'])->name('store');
            // Update
            Route::put('{uuid}', [\App\Http\Controllers\Api\v1\CategoryController::class, 'update'])->name('update');
            // Delete
            Route::delete('{uuid}', [\App\Http\Controllers\Api\v1\CategoryController::class, 'destroy'])->name('destroy');
        });
    });

    // Wallet
    Route::group([
        'prefix' => 'wallet',
        'as' => 'wallet.'
    ], function(){
        // v1
        Route::group([
            'prefix' => 'v1',
            'as' => 'v1.'
        ], function(){
            // Re-Order
            Route::post('re-order', [\App\Http\Controllers\Api\v1\WalletController::class, 'reOrder'])->name('re-order');
            // List
            Route::get('list', [\App\Http\Controllers\Api\v1\WalletController::class, 'index'])->name('list');// Show
            Route::get('{uuid}', [\App\Http\Controllers\Api\v1\WalletController::class, 'show'])->name('show');
            
            // Store
            Route::post('store', [\App\Http\Controllers\Api\v1\WalletController::class, 'store'])->name('store');
            // Update
            Route::put('{uuid}', [\App\Http\Controllers\Api\v1\WalletController::class, 'update'])->name('update');
            // Delete
            Route::delete('{uuid}', [\App\Http\Controllers\Api\v1\WalletController::class, 'destroy'])->name('destroy');
        });

        // Balance Adjustment
        Route::group([
            'prefix' => 'balance-adjustment',
            'as' => 'balance-adjustment.'
        ], function(){
            // v1
            Route::group([
                'prefix' => 'v1',
                'as' => 'v1.'
            ], function(){
                // Store
                Route::post('store', [\App\Http\Controllers\Api\v1\WalletBalanceAdjustmentController::class, 'store'])->name('store');
                // Update
                Route::put('{uuid}', [\App\Http\Controllers\Api\v1\WalletBalanceAdjustmentController::class, 'update'])->name('update');
            });
        });
    });

    // Profile
    Route::group([
        'prefix' => 'profile',
        'as' => 'profile.'
    ], function(){
        // v1
        Route::group([
            'prefix' => 'v1',
            'as' => 'v1.'
        ], function(){
            // List
            Route::get('list', [\App\Http\Controllers\Api\v1\ProfileController::class, 'index'])->name('list');

            // Update
            Route::put('{uuid}', [\App\Http\Controllers\Api\v1\ProfileController::class, 'update'])->name('update');
        });
    });
});