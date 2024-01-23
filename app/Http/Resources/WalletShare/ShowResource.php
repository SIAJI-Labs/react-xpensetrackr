<?php

namespace App\Http\Resources\WalletShare;

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
            'token' => $this->token,
            'name' => $this->name,
            'note' => $this->note,
            'passphrase' => $this->passphrase,
            'valid_until' => $this->valid_until,
            'balance' => $this->getBalance(),

            // Relation
            'wallet_share_item' => \App\Http\Resources\Wallet\ListResource::collection($this->walletShareItem),
        ];
    }
}
