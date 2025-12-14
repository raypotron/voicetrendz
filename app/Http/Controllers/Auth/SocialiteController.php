<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect(string $provider)
    {
        $this->validateProvider($provider);

        return Socialite::driver($provider)->redirect();
    }

    public function callback(string $provider)
    {
        $this->validateProvider($provider);
        $response = Socialite::driver($provider)->user();

        $user = User::firstWhere(['email' => $response->getEmail()]);

        if ($user) {
            if (! $user->{$provider.'_id'}) {
                $user->update([
                    $provider.'_id' => $response->getId(),
                ]);
            }
        } else {
            $user = User::create([
                $provider.'_id' => $response->getId(),
                'name' => $response->getName() ?? $response->getNickname(),
                'email' => $response->getEmail(),
                'password' => bcrypt(str()->random(32)),
            ]);
        }

        // Capture the return URL from query
        $returnUrl = session()->get('returnUrl');
        $likePostId = session()->get('likePostId');

        Auth::login($user);

        if ($returnUrl) {
            $returnUrl = $returnUrl.'?likePostId='.(int) $likePostId;
            return redirect()->intended($returnUrl);
        }

        return redirect()->intended('user');

    }

    protected function validateProvider(string $provider): void
    {
        if (! in_array($provider, ['google'])) {
            throw ValidationException::withMessages([
                'provider' => 'Unsupported authentication provider.',
            ]);
        }
    }
}
