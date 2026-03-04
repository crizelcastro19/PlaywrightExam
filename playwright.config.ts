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

  reporter: 'html',

  use: {
    baseURL: process.env.LOGIN_URL,
    browserName: 'chromium',
    headless: true,
    storageState: 'auth.json',
  },
});