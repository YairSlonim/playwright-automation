import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Login with invalid credentials shows error', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('https://www.saucedemo.com/');
      await loginPage.verifyLoaded();
      await loginPage.login('standard_user', 'wrong_password');

      expect(await loginPage.hasLoginError()).toBe(true);
});


test('Login successfully', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('https://www.saucedemo.com/');
      await loginPage.verifyLoaded();
      await loginPage.login('standard_user', 'secret_sauce');

      await expect(page).toHaveURL(/.*inventory\.html/);
      
}); 