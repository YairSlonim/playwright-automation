import {  expect } from '@playwright/test';
import { test } from '../fixtures/base.fixture';
import { Cart } from '../pages/Cart.page';
import { InventoryPage } from '../pages/Inventory.page';
import { Checkout } from '../pages/Checkout.page';
import { step } from '../step.spec';
import { Flow } from '../Flow.spec';

import { allure } from 'allure-playwright';

test.describe("cart flows" , async () =>{

    test("checkOutTest", async ({LoggedInPage})=> {
        allure.epic("cart Flow");
        allure.story("User add item to cart and click on checkout");
        allure.description("addTocart -> gotoCart -> removeFromCart");

        const inventoryPage = new InventoryPage(LoggedInPage);
        const cart = new Cart(LoggedInPage);
        const checkout = new Checkout(LoggedInPage);
        const flow = new Flow(LoggedInPage);
        
        await flow.addTocart(inventoryPage);
        await flow.gotoCart(inventoryPage, cart);
        await flow.clickOnCheckOut(cart,checkout);
})

test("removeItemFromCartTest", async ({LoggedInPage}) =>{
    allure.epic("cart Flow");
    allure.story("User removes item from cart");
    allure.description("addTocart -> gotoCart -> removeFromCart")
    const inventoryPage = new InventoryPage(LoggedInPage);
    const cart = new Cart(LoggedInPage);
    const flow = new Flow(LoggedInPage);
        
    await flow.addTocart(inventoryPage);
    await flow.gotoCart(inventoryPage, cart);
    
    await step("בטל מוצר", LoggedInPage, async () =>{
        await cart.clickOnRemoveButton();
        expect(await cart.isCartEmpty()).toBe(true);
    })

})

test("contineShoppingTest", async ({LoggedInPage}) =>{
        allure.epic("cart Flow");
        allure.story("User add item to cart get into cart page and go back to invetory");
        allure.description("addTocart -> gotoCart -> click on continueShopping");
    const inventoryPage = new InventoryPage(LoggedInPage);
        const cart = new Cart(LoggedInPage);
        const flow = new Flow(LoggedInPage);
        
        await flow.addTocart(inventoryPage);
        await flow.gotoCart(inventoryPage, cart);

       await step("חזרה לעגלת הקניות",LoggedInPage, async()=>{
            await cart.clickOnContinueShopping();
            expect(await inventoryPage.getTitle()).toBe("Products");
       } )
})
})

