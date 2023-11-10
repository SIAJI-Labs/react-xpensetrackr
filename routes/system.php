<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| System Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([
    'as' => 'sys.',
    'middleware' => ['auth']
], function(){
    // Quick Action
    Route::group([
        'as' => 'quick-action.',
        'prefix' => 'quick-action'
    ], function(){
        // Make Pending Record
        Route::get('record', \App\Http\Controllers\System\QuickAction\RecordController::class)->name('record');
    });

    // Dashboard
    Route::get('dashboard', \App\Http\Controllers\System\DashboardController::class)->name('index');
    
    // Planned Payment - Summary
    Route::get('planned-payment/summary/{wallet}', [\App\Http\Controllers\System\PlannedSummaryController::class, 'show'])->name('planned-payment.summary.show');
    // Planned Payment
    Route::get('planned-payment/{uuid}', [\App\Http\Controllers\System\PlannedPaymentController::class, 'show'])->name('planned-payment.show');
    Route::get('planned-payment', [\App\Http\Controllers\System\PlannedPaymentController::class, 'index'])->name('planned-payment.index');

    // Record
    Route::get('record/{uuid}', [\App\Http\Controllers\System\RecordController::class, 'show'])->name('record.show');
    Route::get('record', [\App\Http\Controllers\System\RecordController::class, 'index'])->name('record.index');
});