const { expect } = require('@playwright/test');

class LogoutPage {
  constructor(page) {
    this.page = page;
    
    // Login related locators
    this.loginButton = page.locator('body > header > nav.navbar.navbar-expand-lg.primary.header__primary > div > div.collapse.navbar-collapse.primary__menu > ul.navbar-nav.primary__menu__right > div:nth-child(3) > div');
    this.emailInput = page.locator('#floatingInput');
    this.passwordInput = page.locator('#floatingPassword');
    this.submitLoginButton = page.locator('body > div.fade.mobile-modal.modal.show button[type="submit"]');
    this.loginSuccessMessage = page.locator('text=Log In : Successful');
    
    // Logout related locators
    this.profileIcon = page.locator('body > header > nav.navbar.navbar-expand-lg.primary.header__primary > div > div.collapse.navbar-collapse.primary__menu > ul.navbar-nav.primary__menu__right > div:nth-child(3) > div > img');
    this.logoutButton = page.locator('body > header > nav.navbar.navbar-expand-lg.primary.header__primary > div > div.collapse.navbar-collapse.primary__menu > ul.navbar-nav.primary__menu__right > div:nth-child(3) > div > div.nav-authuser-profile__dropdown > ul > li.nav-authuser-profile__dropdown__logout');
    this.logoutConfirmation = page.locator('text=The user has been logged out');
  }

  async navigate() {
    await this.page.goto('https://booksmandala.com/');
    // Wait for the page to be fully loaded
    await this.page.waitForLoadState('networkidle');
  }

  async login(email, password) {
    // Make sure we're on the homepage
    if (!this.page.url().includes('booksmandala.com')) {
      await this.navigate();
    }

    // Click login button to open modal
    await this.loginButton.click();
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    
    // Fill in credentials
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitLoginButton.click();
    
    // Wait for login success and navigation
    await this.page.waitForLoadState('networkidle');
    
    // If redirected to a different page, go back to homepage
    if (!this.page.url().endsWith('booksmandala.com/')) {
      await this.navigate();
    }
    
    // Verify we're logged in
    await this.profileIcon.waitFor({ state: 'visible', timeout: 15000 });
  }

  async clickProfileIcon() {
    // Ensure we're on the homepage
    if (!this.page.url().endsWith('booksmandala.com/')) {
      await this.navigate();
    }
    await this.profileIcon.waitFor({ state: 'visible' });
    await this.profileIcon.click();
    await this.page.waitForTimeout(1000); // Increased delay for dropdown animation
  }

  async clickLogout() {
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLoggedOut() {
    await this.logoutConfirmation.waitFor({ state: 'visible', timeout: 15000 });
    await this.loginButton.waitFor({ state: 'visible', timeout: 15000 });
  }
}

module.exports = LogoutPage;