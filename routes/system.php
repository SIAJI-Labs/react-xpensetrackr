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

    // Report
    Route::group([
        'prefix' => 'report',
        'as' => 'report.'
    ], function(){
        // Cashflow
        Route::get('cash-flow/{period}', [\App\Http\Controllers\System\Report\CashFlowController::class, 'show'])->name('cash-flow.show');
        Route::get('cash-flow', [\App\Http\Controllers\System\Report\CashFlowController::class, 'index'])->name('cash-flow.index');
    });

    // Category Re-Order
    Route::get('category/re-order', [\App\Http\Controllers\System\CategoryReOrderController::class, 'index'])->name('category.re-order.index');
    // Category
    Route::get('category/{uuid}', [\App\Http\Controllers\System\CategoryController::class, 'show'])->name('category.show');
    Route::get('category', [\App\Http\Controllers\System\CategoryController::class, 'index'])->name('category.index');

    // Wallet Re-Order
    Route::get('wallet/re-order', [\App\Http\Controllers\System\WalletReOrderController::class, 'index'])->name('wallet.re-order.index');
    // Wallet
    Route::get('wallet/{uuid}', [\App\Http\Controllers\System\WalletController::class, 'show'])->name('wallet.show');
    Route::get('wallet', [\App\Http\Controllers\System\WalletController::class, 'index'])->name('wallet.index');

    // Wallet
    Route::get('tags/{uuid}', [\App\Http\Controllers\System\TagsController::class, 'show'])->name('tags.show');
    Route::get('tags', [\App\Http\Controllers\System\TagsController::class, 'index'])->name('tags.index');

    // Profile
    Route::get('profile', [\App\Http\Controllers\System\ProfileController::class, 'index'])->name('profile.index');
    // Setting
    Route::get('setting', [\App\Http\Controllers\System\SettingController::class, 'index'])->name('setting.index');
});