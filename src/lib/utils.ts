import { env } from '@/config/env';
import type { CartItem } from '@/types';

/**
 * WhatsApp Service
 * 
 * Handles WhatsApp order integration
 * Follows single responsibility principle
 */
export const whatsappService = {
  /**
   * Generate WhatsApp order message
   */
  generateOrderMessage(items: CartItem[], total: number): string {
    let message = `Hello ${env.businessName}, I would like to place an order for the following items:\n\n`;

    items.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      message += `${index + 1}. ${item.name} (x${item.quantity}) - K${subtotal}\n`;
    });

    message += `\n*TOTAL ORDER VALUE: K${total}*\n\n`;
    message += 'I am ready to proceed with payment and arrange delivery. Thank you!';

    return message;
  },

  /**
   * Generate WhatsApp URL with pre-filled message
   */
  generateWhatsAppUrl(items: CartItem[], total: number): string {
    const message = this.generateOrderMessage(items, total);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${env.whatsappNumber}?text=${encodedMessage}`;
  },

  /**
   * Open WhatsApp with order details
   */
  openWhatsAppOrder(items: CartItem[], total: number): void {
    const url = this.generateWhatsAppUrl(items, total);
    window.open(url, '_blank', 'noopener,noreferrer');
  },
};

/**
 * Format currency for Zambian Kwacha
 */
export const formatCurrency = (amount: number): string => {
  return `K${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Get short category name (without prefix)
 */
export const getShortCategoryName = (category: string): string => {
  return category.split('. ')[1] || category;
};

