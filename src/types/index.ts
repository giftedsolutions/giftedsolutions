import { z } from 'zod';

/**
 * Product schema for runtime validation
 * Ensures type safety when handling product data from external sources
 */
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive'),
  unit: z.string().default('each'),
  description: z.string().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  stock_quantity: z.number().int().nonnegative().default(0),
  is_active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

/**
 * Cart item schema
 */
export const CartItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  unit: z.string().optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

/**
 * Order creation schema
 */
export const CreateOrderSchema = z.object({
  customer_name: z.string().optional(),
  customer_phone: z.string().optional(),
  customer_email: z.string().email().optional(),
  order_items: z.array(CartItemSchema),
  total_amount: z.number().positive(),
  notes: z.string().optional(),
});

export type CreateOrder = z.infer<typeof CreateOrderSchema>;

/**
 * Order schema
 */
export const OrderSchema = z.object({
  id: z.string().uuid(),
  customer_name: z.string().nullable(),
  customer_phone: z.string().nullable(),
  customer_email: z.string().nullable(),
  order_items: z.array(CartItemSchema),
  total_amount: z.number().positive(),
  status: z.enum(['pending', 'processing', 'completed', 'cancelled']),
  notes: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;

/**
 * Product category enum for type safety
 */
export const ProductCategory = {
  DEVELOPMENT_BOARDS: 'A. DEVELOPMENT BOARDS',
  SENSORS_MODULES: 'B. SENSORS & MODULES',
  DISPLAY_INTERFACE: 'C. DISPLAY & INTERFACE',
  COMMUNICATION: 'D. COMMUNICATION',
  MOTORS_DRIVERS: 'E. MOTORS & DRIVERS',
  RELAY_POWER: 'F. RELAY & POWER CONTROL',
  POWER_SUPPLY: 'G. POWER SUPPLY & REGULATORS',
  BREADBOARDS_MISC: 'H. BREADBOARDS & MISC',
  OTHER_COMPONENTS: 'I. OTHER COMPONENTS',
} as const;

export type ProductCategoryType = typeof ProductCategory[keyof typeof ProductCategory];

