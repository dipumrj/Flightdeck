
/*
How to provide it
PowerShell (current session):

$env:BASE_URL = "https://qa.example.com"
npx playwright test */

/*
The || means "use the left value if it exists; otherwise use the right value." 
process.env.BASE_URL
means: "Read the BASE_URL environment variable."
*/


import { defineConfig, devices } from '@playwright/test';
import { config } from './config/environment';

export default defineConfig({
  testDir: './tests',
  timeout: 100_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 1,// retries one more if it get fail
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reports/html' }],
  ],
  use: {
    baseURL: config.baseUrl,
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true' || process.env.NODE_ENV !== 'production',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  outputDir: 'reports/test-results',
  //Solution for System admin is not allowing to npx playwright install chromium
  projects: [
    {
      name: 'chromium',
      use: {
        channel: 'chrome',
        viewport: null,
      },
      // use: {
      //   ...devices['Desktop Chrome'],
      //   channel: 'chrome',
      // },
    },
  ],
});
//