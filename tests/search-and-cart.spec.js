const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pageobject/search.po');

test.describe('BooksMandala - Search and Add to Cart', () => {
    let searchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        await page.goto('https://booksmandala.com');
    });

    test('Search for a book and add to cart', async ({ page }) => {
        // Search for Harry Potter
        await searchPage.searchForBook('harry potter');

        // Add first book to cart
        await searchPage.addFirstBookToCart();

        // Verify success message
        await searchPage.verifyAddToCartSuccess();
    });
}); 