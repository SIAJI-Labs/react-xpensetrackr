<?php

namespace Tests\Browser\Test\Sys\Category;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Schema;
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
        // Truncate Database
        Schema::disableForeignKeyConstraints();
        \App\Models\Category::truncate();
        Schema::enableForeignKeyConstraints();

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
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                ->assertSee('Add new Category');
        });
    }

    /**
     * Category Dialog can be opened via FAB
     * 
     * @group sys.category.index
     */
    public function testDialogCanBeOpenedViaFab(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->visit(route('sys.category.index'))
                ->clickAtXPath('//button[@aria-haspopup="menu"][contains(text(), "Add new")]')
                ->waitFor('div[role="menu"][data-radix-menu-content]')
                ->clickAtXPath('//div[@role="menu"][@data-radix-menu-content]//div[@role="menuitem"]//span[contains(text(), "Category")]/parent::div[@role="menuitem"]')
                ->waitForText('Add new Category')
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                ->assertSee('Add new Category');
        });
    }

    /**
     * Error bag shown when empty form is submited
     * 
     * @group sys.category.index
     */
    public function testErrorBagShownWhenEmptyFormIsSubmited(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                ->clickAtXPath('//div[@role="dialog"][@data-type="category-dialog"]//button[@id="category-dialogSubmit"]')
                ->waitForText('*The name field is required.')
                ->assertSee('*The name field is required.');
        });
    }

    /**
     * Can store new data
     * 
     * @group sys.category.index
     */
    public function testCanStoreNewData(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                ->type('input[id="form-category_name"]', 'Food')
                ->clickAtXPath('//div[@role="dialog"][@data-type="category-dialog"]//button[@id="category-dialogSubmit"]')
                ->waitUntilMissing('div[role="dialog"][data-type="category-dialog"]')
                ->waitForText('Food')
                ->assertSee('Food');
        });
    }

    /**
     * Dialog keep open
     * 
     * @group sys.category.index
     */
    public function testKeepDialogOpen(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->assertMissing('div[role="dialog"][data-type="category-dialog"]')

                // Open the dialog
                ->clickAtXPath('//main//button//i[contains(@class, "fa-plus")]')
                ->waitForText('Add new Category')
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                ->assertSee('Add new Category')

                // Check if dialog stay opened
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                ->type('input[id="form-category_name"]', 'Expense')
                ->clickAtXPath('//form[@id="category-dialogForms"]//button[@id="form-category_keep_open"]')
                ->clickAtXPath('//div[@role="dialog"][@data-type="category-dialog"]//button[@id="category-dialogSubmit"]')
                ->waitForText('Action: Success')
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')

                // Close the dialog
                ->clickAtXPath('//div[@role="dialog"][@data-type="category-dialog"]//button//span[contains(text(), "Close")]/parent::button')
                ->waitUntilMissing('div[role="dialog"][data-type="category-dialog"]')
                ->waitForText('Expense')
                ->assertSee('Expense');
        });
    }

    /**
     * Available Data can be edited
     * 
     * @group sys.category.index
     */
    public function testAvailableDataCanBeEdited(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->clickAtXPath('//span[contains(text(), "Food")]/parent::div')
                ->waitFor('div[role="menu"]')
                ->assertPresent('div[role="menu"]')
                ->clickAtXPath('//div[@role="menu"]//span[contains(text(), "Edit")]/parent::div[@role="menuitem"]')
                ->waitForText('Edit Category')
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                
                // Update form
                ->type('input[id="form-category_name"]', 'Income')
                ->clickAtXPath('//div[@role="dialog"][@data-type="category-dialog"]//button[@id="category-dialogSubmit"]')
                ->waitUntilMissing('div[role="dialog"][data-type="category-dialog"]')
                ->waitForText('Income')
                ->assertSee('Income')
                ;
        });
    }

    /**
     * Can store new data with Parent
     * 
     * @group sys.category.index
     */
    public function testCanStoreNewDataWithParent(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->assertMissing('div[role="dialog"][data-type="category-dialog"]')

                // Open the dialog
                ->clickAtXPath('//main//button//i[contains(@class, "fa-plus")]')
                ->waitForText('Add new Category')
                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                ->assertSee('Add new Category')

                ->assertVisible('div[role="dialog"][data-type="category-dialog"]')
                ->clickAtXPath('//div[@role="dialog"][@data-type="category-dialog"]//button[@role="combobox"]')
                ->waitFor('div[data-radix-popper-content-wrapper]')
                ->type('div[data-radix-popper-content-wrapper] input[role="combobox"]', 'Income')
                ->waitForTextIn('div[data-radix-popper-content-wrapper] div[data-radix-scroll-area-viewport]', 'Income')
                ->clickAtXPath('//div[@data-radix-popper-content-wrapper]//div[@role="dialog"]//span[contains(text(), "Income")]/parent::div[@role="option"]')
                ->waitForTextIn('div#form-category_parent button[role="combobox"] span', 'Income')
                ->assertSeeIn('div#form-category_parent button[role="combobox"] span', 'Income')
                ->type('input[id="form-category_name"]', 'Salary')
                ->clickAtXPath('//div[@role="dialog"][@data-type="category-dialog"]//button[@id="category-dialogSubmit"]')
                ->waitUntilMissing('div[role="dialog"][data-type="category-dialog"]')
                ->waitForText('Income - Salary')
                ->assertSee('Income - Salary');
        });
    }

    /**
     * Delete prompt show up
     * 
     * @group sys.category.index
     */
    public function testDeletePromptShowUp(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->clickAtXPath('//span[contains(text(), "Expense")]/parent::div')
                ->waitFor('div[role="menu"]')
                ->assertPresent('div[role="menu"]')
                ->clickAtXPath('//div[@role="menu"]//span[contains(text(), "Delete")]/parent::div[@role="menuitem"]')
                ->waitForText('Are you sure want to delete related data?')
                ->assertSee('Are you sure want to delete related data?')
                ->clickAtXPath('//div[@role="alertdialog"]//button[contains(text(), "Continue")]')
                ->waitUntilMissing('div[role="alertdialog"]')
                ->waitUntilMissingText('Expense')
                ->assertDontSee('Expense');
        });
    }

    /**
     * Can visit detail page of related category
     * 
     * @group sys.category.index
     */
    public function testCanVisitDetailPage(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs($this->user)
                ->clickAtXPath('//span[contains(text(), "Income")]/parent::div')
                ->waitFor('div[role="menu"]')
                ->assertPresent('div[role="menu"]')
                ->clickAtXPath('//div[@role="menu"]//span[contains(text(), "Detail")]/parent::div[@role="menuitem"]')
                
                ->waitForText('Category Detail:')
                ->assertTitleContains('Category:')
                ->assertSee('Category Detail:');
        });
    }
}
