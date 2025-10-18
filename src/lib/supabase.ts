import { createClient } from '@supabase/supabase-js';
import { env } from '@/config/env';
import type { Database } from '@/types/supabase';

/**
 * Supabase Client
 * 
 * Singleton instance for type-safe database operations
 * Uses environment configuration for connection details
 */
export const supabase = createClient<Database>(
  env.supabaseUrl,
  env.supabaseAnonKey,
  {
    auth: {
      persistSession: false, // We're not using authentication for public shop
    },
  }
);

/**
 * Client-side Supabase utilities
 */
export const supabaseClient = {
  /**
   * Test database connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const { error } = await supabase.from('products').select('count').limit(1).single();
      return !error;
    } catch {
      return false;
    }
  },
};

