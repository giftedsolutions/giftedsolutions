import { test, expect } from '@playwright/test';

test.describe('Admin Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin');
  });

  test('should display admin login page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /admin login/i })).toBeVisible();
    await expect(page.getByText(/sign in to access the admin dashboard/i)).toBeVisible();
  });

  test('should display login form fields', async ({ page }) => {
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should display forgot password link', async ({ page }) => {
    await expect(page.getByText(/forgot password/i)).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.getByLabel(/email address/i).fill('invalid@email.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Wait for error message
    await expect(page.getByText(/access denied/i)).toBeVisible({ timeout: 5000 });
  });

  test('should switch to password reset form', async ({ page }) => {
    await page.getByText(/forgot password/i).click();
    
    await expect(page.getByRole('button', { name: /send reset email/i })).toBeVisible();
    await expect(page.getByText(/back to login/i)).toBeVisible();
  });

  test('should navigate back to store', async ({ page }) => {
    await page.getByRole('link', { name: /back to store/i }).click();
    
    // Should be on home page
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Gifted Solutions Inventory')).toBeVisible();
  });
});

test.describe('Admin Dashboard (Authenticated)', () => {
  test.skip('should redirect to dashboard after login', async ({ page }) => {
    // Note: This test requires valid credentials
    // Skip by default to avoid authentication issues
    await page.goto('/admin');
    
    // Fill in credentials (replace with test credentials)
    await page.getByLabel(/email address/i).fill('peternondo1@gmail.com');
    await page.getByLabel(/password/i).fill('test-password');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/admin/dashboard', { timeout: 10000 });
  });

  test.skip('should display admin navigation', async ({ page }) => {
    // Note: This test requires authentication
    // Skip by default
    await page.goto('/admin/dashboard');
    
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    await expect(page.getByText(/products/i)).toBeVisible();
    await expect(page.getByText(/orders/i)).toBeVisible();
  });
});

