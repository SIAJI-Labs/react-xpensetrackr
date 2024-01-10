<?php

namespace Tests\Browser\Test\Auth;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTest extends DuskTestCase
{
    public $user;
    public $email = 'authenticated@sample.tld';
    public $password = 'password';

    /**
     * 
     */
    public function setUp() :void
    {
        parent::setUp();

        $this->user = \App\Models\User::updateOrCreate([
            'email' => 'authenticated@sample.tld'
        ], [
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'name' => 'Sample',
            'email_verified_at' => null
        ]);
    }

    /**
     * Successfully rendered page
     * 
     * @group auth.login
     */
    public function testSuccessfullyRendered(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(route('login'))
                    ->assertSee('Sign-in to your account')
                    ->assertTitleContains('Login');
        });
    }

    /**
     * Password field can be change to text back-and-forth
     * 
     * @group auth.login
     */
    public function testPasswordFieldCanBeToggled(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(route('login'))
                ->type('#auth-password', $this->password)
                ->click('#auth-password_icon')
                ->assertAttribute('#auth-password', 'type', 'text')
                ->click('#auth-password_icon')
                ->assertAttribute('#auth-password', 'type', 'password');
        });
    }

    /**
     * An error shown when field is blank
     * 
     * @group auth.login
     */
    public function testAnErrorShownWhenFieldIsBlank(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(route('login'))
                ->clickAtXPath('//button[@type="submit"]')
                ->waitForText('*The email field is required.')
                ->assertSee('*The email field is required.')
                ->waitForText('*The password field is required.')
                ->assertSee('*The password field is required.');
        });
    }

    /**
     * An error shown when credential is missmatched
     * 
     * @group auth.login
     */
    public function testAnErrorShownWhenCredentialIsMissmatched(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(route('login'))
                ->type('#auth-email', $this->email)
                ->type('#auth-password', 'wrong')
                ->clickAtXPath('//button[@type="submit"]')
                ->waitForText('*These credentials do not match our records.')
                ->assertSee('*These credentials do not match our records.');
        });
    }

    /**
     * Unverfieid user cannot login
     * 
     * @group auth.login
     */
    public function testUnverifiedUserCannotLogin(): void
    {
        $this->user->email_verified_at = null;
        $this->user->save();

        $this->browse(function (Browser $browser) {
            $browser->visit(route('login'))
                ->type('#auth-email', $this->email)
                ->type('#auth-password', $this->password)
                ->clickAtXPath('//button[@type="submit"]')
                ->waitForText('Please verify your email first before sign-in!')
                ->assertSee('Please verify your email first before sign-in!');
        });
    }

    /**
     * Unverfieid user can login
     * 
     * @group auth.login
     */
    public function testUserCanLogin(): void
    {
        $this->user->email_verified_at = now();
        $this->user->save();

        $this->browse(function (Browser $browser) {
            $browser->visit(route('login'))
                ->type('#auth-email', $this->email)
                ->type('#auth-password', $this->password)
                ->clickAtXPath('//button[@type="submit"]')
                ->waitForText('Hi '.$this->user->name)
                ->assertSee($this->user->name)
                ->assertRouteIs('sys.index');
        });
    }
}
