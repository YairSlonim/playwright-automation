import { test } from '../fixtures/base.fixture'
import { expect } from '@playwright/test'
import { allure } from 'allure-playwright';
import { Cart } from '../pages/Cart.page';
import { InventoryPage } from '../pages/Inventory.page';
import { Checkout } from '../pages/Checkout.page';
import { overview } from '../pages/Overview.page';
import { step } from '../step.spec';
import { Flow } from '../Flow.spec';


test.describe("end to end flows" , async()=>{
    
    test("simpleEndToEndTest", async ({ LoggedInPage})=>{
    allure.epic("end to end tests");
    allure.story("end to end simple flow");
    allure.description("addTocart -> gotoCart -> clickOnCheckOut -> fillForm -> overview -> clickOnFinish")

        const inventoryPage = new InventoryPage(LoggedInPage);
        const cart = new Cart(LoggedInPage);
        const checkout = new Checkout(LoggedInPage);
        const overviewPage = new overview(LoggedInPage);
        const flow = new Flow(LoggedInPage);

        await flow.addTocart(inventoryPage);
        await flow.gotoCart(inventoryPage, cart);
        await flow.clickOnCheckOut(cart,checkout);

        await checkout.fillForm();

        await step("בדיקה שעברנו ל overview", LoggedInPage, async() =>{
            await expect(await overviewPage.getTitleByDataTest()).toBe("Checkout: Overview");
        })

         await step("לחיצה על finish", LoggedInPage, async() =>{
            await overviewPage.clickOnFinish();
             expect(await overviewPage.getTitleByDataTest()).toBe("Checkout: Complete!");
        })
})
})
