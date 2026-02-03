import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  const deviceIp = process.env.TARGET_IP || '192.168.1.100'; 
  console.log(`Connecting to device at: ${deviceIp}`);  
  await page.goto(`http://${deviceIp}/`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ADF/);
});

test('get started link', async ({ page }) => {
  const deviceIp = process.env.TARGET_IP || '192.168.1.100'; 
  console.log(`Connecting to device at: ${deviceIp}`);  
  await page.goto(`http://${deviceIp}/`);

  await expect(page).toHaveTitle(/ADF/);
  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});