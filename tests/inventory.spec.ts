import {  expect } from '@playwright/test';
import { test } from '../fixtures/base.fixture';
import { InventoryPage } from '../pages/inventory.page';
import { step } from '../step.spec';
import { Flow } from'../flow.spec';

import { allure } from 'allure-playwright';

test('add To Cart', async ({ LoggedInPage }) => { 
    allure.epic("inventory Flow");
    allure.story("User add item to cart and than check the cart badge");
    allure.description("addTocart -> check the badge");
    const inventoryPage = new InventoryPage(LoggedInPage);
    const flow = new Flow(LoggedInPage);
    
    await flow.addTocart(inventoryPage);
});

test('inventory Direction', async ({ LoggedInPage }) => { 
    allure.epic("inventory Flow");
    allure.story("User fix the the list from z to a");
    allure.description("choose correct direction -> check if the change worked -> check that the first item is the right one");

    const inventoryPage = new InventoryPage(LoggedInPage);
    
    await step("בחירת הכיוון הרצוי",LoggedInPage , async () =>{
        await inventoryPage.selectFromDirectionDropDown("za");
    })

    await step("בדיקה שהכיוון הרצוי נבחר",LoggedInPage, async () =>{
         const selectedText = await inventoryPage.getSelectedSortText();
        await expect(selectedText).toBe("Name (Z to A)");

        await step("בדיקה שהבגד שמתחיל באות הכי אחרונה מופיע ראשון",LoggedInPage, async () =>{
            const nameToCompare = await inventoryPage.getFirstProductName();
            expect(nameToCompare).toBe("Test.allTheThings() T-Shirt (Red)")
        })
    })    
});

test("check the cart badge", async ({LoggedInPage}) =>{
    allure.epic("inventory Flow");
    allure.story("User add item to cart and than check the cart badge");
    allure.description("addTocart -> check the badge");
    const inventoryPage = new InventoryPage(LoggedInPage);

    await step("אם פריט לא בעגלה, הוספת פריט לעגלה", LoggedInPage , async () => {
         await inventoryPage.addtoCart('Sauce Labs Backpack');
        const productName = await inventoryPage.checkButtonTextByProductName('Sauce Labs Backpack');
        if(productName != null && productName.toLocaleLowerCase() == "remove"){
            console.log("heyyy");
        }
        else{
            await inventoryPage.addtoCart('Sauce Labs Backpack');
        }
        
    })
    await step("בדיקה שהתג עם 1", LoggedInPage , async ()=>{
        const isProductExistInCart =  await inventoryPage.checkCartButton();
        expect(isProductExistInCart).toBe(true);
    })  
})