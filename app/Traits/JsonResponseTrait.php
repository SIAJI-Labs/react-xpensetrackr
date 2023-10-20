<?php
namespace App\Traits;

use Illuminate\Http\Request;

trait JsonResponseTrait
{
    /**
     * Return formated JSON
     */
    public function formatedJsonResponse($code = 200, $message = 'Data Fetched', $data = [])
    {
        return response()->json([
            'success' => $code === 200,
            'message' => $message,
            'result' => $data
        ], $code);
    }
}