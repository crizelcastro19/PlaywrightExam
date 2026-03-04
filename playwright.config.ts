import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  globalSetup: require.resolve('./utils/global_setup.ts'),
  expect: { timeout: 40 * 1000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      outputFolder: process.env.ALLURE_RESULTS || path.resolve(process.cwd(), 'allure-results')
    }],
  ],
  use: {
    baseURL: process.env.LOGIN_URL,
    browserName: 'chromium',
    headless: true,
    storageState: 'auth.json',
    screenshot: 'only-on-failure', // 'on' if you want screenshots for passed tests too
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});