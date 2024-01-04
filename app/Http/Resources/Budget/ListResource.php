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
