<?php

namespace App\Notifications\Push;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use NotificationChannels\WebPush\WebPushChannel;
use NotificationChannels\WebPush\WebPushMessage;

class WebPushNotification extends Notification
{
    use Queueable;

    public $title = null,
        $message = null,
        $actions = [],
        $data = null;

    /**
     * Create a new notification instance.
     */
    public function __construct($data = null)
    {
        if(!empty($data) && is_array($data)){
            // Set Notification Title
            if(isset($data['title'])){
                $this->title = $data['title'];
            } else {
                $this->title = env('APP_NAME');
            }

            // Set Notification message
            if(isset($data['message'])){
                $this->message = $data['message'];
            }

            // Set Notification action
            if(isset($data['actions']) && is_array($data['actions'])){
                foreach($data['actions'] as $actions){
                    if(isset($actions['title']) && isset($actions['url'])){
                        $this->actions[] = $actions;
                    }
                }
            }

            if(isset($data['data'])){
                $this->data = $data['data'];
            }
        } else {
            $this->title = env('APP_NAME');
        }
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [WebPushChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toWebPush($notifiable)
    {
        $notification = (new WebPushMessage)
            ->icon('/assets/images/pwa-192x192.png');
        if(!empty($this->title)){
            $notification->title($this->title);
        }
        if(!empty($this->message)){
            $notification->body($this->message);
        }
        if(is_array($this->actions) && count($this->actions) > 0){
            foreach($this->actions as $action){
                $notification->action($action['title'], $action['url']);
            }
        }
        if(!empty($this->data)){
            $notification->data($this->data);
        }

        Log::debug("Debug on Web Push Notification ~ \App\Notifications\Push\WebPushNotification", [
            'title' => $this->title,
            'body' => $this->message,
            'action' => $this->actions,
            'data' => $this->data,
            'notifiable' => $notifiable
        ]);

        return $notification;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
