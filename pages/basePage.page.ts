import { Page, expect, Locator, test } from "@playwright/test";
import fs from 'fs';

export class basePage{

    constructor(protected page: Page){}

    async click(locator:Locator) {
       await expect(locator).toBeVisible();
       await locator.click();   
    }

    async type(locator:Locator, text:string) {
         await expect(locator).toBeVisible();
         await locator.fill(text);  
     } 

     async waitForElement(locator:Locator) {
         await expect(locator).toBeVisible();
     }

     async getText(locator: Locator)
     {
        await expect(locator).toBeVisible();
        return await locator.innerText();
     }

     async getTitleByDataTest() {
         return this.page.locator('[data-test="title"]').textContent();
     }

   async attachScreenshotToReport(title: string) {
    const screenshot = await this.page.screenshot();
    test.info().attach(title, {
      body: screenshot,
      contentType: 'image/png',
    });
   }
     

}