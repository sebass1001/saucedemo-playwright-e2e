const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users = require('../fixtures/users');

test.describe('Login', () => {
  test('logs in successfully', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  });

  test('shows error for locked out user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.locked.username, users.locked.password);
    await expect(login.error).toContainText('Sorry, this user has been locked out');
  });
});