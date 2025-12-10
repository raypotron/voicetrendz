<?php

namespace App\Filament\Pages\Auth;

use DanHarrin\LivewireRateLimiting\Exceptions\TooManyRequestsException;
use Filament\Auth\Http\Responses\Contracts\LoginResponse;
use Filament\Auth\MultiFactor\Contracts\HasBeforeChallengeHook;
use Filament\Facades\Filament;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Auth\SessionGuard;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Request;

class Login extends \Filament\Auth\Pages\Login
{
    public function mount(): void
    {
        if ($returnUrl = Request::query('returnUrl')) {
            session()->put('likePostId', Request::query('likePostId'));
            session()->put('returnUrl', $returnUrl);
        }

        if (Filament::auth()->check()) {
            redirect()->intended(Filament::getUrl());
        }

        $this->form->fill();
    }

    public function authenticate(): ?LoginResponse
    {
        try {
            $this->rateLimit(5);
        } catch (TooManyRequestsException $exception) {
            $this->getRateLimitedNotification($exception)?->send();

            return null;
        }

        $data = $this->form->getState();

        /** @var SessionGuard $authGuard */
        $authGuard = Filament::auth();
        $authProvider = $authGuard->getProvider();
        $credentials = $this->getCredentialsFromFormData($data);

        $user = $authProvider->retrieveByCredentials($credentials);

        if ((! $user) || (! $authProvider->validateCredentials($user, $credentials))) {
            $this->userUndertakingMultiFactorAuthentication = null;
            $this->fireFailedEvent($authGuard, $user, $credentials);
            $this->throwFailureValidationException();
        }

        // MULTI-FACTOR HANDLING (unchanged)
        if (
            filled($this->userUndertakingMultiFactorAuthentication) &&
            (decrypt($this->userUndertakingMultiFactorAuthentication) === $user->getAuthIdentifier())
        ) {
            $this->multiFactorChallengeForm->validate();
        } else {
            foreach (Filament::getMultiFactorAuthenticationProviders() as $mfa) {
                if (! $mfa->isEnabled($user)) {
                    continue;
                }

                $this->userUndertakingMultiFactorAuthentication = encrypt($user->getAuthIdentifier());

                if ($mfa instanceof HasBeforeChallengeHook) {
                    $mfa->beforeChallenge($user);
                }

                break;
            }

            if (filled($this->userUndertakingMultiFactorAuthentication)) {
                $this->multiFactorChallengeForm->fill();

                return null;
            }
        }

        // Ensure user can access panel
        if (! $authGuard->attemptWhen($credentials, function (Authenticatable $user): bool {
            if (! ($user instanceof FilamentUser)) {
                return true;
            }

            return $user->canAccessPanel(Filament::getCurrentOrDefaultPanel());
        }, $data['remember'] ?? false)) {
            $this->fireFailedEvent($authGuard, $user, $credentials);
            $this->throwFailureValidationException();
        }

        // Capture the return URL from query
        $returnUrl = session()->get('returnUrl');
        $likePostId = session()->get('likePostId');

        if ($returnUrl) {
            $returnUrl = $returnUrl.'?likePostId='.(int) $likePostId;
            redirect()->intended($returnUrl);

            return null;
        }

        session()->regenerate();

        // Return Filament’s built-in login response
        return app(LoginResponse::class);
    }
}
