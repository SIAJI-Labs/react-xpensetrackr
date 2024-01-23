<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Auth
require __DIR__.'/auth.php';

// Public
Route::group([
    'as' => 'public.'
], function(){
    // Homepage - Landing Page
    Route::get('/', \App\Http\Controllers\Public\HomepageController::class)->name('index');
    
    // Wallet Share
    Route::post('wallet-share/{token}/passphrase', [\App\Http\Controllers\Public\WalletShareController::class, 'passphrase'])->name('wallet-share.passphrase');
    Route::get('wallet-share/{token}/record/{uuid}', [\App\Http\Controllers\Public\WalletShareController::class, 'recordDetail'])->name('wallet-share.record.show');
    Route::get('wallet-share/{token}/record', [\App\Http\Controllers\Public\WalletShareController::class, 'recordList'])->name('wallet-share.record');
    Route::get('wallet-share/{token}', \App\Http\Controllers\Public\WalletShareController::class)->name('wallet-share');
});