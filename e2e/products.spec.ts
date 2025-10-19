import { test, expect } from '@playwright/test';

test.describe('Product Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for products to load
    await page.waitForSelector('section[class*="grid"]', { timeout: 10000 });
  });

  test('should filter products by category', async ({ page }) => {
    // Select a category from dropdown
    const categorySelect = page.getByRole('combobox', { name: /filter by category/i });
    await categorySelect.selectOption({ label: /DEVELOPMENT BOARDS/i });
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    
    // Check that filtered products are displayed
    const products = await page.locator('div[class*="bg-white"][class*="rounded"]').count();
    expect(products).toBeGreaterThan(0);
  });

  test('should show active filters', async ({ page }) => {
    // Search for a product
    const searchInput = page.getByPlaceholder(/search component name/i);
    await searchInput.fill('Arduino');
    await page.waitForTimeout(500);
    
    // Check that active filter tag is displayed
    await expect(page.getByText(/Search: "Arduino"/i)).toBeVisible();
  });

  test('should clear search filter', async ({ page }) => {
    // Search for a product
    const searchInput = page.getByPlaceholder(/search component name/i);
    await searchInput.fill('Arduino');
    await page.waitForTimeout(500);
    
    // Click clear button on search input
    const clearButton = page.locator('button[aria-label="Clear search"]');
    await clearButton.click();
    
    // Search input should be empty
    await expect(searchInput).toHaveValue('');
  });

  test('should display results counter', async ({ page }) => {
    // Check that results counter is visible
    await expect(page.getByText(/\d+ of \d+ products/)).toBeVisible();
  });

  test('should open product modal with details', async ({ page }) => {
    // Click first product
    const firstProduct = page.locator('button').first();
    await firstProduct.click();
    
    // Modal should be visible with product details
    await expect(page.getByText(/Specifications/i)).toBeVisible();
    await expect(page.getByText(/Unit:/i)).toBeVisible();
    await expect(page.getByText(/Stock:/i)).toBeVisible();
    await expect(page.getByText(/Warranty:/i)).toBeVisible();
  });

  test('should close product modal with X button', async ({ page }) => {
    // Open modal
    const firstProduct = page.locator('button').first();
    await firstProduct.click();
    await expect(page.getByText(/Specifications/i)).toBeVisible();
    
    // Close modal
    const closeButton = page.getByRole('button', { name: /close modal/i });
    await closeButton.click();
    
    // Modal should be closed
    await expect(page.getByText(/Specifications/i)).not.toBeVisible();
  });

  test('should close product modal with Escape key', async ({ page }) => {
    // Open modal
    const firstProduct = page.locator('button').first();
    await firstProduct.click();
    await expect(page.getByText(/Specifications/i)).toBeVisible();
    
    // Press Escape
    await page.keyboard.press('Escape');
    
    // Modal should be closed
    await expect(page.getByText(/Specifications/i)).not.toBeVisible();
  });

  test('should display "no results" message when no products match', async ({ page }) => {
    // Search for something that doesn't exist
    const searchInput = page.getByPlaceholder(/search component name/i);
    await searchInput.fill('xyznonexistent12345');
    await page.waitForTimeout(500);
    
    // Check for no results message
    await expect(page.getByText(/No items found matching your criteria/i)).toBeVisible();
  });
});

