<?php

namespace App\Http\Resources\Record;

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
            'type' => $this->type,
            'amount' => $this->amount,
            'extra_amount' => $this->extra_amount,
            'extra_type' => $this->extra_type,
            'final_amount' => $this->amount + $this->extra_amount,
            'date' => $this->date,
            'time' => $this->time,
            'datetime' => $this->datetime,
            'note' => $this->note,
            'timezone' => $this->timezone,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,

            // Relation
            'category' => new \App\Http\Resources\Category\ListResource($this->whenLoaded('category')),
            'from_wallet' => new \App\Http\Resources\Wallet\ListResource($this->whenLoaded('fromWallet')),
            'to_wallet' => new \App\Http\Resources\Wallet\ListResource($this->whenLoaded('toWallet')),
            'record_tags' => \App\Http\Resources\Tags\ListResource::collection($this->whenLoaded('recordTags'))
        ];
    }
}
