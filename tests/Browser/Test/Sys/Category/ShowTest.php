<?php

namespace Tests\Browser\Test\Sys\Category;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class ShowTest extends DuskTestCase
{
    public $user = null;
    public $category = null;

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

        $category = \App\Models\Category::updateOrCreate([
            'user_id' => $this->user->id,
            'name' => 'Entertainment',
        ]);
        $this->category = new \App\Http\Resources\Category\ListResource($category);
    }

    /**
     * Successfully rendered page
     * 
     * @group sys.category.show
     */
    public function testSuccessfullyRendered(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                    ->visit(route('sys.category.show', $this->category->uuid))
                    ->assertTitleContains('Category: '.$this->category->name);
        });
    }

    /**
     * Category Dialog can be opened via FAB
     * 
     * @group sys.category.show
     */
    public function testDialogCanBeOpenedViaFab(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->clickAtXPath('//button[@aria-haspopup="menu"][contains(text(), "Add new")]')
                ->waitFor('div[role="menu"][data-radix-menu-content]')
                ->clickAtXPath('//div[@role="menu"][@data-radix-menu-content]//div[@role="menuitem"]//span[contains(text(), "Category")]/parent::div[@role="menuitem"]')
                ->waitForText('Add new Category')
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                ->assertSee('Add new Category');
        });
    }
}
