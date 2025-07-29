import { allure } from 'allure-playwright';
import { Page } from '@playwright/test';

export async function step(name: string, page: Page, action: ()=>Promise<void> ) {
  await allure.step(name, async () => {
    await action();
    const shot = await page.screenshot();
    allure.attachment(`📸 ${name}`, shot, 'image/png');
  });
}
