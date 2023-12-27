<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\FileUploadTrait;
use App\Traits\JsonResponseTrait;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    use JsonResponseTrait;
    use FileUploadTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return $this->formatedJsonResponse(200, 'Data Fetched', [
            'data' => $user
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();
        // Override file location
        $this->fileUploadTraitsDestination = 'files/user'.'/'.$user->uuid;   

        if($request->has('action')){
            // Update Preference
            if(in_array($request->action, [
                'timezone-preference'
            ])){
                $tz = config('siaji.list_of.timezone');
                // Collection
                $tz_collection = collect($tz);
                // Array of value
                $tz_arr = $tz_collection->pluck('tzCode')->toArray();

                $request->validate([
                    'timezone' => ['required', 'string', 'in:'.implode(',', $tz_arr)]
                ]);

                DB::transaction(function() use ($request, $user){
                    if($request->action === 'timezone-preference'){
                        // Update timezone Preference
                        $data = new \App\Models\UserPreference();
                        if(!empty($user->getPreference('timezone'))){
                            $data = $user->userPreference()->where('key', 'timezone')
                                ->first();
                        }

                        $data->user_id = $user->id;
                        $data->key = 'timezone';
                        $data->value = $request->timezone;
                        $data->save();
                    }
                });
            }

            return $this->formatedJsonResponse(200, 'Data Updated', [
                'data' => $user
            ]);
        }

        DB::transaction(function () use ($user, $request) {
            $user->name = $request->name;
            $user->email = $request->email;
            $user->username = $request->username;

            // Handle avatar
            if($request->has('avatar_type') && in_array($request->avatar_type, ['template', 'custom'])){
                // Handle Template Avatar
                if($request->avatar_type === 'template'){                    
                    $user->avatar = $request->avatar_template;

                    // Check if file exists
                    if($user->getAvatarType() === 'custom' && Storage::exists($user->avatar)){
                        // Remove old files
                        $this->fileRemove($user->avatar);
                    }
                } else if($request->avatar_type === 'custom'){
                    if($request->hasFile('avatar_file')){
                        // Check if file exists
                        if($user->getAvatarType() === 'custom' && Storage::exists($user->avatar)){
                            // Remove old files
                            $this->fileRemove($user->avatar);
                        }

                        // Upload custom image
                        $upload = $this->fileUpload($request->avatar_file);
                        $user->avatar = $upload['file']['path'];
                    }
                }
            }

            $user->save();
        });

        return $this->formatedJsonResponse(200, 'Data Updated', [
            'data' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
