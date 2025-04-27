class LoginPage {
  constructor(page) {
    this.page = page;

    // Click this to open the modal
    this.loginButton = page.locator('body > header > nav.navbar.navbar-expand-lg.primary.header__primary > div > div.collapse.navbar-collapse.primary__menu > ul.navbar-nav.primary__menu__right > div:nth-child(3) > div');
    //this.loginButton = page.locator('nav.header__primary div.primary__menu__right > div:nth-child(3) > div');

    this.userAvatar = page.locator('selector-for-user-avatar');

    // These appear inside the modal
    this.emailInput = page.locator('#floatingInput');
    this.passwordInput = page.locator('#floatingPassword');
    this.submitLoginButton = page.locator(
      'body > div.fade.mobile-modal.modal.show button[type="submit"]'
    );

    // For failed login message
    this.errorMessage = page.locator('text=/credentials do not match/i');

    // Logout related selectors
    this.userProfileImage = page.locator('body > header > nav.navbar.navbar-expand-lg.primary.header__primary > div > div.collapse.navbar-collapse.primary__menu > ul.navbar-nav.primary__menu__right > div:nth-child(3) > div > img');
    this.logoutButton = page.locator('body > header > nav.navbar.navbar-expand-lg.primary.header__primary > div > div.collapse.navbar-collapse.primary__menu > ul.navbar-nav.primary__menu__right > div:nth-child(3) > div > div.nav-authuser-profile__dropdown > ul > li.nav-authuser-profile__dropdown__logout');
    this.logoutSuccessMessage = page.locator('text=The user has been logged out.');
    
    // Login success message
    this.loginSuccessMessage = page.locator('text=Log In : Successful');
  }

  async gotoLoginModal() {
    await this.loginButton.click();
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitLoginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyFailedLogin() {
    await this.errorMessage.waitFor({ state: 'visible' });
  }

  // async verifySuccessfulLogin() {
  //   await this.userAvatar.waitFor({ state: 'visible', timeout: 15000 });
  // }
  async verifySuccessfulLogin() {
    // Wait for success message
    await this.loginSuccessMessage.waitFor({ state: 'visible', timeout: 15000 });

    // Wait for user profile image to be visible
    await this.userProfileImage.waitFor({ state: 'visible', timeout: 15000 });
  }

  async logout() {
    // Click on user profile image to show logout option
    await this.userProfileImage.waitFor({ state: 'visible' });
    await this.userProfileImage.click();
    
    // Wait for and click logout button
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
    
    // Wait for logout success message
    await this.logoutSuccessMessage.waitFor({ state: 'visible' });
  }

  async verifySuccessfulLogout() {
    // Verify logout success message
    await this.logoutSuccessMessage.waitFor({ state: 'visible' });
    
    // Verify login button is visible again
    await this.loginButton.waitFor({ state: 'visible' });
  }
}

module.exports = { LoginPage };



module.exports = { LoginPage };


