'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { ShoppingCart } from 'lucide-react';
import { CartModal } from './CartModal';
import { env } from '@/config/env';

/**
 * Header Component
 * 
 * Sticky header with logo and cart button
 * - Responsive design
 * - Cart count badge
 * - Brand colors
 */
export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <>
      <header className="bg-primary p-4 shadow-lg sticky top-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a6 6 0 00-6 6c0 1.954.673 3.746 1.96 5.148l.247.388A1 1 0 007 15.69v-1.894A8 8 0 0110 4.2c1.789 0 3.407.747 4.568 1.947l.117.114a1 1 0 001.272-1.565 8 8 0 00-5.155-2.916zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-white uppercase tracking-wider">
              {env.businessName}
            </span>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full bg-white hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Open shopping cart"
          >
            <ShoppingCart className="h-6 w-6 text-primary" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

