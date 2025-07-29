import {  expect } from '@playwright/test';
import { test } from '../fixtures/base.fixture';


test("just trying bro" , async  ({ LoggedInPage })=>{
    const itemNames = await LoggedInPage.locator('[data-test="inventory-item-name"]');
    const amount = await itemNames.count();
    console.log(amount);

    for (let index = 0; index < await itemNames.count(); index++) {
        const element = await itemNames.nth(index).textContent();
        console.log(element);
        
    }
});

