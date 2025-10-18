'use client';

import { useCartStore } from '@/store/cart';
import type { Product } from '@/types';
import { getShortCategoryName, formatCurrency } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

/**
 * Product Card Component
 * 
 * Displays individual product with add to cart functionality
 * - Optimistic UI updates
 * - Responsive design
 * - Image optimization
 */
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  const placeholderImage = `https://placehold.co/400x250/f0f0f0/4b0082?text=${encodeURIComponent(
    product.name.substring(0, 20)
  )}`;

  return (
    <div className="bg-white p-5 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.06)] flex justify-between items-start hover:ring-2 hover:ring-[#4b0082] transition duration-200">
      <div className="flex-grow pr-4">
        <p className="text-lg font-semibold text-gray-900 leading-tight">{product.name}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-2xl font-bold text-[#4b0082]">{formatCurrency(product.price)}</p>
        <button
          onClick={handleAddToCart}
          className="mt-2 px-3 py-1 text-sm text-white bg-[#ffc107] hover:bg-[#ffb300] rounded-lg transition duration-200 font-semibold flex items-center gap-1"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
    </div>
  );
}

