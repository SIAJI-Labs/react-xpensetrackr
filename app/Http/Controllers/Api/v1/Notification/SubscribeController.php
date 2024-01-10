<?php

namespace App\Http\Controllers\Api\v1\Notification;

use App\Http\Controllers\Controller;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\Request;

class SubscribeController extends Controller
{
    use JsonResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        if($user){
            $request->validate([
                'endpoint' => ['required'],
                'keys.auth' => ['required'],
                'keys.p256dh' => 'required'
            ]);

            $endpoint = $request->endpoint;
            $token = $request->keys['auth'];
            $key = $request->keys['p256dh'];

            $user->updatePushSubscription($endpoint, $key, $token);

            return $this->formatedJsonResponse(200, 'Data Updated');
        }

        return $this->formatedJsonResponse(200, 'Data Fetched', $user);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
