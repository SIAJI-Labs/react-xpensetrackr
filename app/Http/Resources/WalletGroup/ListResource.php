<?php

namespace App\Http\Resources\WalletGroup;

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
            'balance' => $this->getBalance(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Relation
            'wallet_group_item' => \App\Http\Resources\Wallet\ListResource::collection($this->walletGroupItem),
        ];
    }
}
