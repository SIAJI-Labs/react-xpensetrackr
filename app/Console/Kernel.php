<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();

        // Generate first log for the day
        $schedule->call(function () {
            Log::info('Initialize debug file - '.date('Y-m-d H:i:s').' ~ \App\Console\Kernel@schedule');
        })->dailyAt('00:00');

        // Fetch Inpsiration of the day
        $schedule->command('inspire:get-quotes')->dailyAt('00:00');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
