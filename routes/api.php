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

Route::group([
    'as' => 'api.',
    'middleware' => ['auth:sanctum']
], function(){
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
            // List
            Route::get('list', [\App\Http\Controllers\Api\v1\RecordController::class, 'index'])->name('list');
            
            // Store
            Route::post('store', [\App\Http\Controllers\Api\v1\RecordController::class, 'store'])->name('store');
            // Update
            Route::put('{uuid}', [\App\Http\Controllers\Api\v1\RecordController::class, 'update'])->name('update');

            // Show
            Route::get('{uuid}', [\App\Http\Controllers\Api\v1\RecordController::class, 'show'])->name('show');
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
            // List
            Route::get('list', [\App\Http\Controllers\Api\v1\WalletController::class, 'index'])->name('list');
        });
    });
});