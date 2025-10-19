import { formatCurrency, getShortCategoryName } from '@/lib/utils';

describe('Utils Functions', () => {
  describe('formatCurrency', () => {
    it('formats currency correctly with ZMW symbol', () => {
      expect(formatCurrency(100)).toBe('K100.00');
      expect(formatCurrency(1000)).toBe('K1,000.00');
      expect(formatCurrency(750.5)).toBe('K750.50');
    });

    it('handles zero correctly', () => {
      expect(formatCurrency(0)).toBe('K0.00');
    });

    it('handles large numbers correctly', () => {
      expect(formatCurrency(10000)).toBe('K10,000.00');
      expect(formatCurrency(1000000)).toBe('K1,000,000.00');
    });

    it('rounds to 2 decimal places', () => {
      expect(formatCurrency(750.555)).toBe('K750.56');
      expect(formatCurrency(750.554)).toBe('K750.55');
    });
  });

  describe('getShortCategoryName', () => {
    it('removes prefix letters from category names', () => {
      expect(getShortCategoryName('A. DEVELOPMENT BOARDS')).toBe('DEVELOPMENT BOARDS');
      expect(getShortCategoryName('B. SENSORS & MODULES')).toBe('SENSORS & MODULES');
      expect(getShortCategoryName('C. DISPLAY & INTERFACE')).toBe('DISPLAY & INTERFACE');
    });

    it('handles categories without prefixes', () => {
      expect(getShortCategoryName('OTHER COMPONENTS')).toBe('OTHER COMPONENTS');
    });

    it('handles empty strings', () => {
      expect(getShortCategoryName('')).toBe('');
    });

    it('handles multiple-character prefixes', () => {
      expect(getShortCategoryName('AA. TEST CATEGORY')).toBe('TEST CATEGORY');
    });
  });
});

