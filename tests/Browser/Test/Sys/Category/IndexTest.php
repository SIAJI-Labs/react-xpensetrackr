<?php

namespace Tests\Browser\Test\Sys\Category;

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
     * @group sys.category.index
     */
    public function testSuccessfullyRendered(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                    ->visit(route('sys.category.index'))
                    ->assertTitleContains('Category List');
        });
    }

    /**
     * Can visit category re-order
     * 
     * @group sys.category.index
     */
    public function testCanVisitReOrderRoute(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                    ->visit(route('sys.category.index'))
                    ->clickAtXPath('//button[@data-type="navigation-reorder"]')
                    ->waitForRoute('sys.category.re-order.index')
                    ->assertRouteIs('sys.category.re-order.index')
                    ->assertTitleContains('Category Re-Order');
        });
    }

    /**
     * Category Dialog can be opened
     * 
     * @group sys.category.index
     */
    public function testDialogCanBeOpened(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->visit(route('sys.category.index'))
                ->clickAtXPath('//main//button//i[contains(@class, "fa-plus")]')
                ->waitForText('Add new Category')
                ->assertVisible('div[role="dialog"]')
                ->assertSee('Add new Category');
        });
    }
}
