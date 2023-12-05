<?php

namespace App\Http\Resources\Category;

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
            'name' => ($this->parent()->exists() ? $this->parent->name.' - ' : '').$this->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,

            // Relationship
            'parent' => new \App\Http\Resources\Category\ListResource($this->whenLoaded('parent')),
            'child' => \App\Http\Resources\Category\ListResource::collection($this->whenLoaded('child'))
        ];
    }
}
