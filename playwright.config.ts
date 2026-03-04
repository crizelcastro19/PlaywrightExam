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
    ['list'], // console output in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { 
        // Use Jenkins environment variable if set, fallback to project root
        outputFolder: process.env.ALLURE_RESULTS || path.resolve(process.cwd(), 'allure-results')
    }],
  ],

  use: {
    baseURL: process.env.LOGIN_URL,
    browserName: 'chromium',
    headless: true,
    storageState: 'auth.json',
    screenshot: 'on',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});