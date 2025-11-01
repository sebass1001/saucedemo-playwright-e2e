//Configuration setting for Playwright tests.
const {defineConfig, devices } = require('@playwright/test');

require('dotenv').config();

//Get base URL from environment variable, package.json config, or default to Sauce Demo site.
const baseURL =
  process.env.BASE_URL || 
  process.env.npm_package_config_baseUrl || 
  'https://www.saucedemo.com';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: [['list'], ['html', { outputFolder: 'test-results', open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'only-on-failure',
    viewport: { width: 1366, height: 768 }
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
