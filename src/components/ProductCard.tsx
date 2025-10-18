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
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Product Image */}
      <div className="h-32 mb-3 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 bg-gray-50 relative">
        <Image
          src={product.image_url || placeholderImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-contain p-2"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = placeholderImage;
          }}
        />
      </div>

      {/* Category Badge */}
      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
        {getShortCategoryName(product.category)}
      </p>

      {/* Product Name */}
      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
        {product.name}
      </h3>

      {/* Price and Action */}
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
        <span className="text-2xl font-extrabold text-accent">
          {formatCurrency(product.price)}
        </span>
        <button
          onClick={handleAddToCart}
          className="text-sm px-3 py-1.5 text-white bg-primary rounded-lg hover:bg-primary-dark transition duration-200 shadow-md flex items-center gap-1"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
    </div>
  );
}

