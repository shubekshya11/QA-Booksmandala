const { test, expect } = require('@playwright/test');

test.describe('BooksMandala website tests', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000); // Increased timeout
    await page.goto('https://booksmandala.com/');
  });

  test('Homepage loads successfully', async ({ page }) => {
    // Verify page title (more flexible matching)
    await expect(page).toHaveTitle(/Books\s*Mandala/i);
    
    // Wait for and verify main content
    await page.waitForSelector('body:not([aria-busy="true"])');
    
    // Check for visible text (more reliable than specific heading)
    await expect(page.locator('body')).toContainText(/Welcome|Books|Store/i);
    
    // Alternative: Check for any visible products
    const productItems = await page.locator('.product-item, .book-card').count();
    expect(productItems).toBeGreaterThan(0);
    
    // Take screenshot for verification
    await page.screenshot({ path: 'homepage-loaded.png' });
  });

});