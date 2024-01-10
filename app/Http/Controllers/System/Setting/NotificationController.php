<?php

namespace App\Http\Controllers\System\Setting;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Notification
        $notificationState = false;
        if($user->getPreference('has_notification') !== []){
            $notificationState = in_array($user->getPreference('has_notification'), ['1', true]);
        }

        // Planned Payment
        $notificationPlannedPaymentState = false;
        $notificationPlannedPaymentTime = null;
        if($user->getPreference('notification_plannedPayment') !== []){
            $notificationPlannedPaymentState = in_array($user->getPreference('notification_plannedPayment'), ['1', true]);
        }
        if($user->getPreference('notification_plannedPayment_time') !== []){
            $notificationPlannedPaymentTime = $user->getPreference('notification_plannedPayment_time');
        }

        // Pending Record
        $notificationPendingRecordState = false;
        $notificationPendingRecordTime = null;
        if($user->getPreference('notification_pendingRecord') !== []){
            $notificationPendingRecordState = in_array($user->getPreference('notification_pendingRecord'), ['1', true]);
        }
        if($user->getPreference('notification_pendingRecord_time') !== []){
            $notificationPendingRecordTime = $user->getPreference('notification_pendingRecord_time');
        }

        return Inertia::render('System/Setting/Notification/Index', [
            'notificationState' => $notificationState,
            'notificationPlannedPaymentState' => $notificationPlannedPaymentState,
            'notificationPlannedPaymentTime' => $notificationPlannedPaymentTime,
            'notificationPendingRecordState' => $notificationPendingRecordState,
            'notificationPendingRecordTime' => $notificationPendingRecordTime
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
