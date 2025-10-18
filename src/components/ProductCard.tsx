'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import type { Product } from '@/types';
import { getShortCategoryName, formatCurrency } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { ProductModal } from './ProductModal';

interface ProductCardProps {
  product: Product;
}

/**
 * Product Card Component
 * 
 * Displays individual product with image and add to cart functionality
 * - Click to view details in modal
 * - Responsive design
 * - Image support
 */
export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  const placeholderImage = `https://placehold.co/400x300/f0f0f0/4b0082?text=${encodeURIComponent(
    product.name.substring(0, 20)
  )}`;

  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.06)] hover:ring-2 hover:ring-[#4b0082] transition duration-200">
        {/* Product Image - Clickable */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full mb-3 rounded-lg overflow-hidden bg-gray-50 hover:opacity-90 transition cursor-pointer"
        >
          <div className="aspect-[4/3] relative">
            <img
              src={product.image_url || placeholderImage}
              alt={product.name}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = placeholderImage;
              }}
            />
          </div>
        </button>

        {/* Product Info */}
        <div className="flex justify-between items-start">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-grow pr-4 text-left hover:text-[#4b0082] transition cursor-pointer"
          >
            <p className="text-lg font-semibold text-gray-900 leading-tight">{product.name}</p>
          </button>
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
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

