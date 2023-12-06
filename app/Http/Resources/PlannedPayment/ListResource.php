<?php

namespace App\Http\Resources\PlannedPayment;

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
        return [
            'uuid' => $this->uuid,
            'name' => $this->name,
            'type' => $this->type,
            'amount' => $this->amount,
            'extra_amount' => $this->extra_amount,
            'extra_type' => $this->extra_type,
            'final_amount' => $this->amount + $this->extra_amount,
            'date_start' => $this->date_start,
            'date_temp' => $this->date_start_temp,
            'repeat_type' => $this->repeat_type,
            'repeat_frequency' => $this->repeat_frequency,
            'repeat_period' => $this->repeat_period,
            'repeat_until' => $this->repeat_until,
            'until_number' => $this->until_number,
            'note' => $this->note,
            'timezone' => $this->timezone,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,

            // Relation
            'category' => new \App\Http\Resources\Category\ListResource($this->whenLoaded('category')),
            'from_wallet' => new \App\Http\Resources\Wallet\ListResource($this->whenLoaded('fromWallet')),
            'to_wallet' => new \App\Http\Resources\Wallet\ListResource($this->whenLoaded('toWallet')),
            'planned_payment_tags' => new \App\Http\Resources\Tags\ShowResource($this->whenLoaded('plannedPaymentTags.tags'))
        ];
    }
}
