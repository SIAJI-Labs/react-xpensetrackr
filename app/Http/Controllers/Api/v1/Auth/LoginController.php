<?php

namespace App\Http\Controllers\Api\v1\Auth;

use Illuminate\Support\Str;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

use App\Http\Controllers\Controller;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    use JsonResponseTrait;

    /**
     * Get the rate limiting throttle key for the request.
     */
    private function throttleKey(Request $request): string
    {
        return Str::transliterate(Str::lower($request->input('email')).'|'.$request->ip());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(Request $request): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey($request), 5)) {
            return;
        }

        event(new Lockout($request));

        $seconds = RateLimiter::availableIn($this->throttleKey($request));

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Handle login column
     */
    private function usernameKeyValidate(Request $request)
    {
        $key = filter_var($request->input('email'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        return $key;
    }

    /**
     * 
     */
    public function login(Request $request)
    {
        $this->ensureIsNotRateLimited($request);
        $fieldKey = $this->usernameKeyValidate($request) ?? 'email';

        // Validate login action
        $user = Auth::attempt([$fieldKey => $request->input('email'), 'password' => $request->input('password')], $request->boolean('remember'));
        if (! $user) {
            RateLimiter::hit($this->throttleKey($request));

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey($request));
        // Generate Bearer Token
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->plainTextToken;

        return $this->formatedJsonResponse(200, 'Login Success', [
            'access_token' => $token
        ]);
    }
}
