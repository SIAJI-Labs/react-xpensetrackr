<?php

namespace Tests\Browser\Test\Sys\Dashboard;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class IndexTest extends DuskTestCase
{
    public $user = null;

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
            'email_verified_at' => now()
        ]);
    }

    /**
     * Successfully rendered page
     * 
     * @group sys.index
     */
    public function testSuccessfullyRendered(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                    ->visit(route('sys.index'))
                    ->assertSee($this->user->name)
                    ->assertTitleContains('Dashboard');
        });
    }

    /**
     * Can visit record route
     * 
     * @group sys.index
     */
    public function testCanVisitRecordRoute(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                    ->visit(route('sys.index'))
                    ->waitFor('button[data-type="load_all-record"]')
                    ->scrollIntoView('button[data-type="load_all-record"]')
                    ->clickAtXPath('//button[@data-type="load_all-record"]')
                    ->assertRouteIs('sys.record.index');
        });
    }
}
