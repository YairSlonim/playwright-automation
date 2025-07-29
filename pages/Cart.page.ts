import { Page} from '@playwright/test'; 
import { basePage } from './basePage.page';

export class Cart extends basePage{
    
    constructor(page: Page)
    {
        super(page);
    }

    private get continueShoppingButton()
    {
        return this.page.locator('#continue-shopping');
    }

    private get checkoutButton()
    {
        return this.page.getByRole('button',{'name' :"checkout"});
    }

    private get firstProductPrice()
    {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    private get cartItemLocator()
    {
        return  this.page.locator('[data-test="inventory-item"]');
    }

    private get removeButton()
    {
        return this.page.locator('[data-test="remove-sauce-labs-backpack"]');
    }

    private get title()
    {
        return this.page.locator('[data-test="title"]')
        //return this.page.getByTestId('title')
    }

    async clickOnCheckOut()
    {
        await this.checkoutButton.click();
    }

    async clickOnContinueShopping()
    {
        await this.continueShoppingButton.click();
    }

    async clickOnRemoveButton()
    {
        await this.removeButton.click();
    }

    async getTitle()
    {
        const text = await this.title.textContent();
    if (!text) throw new Error('Title element was found but has no text content');
        return await this.title.textContent();
    }

    async isCartEmpty(): Promise<boolean>
    {
        return await this.cartItemLocator.count() === 0;
    }
}