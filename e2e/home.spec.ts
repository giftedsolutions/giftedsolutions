import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the header with business name', async ({ page }) => {
    await expect(page.getByText('Gifted Solutions Inventory')).toBeVisible();
    await expect(page.getByText('Bringing Ideas to Life')).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await expect(page.getByText(/Contact:.*0779421717/)).toBeVisible();
    await expect(page.getByText(/Location:.*Lusaka, Chalala near ICU/)).toBeVisible();
  });

  test('should display search and filter section', async ({ page }) => {
    await expect(page.getByPlaceholder(/search component name/i)).toBeVisible();
    await expect(page.getByRole('combobox', { name: /filter by category/i })).toBeVisible();
  });

  test('should display products', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('section[class*="grid"]', { timeout: 10000 });
    
    // Check if at least one product is displayed
    const productCards = await page.locator('div[class*="bg-white"][class*="rounded"]').count();
    expect(productCards).toBeGreaterThan(0);
  });

  test('should filter products by search', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('section[class*="grid"]', { timeout: 10000 });
    
    const searchInput = page.getByPlaceholder(/search component name/i);
    await searchInput.fill('Arduino');
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    
    // Check that results contain Arduino products
    await expect(page.getByText(/Arduino/i).first()).toBeVisible();
  });

  test('should display cart button', async ({ page }) => {
    const cartButton = page.getByRole('button', { name: /open shopping cart/i });
    await expect(cartButton).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await expect(page.getByText(/Countrywide delivery available/i)).toBeVisible();
    await expect(page.getByText(/giftedsolutions-53124.web.app/i)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    
    await expect(page.getByText('Gifted Solutions Inventory')).toBeVisible();
    await expect(page.getByPlaceholder(/search component name/i)).toBeVisible();
  });

  test('should open product modal when product is clicked', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('section[class*="grid"]', { timeout: 10000 });
    
    // Wait a bit for React to hydrate
    await page.waitForTimeout(1000);
    
    // Click on a product card area (find by product name and click it)
    const productName = page.locator('text=Arduino').first();
    await productName.click();
    
    // Check if modal is open (looking for modal elements)
    await expect(page.getByText(/Specifications/i)).toBeVisible({ timeout: 5000 });
  });
});

