// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,

  globalSetup: require.resolve('./utils/global_setup.ts'),

  expect: {
    timeout: 40 * 1000,
  },

  reporter: [
    ['list'], // console output
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // HTML report
    ['allure-playwright', { outputFolder: 'allure-results' }], // Allure results
  ],

  use: {
    baseURL: process.env.LOGIN_URL,
    browserName: 'chromium',
    headless: true,
    storageState: 'auth.json',

    // Capture screenshots and traces for Allure
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});