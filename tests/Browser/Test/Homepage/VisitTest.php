<?php

namespace Tests\Browser\Test\Homepage;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class VisitTest extends DuskTestCase
{
    /**
     * Successfully rendered page
     */
    public function testSuccessfullyRendered(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertSee('Login')
                    ->assertTitleContains('Homepage');
        });
    }
}
