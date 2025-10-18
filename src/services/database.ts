import { supabase } from '@/lib/supabase';
import type { Product, CreateOrder, Order } from '@/types';

/**
 * Product Service
 * 
 * Handles all product-related database operations
 * Follows repository pattern for clean separation of concerns
 */
export const productService = {
  /**
   * Fetch all active products
   */
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }

    return data || [];
  },

  /**
   * Fetch products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('category', category)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }

    return data || [];
  },

  /**
   * Search products by name or category
   */
  async searchProducts(searchTerm: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }

    return data || [];
  },

  /**
   * Get unique categories
   */
  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .eq('is_active', true)
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    // Extract unique categories
    const categories = [...new Set(data?.map((item) => item.category) || [])];
    return categories;
  },
};

/**
 * Order Service
 * 
 * Handles all order-related database operations
 */
export const orderService = {
  /**
   * Create a new order
   */
  async createOrder(order: CreateOrder): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_name: order.customer_name || null,
        customer_phone: order.customer_phone || null,
        customer_email: order.customer_email || null,
        order_items: order.order_items as any, // Supabase handles JSON serialization
        total_amount: order.total_amount,
        notes: order.notes || null,
        status: 'pending',
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }

    return data as Order;
  },
};

