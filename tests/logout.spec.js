const { test, expect } = require('@playwright/test');
const LogoutPage = require('../pageobject/logout.po');

test.describe('Logout Functionality', () => {
  let logoutPage;

  test.beforeEach(async ({ page }) => {
    logoutPage = new LogoutPage(page);
    await logoutPage.navigate();
    // Verify we're on the homepage
    await expect(page).toHaveURL('https://booksmandala.com/');
  });

  test('Successful login and logout flow', async ({ page }) => {
    // Login first
    await logoutPage.login('shubekshya22@gmail.com', 'Shubu@123');
    
    // Verify we're on the homepage
    await expect(page).toHaveURL('https://booksmandala.com/');
    
    // Verify profile icon is visible after login
    await logoutPage.profileIcon.waitFor({ state: 'visible' });
    
    // Click profile icon to show logout option
    await logoutPage.clickProfileIcon();
    
    // Click logout button
    await logoutPage.clickLogout();
    
    // Verify successful logout
    await logoutPage.verifyLoggedOut();
  });
});