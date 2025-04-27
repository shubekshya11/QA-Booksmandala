const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobject/login.po');

test.describe('BooksMandala - Login Flow', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('https://booksmandala.com');
  });

  test('Login with invalid credentials', async () => {
    await loginPage.gotoLoginModal();
    await loginPage.login('fakeuser@example.com', 'wrongpassword');
    await loginPage.verifyFailedLogin();
  });

  test('Login with valid credentials', async ({ page }) => {
    await loginPage.gotoLoginModal();
    await loginPage.login('shubekshya22@gmail.com', 'Shubu@123');

    // Verify success message
    await expect(page.locator('text=Log In : Successful')).toBeVisible();
  });
});