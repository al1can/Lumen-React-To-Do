<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Note extends JsonResource
{
    /**
     * Transform the resources into an array.
     * 
     * @param \Illuminate\Http\Request $request 
     * @return array
     */

     public function toArray($request)
     {
         return [
             'id' => $this->id,
             'title' => $this->title,
             'body' => $this->body,
         ];
     }
}