const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../pageobject/contact.po');

test.describe('BooksMandala - Contact Form', () => {
  let contactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await page.goto('https://booksmandala.com/contact'); // replace with actual route if different
  });

  test('Add a new contact', async ({ page }) => {
    await contactPage.contactAdd(
      'John',
      'Doe',
      '1990-01-01',
      'johndoe@example.com',
      '9800000000',
      '123 Street',
      'Suite 4',
      'Kathmandu',
      'Bagmati',
      '44600',
      'Nepal'
    );

    // Assert the contact was added (you already defined this in your POM!)
    await expect(page.locator(contactPage.validateContactCreated)).toBeVisible();
  });
});
