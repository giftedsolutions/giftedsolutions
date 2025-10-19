import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

/**
 * Admin Service
 * 
 * Handles all admin-related operations
 * Requires authentication
 */
export const adminService = {
  /**
   * Update product
   */
  async updateProduct(
    id: string,
    updates: Partial<Product>
  ): Promise<Product> {
    console.log('📝 [AdminService] Updating product:', { id, updates });
    
    const { data, error } = await supabase
      .from('products')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ [AdminService] Error updating product:', {
        error,
        id,
        updates,
      });
      throw new Error(`Failed to update product: ${error.message}`);
    }

    console.log('✅ [AdminService] Product updated successfully:', data);
    return data as Product;
  },

  /**
   * Create product
   */
  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    console.log('➕ [AdminService] Creating product:', product);
    
    const { data, error } = await supabase
      .from('products')
      .insert(product as any)
      .select()
      .single();

    if (error) {
      console.error('❌ [AdminService] Error creating product:', {
        error,
        product,
      });
      throw new Error(`Failed to create product: ${error.message}`);
    }

    console.log('✅ [AdminService] Product created successfully:', data);
    return data as Product;
  },

  /**
   * Delete product (soft delete)
   */
  async deleteProduct(id: string): Promise<void> {
    console.log('🗑️ [AdminService] Deleting product (soft delete):', { id });
    
    const { error } = await supabase
      .from('products')
      .update({ is_active: false } as any)
      .eq('id', id);

    if (error) {
      console.error('❌ [AdminService] Error deleting product:', {
        error,
        id,
      });
      throw new Error(`Failed to delete product: ${error.message}`);
    }
    
    console.log('✅ [AdminService] Product deleted successfully (is_active set to false)');
  },

  /**
   * Upload product image to Supabase Storage
   */
  async uploadProductImage(file: File): Promise<string> {
    console.log('📸 [AdminService] Uploading product image:', {
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      fileType: file.type,
    });
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('❌ [AdminService] Error uploading image:', {
        error,
        fileName: file.name,
        filePath,
      });
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    console.log('✅ [AdminService] Image uploaded successfully:', {
      filePath: data.path,
      publicUrl,
    });

    return publicUrl;
  },

  /**
   * Delete product image from Supabase Storage
   */
  async deleteProductImage(imageUrl: string): Promise<void> {
    // Extract file path from URL
    const urlParts = imageUrl.split('/product-images/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      // Don't throw, image might not exist
    }
  },

  /**
   * Get all products (including inactive)
   */
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }

    return data || [];
  },

  /**
   * Get all orders
   */
  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }

    return data || [];
  },

  /**
   * Update order status
   */
  async updateOrderStatus(id: string, status: string) {
    const { error } = await supabase
      .from('orders')
      .update({ status } as any)
      .eq('id', id);

    if (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  },
};

