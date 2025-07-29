import { Page, Locator} from '@playwright/test'; 
import { basePage } from './basePage.page';

export class InventoryPage extends basePage {

    constructor(page: Page) { super(page);}

    private get headLine(){
        return this.page.locator('[data-test="title"]'); 
    }
    
    private get productList() {
        return this.page.locator('[data-test="inventory-item"]');  //not working, need to find the correct locator
    }

    private get cartNumberOfItems() {
        return this.page.locator('[data-test="shopping-cart-badge"]');// the number of items in the cart
    }

    private get cartButton() {
        return this.page.locator('[data-test="shopping-cart-link"]'); // the cart button 
    }

    private get directionBadge() {
        return this.page.locator('[data-test="active-option"]'); // the cart button 
    }

    async getTitle()
    {
        return await this.headLine.textContent();
    }

    private removeButtonByProductName(productName: string) {
        const locatorName = 'remove-' + productName.replace(/ /g, "-").toLowerCase();
        return this.page.locator(`button[name=${locatorName}]`);  
    }

    async getSelectedSortText(): Promise<string> {
        return (await this.directionBadge.textContent()) ?? '';
    }

    async selectFromDirectionDropDown(direction: string){
        await this.page.selectOption('[data-test="product-sort-container"]', direction);
    }

    async goToCart() {
        await this.cartButton.click();
    }

    async checkList(){
        const items = await this.productList.count();
        console.log(`Number of items in inventory: ${items}`); 
    }

    async addtoCart(productName: string){
        const locatorName = 'add-to-cart-' + productName.replace(/ /g, "-").toLowerCase();
       await this.page.locator(`button[name=${locatorName}]`).click();
    }

    async checkButtonTextByProductName(productName: string){
        const removeButton = this.removeButtonByProductName(productName);
        const buttonText = await removeButton.textContent();
        return buttonText;
    }

    async getFirstProductName(){
        const productName = await this.page.locator('[data-test="inventory-item"]').first().locator('[data-test="inventory-item-name"]');
        return productName.textContent();
    }

    async checkCartButton()
    {
        return await this.cartNumberOfItems.count() > 0;
    }

    
}