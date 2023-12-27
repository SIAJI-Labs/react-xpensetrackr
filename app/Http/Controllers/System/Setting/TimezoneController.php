<?php

namespace App\Http\Controllers\System\Setting;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TimezoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        $server = config('app.timezone');
        $preference = $server;

        // Override if user had preference
        if(!empty($user->getPreference('timezone'))){
            $preference = $user->getPreference('timezone');
        }

        // Fetch available list
        $list = collect(config('siaji.list_of.timezone'));
        
        return Inertia::render('System/Setting/Timezone/Index', [
            'server' => $server,
            'preference' => $preference,
            'list' => $list
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
