const { expect } = require('@playwright/test');

class SearchPage {
    constructor(page) {
        this.page = page;

        // Search related selectors
        this.searchButton = page.locator('body > header > nav.navbar.navbar-expand-lg.primary.header__primary > div > div.collapse.navbar-collapse.primary__menu > div > div > button > span');
        this.searchInput = page.locator('body > div.fade.search.page__search.modal.show > div > div > div.search-header.modal-header > input');
        
        // Add to cart related selectors
        this.addToCartButton = page.locator('#app > main > div > div > div.exact-search-container > div:nth-child(1) > div.exact-search-result__right > div.exact-search-result__right__button > button');
        this.successMessage = page.locator('text=The item has been added successfully');
    }

    async searchForBook(bookName) {
        // Click the search button to open search modal
        await this.searchButton.click();
        
        // Wait for search input to be visible and fill it
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.fill(bookName);
        
        // Press Enter to search
        await this.page.keyboard.press('Enter');
        
        // Wait for search results to load
        await this.page.waitForLoadState('networkidle');
    }

    async addFirstBookToCart() {
        // Wait for add to cart button and click it
        await this.addToCartButton.waitFor({ state: 'visible' });
        await this.addToCartButton.click();
        
        // Wait for success message
        await this.successMessage.waitFor({ state: 'visible' });
    }

    async verifyAddToCartSuccess() {
        await expect(this.successMessage).toBeVisible();
    }
}

module.exports = { SearchPage }; 