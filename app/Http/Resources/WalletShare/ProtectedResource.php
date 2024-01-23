<?php

namespace App\Http\Resources\WalletShare;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProtectedResource extends JsonResource
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
            'valid_until' => $this->valid_until,
        ];
    }
}
