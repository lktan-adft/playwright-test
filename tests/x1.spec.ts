import { test, expect } from '@playwright/test';
test.describe('Example Test Suite with Factory Reset Each', () => {
  // 1. SETUP: Runs ONCE before the first test in this file starts
  test.beforeEach(async ({ request, baseURL }) => {
    console.log('⚠️ Triggering Factory Reset...');
    console.log(`Environment is: ${process.env.ENV}`);
    
    // // Example: Call your device's reset API endpoint
    // // Note: We use 'request' fixture for API calls, not 'page'
    // const response = await request.post('/api/system/factory-reset');
    
    // // Verify reset command was accepted
    // expect(response.ok()).toBeTruthy();

    // WAIT: Factory resets take time. Wait for device to come back online.
    console.log('⏳ Waiting 30s for device reboot...');
    // Simple sleep (or use a polling loop to check /health)
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    console.log('✅ Device is ready.');
  });

  // 2. TEARDOWN: Runs ONCE after all tests in this file finish
  test.afterEach(async () => {
    console.log('🧹 Cleaning up temporary files...');

  });

  test('has title', async ({ page }) => {
    const deviceIp = process.env.TARGET_IP || '192.168.1.100'; 
    console.log(`Connecting to device at: ${deviceIp}`);  
    if (process.env.ENV == 'staging') {
      console.log('Running in staging environment - additional setup can be done here.');
    }
    else if (process.env.ENV == 'dev') {
      console.log('Running in development environment - additional setup can be done here.');
    }
    
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
});