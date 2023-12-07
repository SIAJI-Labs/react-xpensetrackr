<?php

namespace App\Http\Resources\Wallet;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowResource extends JsonResource
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
            'balance' => $this->getBalance(),
            'type' => $this->type,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,

            // Relationship
            'parent' => new \App\Http\Resources\Wallet\ListResource($this->whenLoaded('parent')),
            'child' => \App\Http\Resources\Wallet\ListResource::collection($this->whenLoaded('child'))
        ];
    }
}
