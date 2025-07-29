import { Page, expect } from '@playwright/test'; 
import { basePage } from './basePage.page';

export class LoginPage extends basePage{

    constructor(page: Page) {
        super(page);
    }
    
    //Locators for the login page elements
    private get usernameInput() {
        return this.page.locator('[data-test="username"]');
    }

    private get passwordInput() {
        return this.page.locator('[data-test="password"]');
    }

    private get loginButton() {
        return this.page.locator('[data-test="login-button"]');
    }

    private get errorBox() {
        return this.page.locator('[data-test="error"]');
    }

    async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async verifyLoaded() {
    await expect(this.page).toHaveTitle('Swag Labs');
    await this.usernameInput.isVisible();
    await this.passwordInput.isVisible();     
  }  

  async login(username: string, password: string) {
    await this.type(this.usernameInput, username)
    await this.type(this.passwordInput, password)
    await this.click(this.loginButton);
  }

   async hasLoginError() {
    return await this.errorBox.isVisible();
  }

}