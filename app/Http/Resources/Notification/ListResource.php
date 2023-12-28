<?php

namespace App\Http\Resources\Notification;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $notification = [];
        $title = 'Please check this!';
        $message = $this->message;

        if(!empty(json_decode($this->message, true)) && is_array(json_decode($this->message, true))){
            $notification = json_decode($this->message); // Set it to object

            if(isset($notification->title)){
                $title = $notification->title;
            }
            if(isset($notification->message)){
                $message = $notification->message;
            }
        }

        return [
            'uuid' => $this->uuid,
            'title' => $title,
            'message' => $message,
            'action' => $notification,
            'is_seen' => $this->is_seen,
            'created_at' => $this->created_at,
            'seen_at' => $this->when($this->is_seen, $this->updated_at, null),

            // Relation
            'user' => new \App\Http\Resources\User\ShowResource($this->whenLoaded('user'))
        ];
    }
}
