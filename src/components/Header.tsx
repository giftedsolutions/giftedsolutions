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
 * - Purple and gold color scheme
 * - Responsive design
 * - Cart count badge
 */
export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <>
      <header className="bg-[#4b0082] p-4 shadow-lg sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div>
            <h1 className="text-3xl font-extrabold text-[#ffc107] text-center uppercase">
              Gifted Solutions Inventory
            </h1>
            <p className="text-sm text-white text-center italic">Bringing Ideas to Life</p>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 rounded-lg bg-[#ffc107] hover:bg-[#ffb300] transition duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Open shopping cart"
          >
            <ShoppingCart className="h-6 w-6 text-[#4b0082]" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[20px]">
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

