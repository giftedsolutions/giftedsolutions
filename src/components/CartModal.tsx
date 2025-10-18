'use client';

import { useCartStore } from '@/store/cart';
import { whatsappService } from '@/lib/utils';
import { CartItem } from './CartItem';
import { X } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Cart Modal Component
 * 
 * Slide-in cart sidebar with order summary
 * - Responsive design
 * - Persistent state
 * - WhatsApp integration
 */
export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const handleCheckout = () => {
    if (items.length === 0) return;

    // Open WhatsApp with order details
    whatsappService.openWhatsAppOrder(items, total);

    // Clear cart after checkout
    clearCart();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white z-50 transform transition-transform duration-300 shadow-2xl overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 id="cart-title" className="text-2xl font-bold text-primary">
              Your Cart
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition"
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
            ) : (
              items.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-200">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-primary">Total:</span>
                <span className="text-2xl text-accent">K{total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 p-3 text-white bg-primary rounded-lg font-bold hover:bg-primary-dark transition duration-200 shadow-md"
              >
                Proceed to WhatsApp Order
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Confirmation and payment arranged via WhatsApp.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

