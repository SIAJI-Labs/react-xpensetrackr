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

// Homepage - Landing Page
Route::get('/', \App\Http\Controllers\Public\HomepageController::class)->name('public.index');

// Notification
Route::get('notification-subscribe', function(){
    return response()->json('ok');
})->name('public.notification.subscribe');