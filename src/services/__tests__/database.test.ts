import { productService } from '@/services/database';
import { supabase } from '@/lib/supabase';

// Mock Supabase
jest.mock('@/lib/supabase');

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('Product Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('fetches products successfully', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Arduino Uno',
          price: 750,
          category: 'A. DEVELOPMENT BOARDS',
          is_active: true,
        },
        {
          id: '2',
          name: 'DHT11 Sensor',
          price: 250,
          category: 'B. SENSORS & MODULES',
          is_active: true,
        },
      ];

      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
      };
      
      // The last order call should resolve with data
      mockChain.order.mockResolvedValueOnce({
        data: mockProducts,
        error: null,
      });

      (mockSupabase.from as jest.Mock).mockReturnValue(mockChain);

      const result = await productService.getProducts();

      expect(mockSupabase.from).toHaveBeenCalledWith('products');
      expect(mockChain.select).toHaveBeenCalledWith('*');
      expect(mockChain.eq).toHaveBeenCalledWith('is_active', true);
      expect(result).toEqual(mockProducts);
    });

    it('handles errors when fetching products', async () => {
      const mockError = { message: 'Database error' };

      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
      };
      
      // The last order call should resolve with error
      mockChain.order.mockResolvedValueOnce({
        data: null,
        error: mockError,
      });

      (mockSupabase.from as jest.Mock).mockReturnValue(mockChain);

      await expect(productService.getProducts()).rejects.toThrow('Failed to fetch products');
    });
  });

  describe('getCategories', () => {
    it('fetches unique categories successfully', async () => {
      const mockProducts = [
        { category: 'A. DEVELOPMENT BOARDS' },
        { category: 'B. SENSORS & MODULES' },
        { category: 'A. DEVELOPMENT BOARDS' }, // Duplicate
      ];

      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({
          data: mockProducts,
          error: null,
        }),
      };

      (mockSupabase.from as jest.Mock).mockReturnValue(mockChain);

      const result = await productService.getCategories();

      expect(result).toEqual([
        'A. DEVELOPMENT BOARDS',
        'B. SENSORS & MODULES',
      ]);
      expect(result.length).toBe(2); // Should remove duplicate
    });
  });
});

