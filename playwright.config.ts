import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read environment from system variable, default to 'dev' if not set
const testEnv = process.env.TEST_ENV || 'dev';

// Load the corresponding .env file
dotenv.config({ path: path.resolve(__dirname, 'config', `.env.${testEnv}`) });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['junit', { outputFile: 'results.xml' }]],
  
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL, // Loaded from the .env file
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // You can have a specific project for smoke tests only
    {
      name: 'smoke-tests',
      testDir: './tests/smoke',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
