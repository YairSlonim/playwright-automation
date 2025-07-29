import { test } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot();
    await testInfo.attach('Screenshot on failure', {
      body: screenshot,
      contentType: 'image/png',
    });
  }
});
