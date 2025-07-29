import {  expect, Page } from '@playwright/test';
import { test } from './fixtures/base.fixture';
import { Cart } from './pages/Cart.page';
import { InventoryPage } from './pages/inventory.page';
import { Checkout } from './pages/checkout.page';
import { step } from './step.spec';
import { basePage } from './pages/basePage.page';

export class Flow {
    constructor(private page:Page){}
    
    //הכנסת מוצר הראשון באתר לתוך העגלה כולל בדיקה שהוא נכנס
    async addTocart(inventoryPage: InventoryPage) 
    {
        await step("בדיקת רשימה",this.page , async () =>{
        await inventoryPage.checkList();
    })
   
    await step("Sauce Labs Backpack הוספת מוצר לעגלה", this.page ,async () =>{
        await inventoryPage.addtoCart('Sauce Labs Backpack');
    })
    
    await step("בדיקה שהמוצר נכנס לעגלה", this.page, async () =>{
        const productName = await inventoryPage.checkButtonTextByProductName('Sauce Labs Backpack');
        await inventoryPage.attachScreenshotToReport("remove button");
        expect(productName).toBe("Remove");
    })
    }

    //לחיצה על אייקון עגלה ובדיקה שהגעתי לעמוד עגלה
    async gotoCart(inventoryPage: InventoryPage, cart: Cart)
    {
        await step("מעבר לעמוד עגלה", this.page, async ()=>{
        await inventoryPage.goToCart();
        const title = await cart.getTitle();
        expect(title).toBe("Your Cart");
    })
    }

    //מתוך עמוד עגלה לחיצה על צקאאוט ובדיקה שעברנו לעמוד צ'קאאוט
    async clickOnCheckOut(cart: Cart, checkOut: Checkout){
            await step("לחיצה על checkout", this.page, async () =>{
            await cart.clickOnCheckOut()
        })
        await step("בדיקה שעמוד עבר ל checkout", this.page , async ()=>{
             expect(await checkOut.getTitleText()).toBe("Checkout: Your Information");
        })
    }
}