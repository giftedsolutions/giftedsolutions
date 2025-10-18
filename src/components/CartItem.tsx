'use client';

import { useCartStore } from '@/store/cart';
import type { CartItem as CartItemType } from '@/types';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

/**
 * Cart Item Component
 * 
 * Individual cart item with quantity controls
 */
export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (!isNaN(quantity)) {
      updateQuantity(item.id, quantity);
    }
  };

  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
      <div className="flex-grow">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">
          K{item.price} x {item.quantity}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={item.quantity}
          min="0"
          onChange={handleQuantityChange}
          className="w-12 text-center border rounded-md p-1 text-sm focus:ring-accent focus:border-accent"
          aria-label={`Quantity for ${item.name}`}
        />
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

