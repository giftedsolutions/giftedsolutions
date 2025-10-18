'use client';

import { useState } from 'react';
import type { Product } from '@/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

/**
 * Product Detail Modal Component
 * 
 * Shows product images, description, and details
 * - Image carousel
 * - Product description
 * - Add to cart functionality
 */
export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  // Placeholder images for products (you can replace with actual product images)
  const productImages = product.image_url 
    ? [product.image_url]
    : [
        `https://placehold.co/600x400/4b0082/ffffff?text=${encodeURIComponent(product.name.substring(0, 15))}`,
        `https://placehold.co/600x400/6a0dad/ffffff?text=${encodeURIComponent('Details')}`,
        `https://placehold.co/600x400/8b21c1/ffffff?text=${encodeURIComponent('View 2')}`,
      ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image Section */}
            <div>
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4">
                <img
                  src={productImages[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain p-4"
                />

                {/* Image Navigation */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-800" />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition ${
                            index === currentImageIndex
                              ? 'bg-[#4b0082] w-6'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition ${
                        index === currentImageIndex
                          ? 'border-[#4b0082]'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col">
              {/* Category Badge */}
              <p className="text-xs text-[#4b0082] uppercase font-semibold mb-2">
                {product.category}
              </p>

              {/* Product Name */}
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-[#4b0082]">
                  {formatCurrency(product.price)}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 
                    `High-quality ${product.name} suitable for electronics projects and prototyping. Perfect for Arduino, Raspberry Pi, and other microcontroller applications. Reliable performance and easy integration.`
                  }
                </p>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Specifications</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Category: {product.category}</li>
                  <li>• In Stock: Available</li>
                  <li>• Warranty: 30 days replacement guarantee</li>
                  <li>• Delivery: Countrywide available</li>
                </ul>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  onAddToCart();
                  onClose();
                }}
                className="w-full py-4 bg-[#ffc107] hover:bg-[#ffb300] text-white font-bold text-lg rounded-lg transition duration-200 shadow-lg"
              >
                Add to Cart - {formatCurrency(product.price)}
              </button>

              {/* Contact Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  Need assistance? Contact us on WhatsApp:{' '}
                  <a
                    href="https://wa.me/260779421717"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4b0082] font-semibold hover:underline"
                  >
                    0779421717
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

