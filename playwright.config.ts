// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,

  globalSetup: require.resolve('./utils/global_setup.ts'),

  expect: {
    timeout: 40 * 1000,
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { 
        // Write results to Jenkins workspace via environment variable
        outputFolder: process.env.ALLURE_RESULTS || path.resolve(process.cwd(), 'allure-results')
    }],
  ],

  use: {
    baseURL: process.env.LOGIN_URL,
    browserName: 'chromium',
    headless: true,
    storageState: 'auth.json',
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