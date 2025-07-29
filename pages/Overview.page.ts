import {Page, Locator} from '@playwright/test'
import { basePage } from './basePage.page'


export class overview extends basePage
{
    constructor(page:Page)
    {
        super(page)
    }

    private get finishButton()
    {
        return this.page.locator('[data-test="finish"]');
    }

    async clickOnFinish()
    {
        await this.finishButton.click();
    }

}