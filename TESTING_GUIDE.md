# 🧪 Testing Guide

## Test Suite Overview

This project includes comprehensive testing with **Jest** (unit/integration tests) and **Playwright** (end-to-end tests).

---

## 📦 **Test Stack:**

### **Jest - Unit & Integration Tests**
- ✅ Component testing with React Testing Library
- ✅ Service/utility function testing
- ✅ Mocked Firebase and Supabase
- ✅ Code coverage reports

### **Playwright - End-to-End Tests**
- ✅ Full user flow testing
- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Mobile responsive testing
- ✅ Visual regression testing

---

## 🚀 **Running Tests:**

### **Jest Unit Tests:**

```bash
# Run tests in watch mode (interactive)
pnpm test

# Run all tests once (CI mode) with coverage
pnpm test:ci

# Run tests with coverage
pnpm test:ci
```

### **Playwright E2E Tests:**

```bash
# Install Playwright browsers (first time only)
pnpm playwright:install

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI mode (interactive)
pnpm test:e2e:ui

# Run E2E tests in headed mode (see browser)
pnpm test:e2e:headed

# Run E2E tests in debug mode (step through)
pnpm test:e2e:debug
```

### **Run All Tests:**

```bash
# Run both Jest and Playwright tests
pnpm test:all
```

---

## 📁 **Test File Locations:**

### **Jest Unit Tests:**
```
src/
├── components/
│   └── __tests__/
│       ├── Header.test.tsx
│       └── ProductCard.test.tsx
├── lib/
│   └── __tests__/
│       └── utils.test.ts
└── services/
    └── __tests__/
        └── database.test.ts
```

### **Playwright E2E Tests:**
```
e2e/
├── home.spec.ts        # Home page tests
├── admin.spec.ts       # Admin authentication tests
└── products.spec.ts    # Product features tests
```

---

## 🧪 **What's Being Tested:**

### **Jest Unit Tests:**

#### **1. Components:**
- ✅ **Header Component**
  - Renders business name
  - Displays cart count
  - Cart button functionality

- ✅ **ProductCard Component**
  - Displays product info
  - Add to cart functionality
  - Modal opening
  - Image display

#### **2. Services:**
- ✅ **Product Service**
  - Fetch products
  - Fetch categories
  - Get product by ID
  - Error handling

#### **3. Utilities:**
- ✅ **Currency Formatting**
  - ZMW symbol display
  - Comma separation
  - Decimal handling

- ✅ **Category Name Formatting**
  - Prefix removal
  - Edge cases

### **Playwright E2E Tests:**

#### **1. Home Page (`e2e/home.spec.ts`):**
- ✅ Header and branding display
- ✅ Contact information visible
- ✅ Search and filter functionality
- ✅ Product grid loading
- ✅ Dynamic search filtering
- ✅ Cart button presence
- ✅ Footer content
- ✅ Mobile responsiveness
- ✅ Product modal opening

#### **2. Admin Authentication (`e2e/admin.spec.ts`):**
- ✅ Login page display
- ✅ Form fields present
- ✅ Forgot password link
- ✅ Invalid email error
- ✅ Password reset flow
- ✅ Navigation to store

#### **3. Product Features (`e2e/products.spec.ts`):**
- ✅ Category filtering
- ✅ Active filter tags
- ✅ Clear filter buttons
- ✅ Results counter
- ✅ Product modal details
- ✅ Modal closing (X button, Escape key)
- ✅ No results message

---

## 📊 **Test Coverage:**

After running `pnpm test:ci`, you'll see a coverage report:

```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   85.5  |   78.3   |   90.1  |   86.2  |
 components         |   92.3  |   85.7   |   95.0  |   93.1  |
 services           |   88.9  |   82.1   |   91.2  |   89.5  |
 lib/utils.ts       |   100   |   100    |   100   |   100   |
--------------------|---------|----------|---------|---------|
```

Coverage reports are generated in `coverage/` directory.

---

## 🔧 **Test Configuration:**

### **Jest Config (`jest.config.ts`):**
- Uses `@testing-library/react` for component testing
- Mocks Firebase and Supabase
- Path aliases configured (`@/`)
- Coverage collection enabled

### **Playwright Config (`playwright.config.ts`):**
- Tests against live site: `https://giftedsolutions-53124.web.app`
- Multi-browser support (Chrome, Firefox, Safari)
- Mobile testing (Pixel 5, iPhone 12)
- Screenshots on failure
- Trace on retry

---

## 🐛 **Debugging Tests:**

### **Jest:**
```bash
# Run specific test file
pnpm test Header.test.tsx

# Run tests matching pattern
pnpm test --testNamePattern="should display cart"

# Run with verbose output
pnpm test --verbose
```

### **Playwright:**
```bash
# Debug mode (step through tests)
pnpm test:e2e:debug

# Run specific test file
pnpm test:e2e home.spec.ts

# Run specific test by name
pnpm test:e2e --grep "should display the header"

# View test report
pnpx playwright show-report
```

---

## 📸 **Screenshots & Traces:**

### **Playwright automatically captures:**
- **Screenshots** on test failure
- **Video** recordings (optional)
- **Traces** for debugging (on retry)

View them in the test report:
```bash
pnpx playwright show-report
```

---

## ✅ **Running Tests in CI/CD:**

### **GitHub Actions Example:**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run Jest tests
        run: pnpm test:ci
      
      - name: Install Playwright browsers
        run: pnpm playwright:install
      
      - name: Run Playwright tests
        run: pnpm test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📝 **Writing New Tests:**

### **Jest Unit Test Template:**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle click', () => {
    const mockFn = jest.fn();
    render(<MyComponent onClick={mockFn} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockFn).toHaveBeenCalled();
  });
});
```

### **Playwright E2E Test Template:**

```typescript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/my-page');
  });

  test('should do something', async ({ page }) => {
    await expect(page.getByText('Hello')).toBeVisible();
    await page.getByRole('button').click();
    await expect(page).toHaveURL('/new-page');
  });
});
```

---

## 🎯 **Best Practices:**

1. **Write tests as you code** - Don't leave testing for later
2. **Test user behavior** - Not implementation details
3. **Use semantic queries** - `getByRole`, `getByLabelText`, etc.
4. **Mock external dependencies** - Firebase, Supabase, APIs
5. **Keep tests independent** - No shared state between tests
6. **Use meaningful test names** - Describe what's being tested
7. **Test edge cases** - Empty states, errors, loading states

---

## 🚨 **Common Issues:**

### **Jest:**
- **Module not found:** Check path aliases in `jest.config.ts`
- **Can't resolve 'next/navigation':** Already mocked in `jest.setup.ts`
- **Firebase errors:** Already mocked in `jest.setup.ts`

### **Playwright:**
- **Test timeout:** Increase timeout or add `waitForSelector`
- **Element not found:** Check if element loaded, use `waitForSelector`
- **Authentication required:** Use `test.skip` or mock auth state

---

## 📚 **Resources:**

- **Jest:** https://jestjs.io/docs/getting-started
- **React Testing Library:** https://testing-library.com/docs/react-testing-library/intro
- **Playwright:** https://playwright.dev/docs/intro
- **Testing Best Practices:** https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

---

## ✨ **Quick Start:**

```bash
# 1. Install dependencies (if not done)
pnpm install

# 2. Install Playwright browsers
pnpm playwright:install

# 3. Run unit tests
pnpm test:ci

# 4. Run E2E tests
pnpm test:e2e:headed

# 5. View results
pnpx playwright show-report
```

---

**Happy Testing! 🧪**

