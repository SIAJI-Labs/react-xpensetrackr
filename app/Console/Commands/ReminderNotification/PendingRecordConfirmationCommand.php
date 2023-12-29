<?php

namespace App\Console\Commands\ReminderNotification;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PendingRecordConfirmationCommand extends Command
{
    public $notificationType = 'pending-record';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notification-reminder:pending-record';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remind user to confirm their pending record';

    /**
     * Execute the console command.
     */
    public function handle()
    {    
        // Fetch user that already receive notification
        $notified = \App\Models\Notification::where('type', $this->notificationType)
            ->whereDate('created_at', date('Y-m-d'))
            ->pluck('user_id')
            ->toArray();

        Log::debug("Debug on Notification Reminder, pending record ~ ".date('Y-m-d H:i:s')." - \App\Console\Commands\ReminderNotification\PendingRecordConfirmationCommand", [
            'notified' => count($notified)
        ]);

        // Fetch user where set preference to receive notification
        $users = \App\Models\User::whereNotIn('user_id', $notified) // Ignore notified user
            ->whereHas('record', function($q){
                return $q->where('is_pending', true);
            })
            ->distinct()
            ->chunk(100, function(\Illuminate\Support\Collection $users){
                // Log::info("Info on Fetched Users", [
                //     'users' => [
                //         'count' => count($users),
                //         'data' => $users
                //     ]
                // ]);

                foreach($users as $user){
                    $timezone = 'UTC';
                    // Check if related user setting up their timezone
                    if($user->getPreference('timezone') !== []){
                        // Override default timezone
                        $timezone = $user->getPreference('timezone') ;
                    }

                    // Get UTC Datetime
                    $utc = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'), 'UTC');
                    // Convert to specific timezone
                    $formated = (clone $utc)->setTimezone($timezone)->format('Y-m-d H:i:s');

                    // Default configuration
                    $default_date = date('Y-m-d');
                    $default_time = date('H:i:s', strtotime(str_pad(env('REMINDER_PENDING_RECORD_HOURS', '20'), 2, '0', STR_PAD_LEFT) .':'. str_pad(env('REMINDER_PENDING_RECORD_MINUTES', '00'), 2, '0', STR_PAD_LEFT) .':'. date('s')));
                    $setting = date('Y-m-d H:i:s', strtotime($default_date.' '.$default_time));
                    if($user->getPreference('notification_pendingRecord_time') !== [] && validateDateFormat($user->getPreference('notification_pendingRecord_time'), 'H:i')){
                        // Override configuration based on user preference
                        $setting = date('Y-m-d H:i:s', strtotime(date('Y-m-d').' '.$user->getPreference('notification_pendingRecord_time').':00'));
                    }

                    // Add range
                    $before = 5;
                    $after = 5;
                    // Validate upper & bottom minute limit
                    $before_limit = date('H:i', strtotime($setting.' -'.$before.' minutes'));
                    $after_limit = date('H:i', strtotime($setting.' +'.$after.' minutes'));
                    if($after_limit === date('H:i', strtotime(date('Y-m-d 00:00:00')))){
                        $after_limit = date('H:i', strtotime($after_limit.' -1 minutes'));
                    }

                    // Log::info("Info at Pending Record Notification handler", [
                    //     'user' => $user,
                    //     'conf' => [
                    //         'setting' => $setting,
                    //         'limit' => [
                    //             'after' => $after_limit,
                    //             'before' => $before_limit
                    //         ]
                    //     ],
                    //     'executed' => date('H:i', strtotime($formated)) >= $before_limit && date('H:i', strtotime($formated)) <= $after_limit ? 'true' : 'false'
                    // ]);

                    /**
                     * Validate if period is in range ($before minutes before, and $after minutes after)
                     * 
                     * Example:
                     * - Running at: 2023-01-01 20:01:00
                     * - Notification at: 2023-01-01 20:00:00
                     * - $before = 5 (2023-01-01 19:55:00)
                     * - $after = 5 (2023-01-01 20:05:00)
                     * 
                     * Normal situation, command below will not running when executed at 2023-01-01 20:01:00. But due to range validation, it's still can be run anywhere in the range
                     */
                    if(date('H:i', strtotime($formated)) >= $before_limit && date('H:i', strtotime($formated)) <= $after_limit){
                        // Check pending record
                        $pending = $user->record()
                            ->where('is_pending', true)
                            ->exists();

                        if($pending){
                            // Create formated array data
                            $data = [
                                'title' => 'Check your Pending Record',
                                'message' => 'Review and update your pending record!',
                                'actions' => [
                                    [
                                        'title' => 'Show all record',
                                        'url' => route('sys.record.index')
                                    ], [
                                        'title' => 'Show pending record',
                                        'url' => route('sys.record.index', ['type' => 'pending'])
                                    ],
                                ],
                                'data' => [
                                    'id' => 'pending-record',
                                    'url' => route('sys.record.index', ['type' => 'pending'])
                                ]
                            ];

                            // Save to notification model
                            $notification = \App\Models\Notification::create([
                                'user_id' => $user->id,
                                'type' => $this->notificationType,
                                'message' => json_encode($data)
                            ]);
                        }
                    }
                }
            });
    }
}
