<?php

namespace App\Http\Resources\Budget;

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
        $start = $this->start;
        $end = $this->end;

        // Fetch used amount
        $used = $this->getUsedAmount();
        // Fetch remaining amount
        $remaining = $this->getRemainingAmount();

        $interval = $this->interval;
        if($this->repetition === 'once' && !empty($this->start) && !empty($this->end)){
            $days = $this->getIntervalDaysRange();
            $interval = $days.' day(s)';
        }

        // Override Start & End
        if(!empty($this->user->getPreference('timezone'))){
            $tz = $this->user->getPreference('timezone');
            
            // Get User Timezone
            $tz_user = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $start, $tz);
            $tz_user->setTimezone('UTC')->format('Y-m-d H:i:s');
            // Get second different
            $diff = strtotime($start) - strtotime(date('Y-m-d H:i:s', strtotime($tz_user)));
            $start = date('Y-m-d H:i:s', strtotime($start.' '.($diff / 60).' minutes'));

            // Get User Timezone
            $tz_user = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $end, $tz);
            $tz_user->setTimezone('UTC')->format('Y-m-d H:i:s');
            // Get second different
            $diff = strtotime($end) - strtotime(date('Y-m-d H:i:s', strtotime($tz_user)));
            $end = date('Y-m-d H:i:s', strtotime($end.' '.($diff / 60).' minutes'));
        }

        return [
            'uuid' => $this->uuid,
            'name' => $this->name,
            'description' => $this->description,
            'start' => $start,
            'end' => $end,
            'occurence' => $this->repetition === 'repeat' ? 'recurring' : 'once',
            'interval' => $interval,
            'amount' => $this->amount,
            'used' => $used,
            'remaining' => $remaining,

            // Relationship
            'budget_category' => \App\Http\Resources\Category\ListResource::collection($this->whenLoaded('budgetCategory')),
            'budget_wallet' => \App\Http\Resources\Wallet\ListResource::collection($this->whenLoaded('budgetWallet')),
            'budget_tags' => \App\Http\Resources\Tags\ListResource::collection($this->whenLoaded('budgetTags'))
        ];
    }
}
