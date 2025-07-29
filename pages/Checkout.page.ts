import {Page, Locator} from '@playwright/test'
import { basePage } from './basePage.page'


export class Checkout extends basePage
{
    constructor(page: Page)
    {
        super(page);
    }

    private get title()
    {
        return this.page.locator('[data-test="title"]')
        //return this.page.getByTestId('title')
    }

    private get firstName()
    {
        return this.page.locator('[data-test="firstName"]')
    }

    private get lastName()
    {
        return this.page.locator('[data-test="lastName"]')
    }

    private get zipCode()
    {
        return this.page.locator('[data-test="postalCode"]')
    }

    private get continueButton()
    {
        return this.page.locator('[data-test="continue"]')
    }

    async getTitleText()
    {
        return await this.title.textContent();
    }

    async fillForm()
    {
        await this.firstName.fill("moshe");
        await this.lastName.fill("dani");
        await this.zipCode.fill("123456");
        await this.continueButton.click();
    }

    
}