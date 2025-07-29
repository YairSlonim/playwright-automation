import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import {step } from '../step.spec';
export const test = base.extend<{
  LoggedInPage: Page;
}>({
  LoggedInPage: async ({ page }, use) => {
    await step('הגעה לעמוד התחברות', page, async () => {

  });
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.verifyLoaded();
    await loginPage.login('standard_user', 'secret_sauce');
    await use(page);
  }
});