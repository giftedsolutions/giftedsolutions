'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Search } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

/**
 * Product Grid Component
 * 
 * Main product listing with search and filter capabilities
 * - Client-side filtering for instant feedback
 * - Responsive grid layout
 * - Empty state handling
 */
export function ProductGrid({ products, categories }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Memoized filtered products for performance
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [products, searchTerm, selectedCategory]);

  return (
    <main className="container mx-auto p-4 lg:p-8">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 mb-8 rounded-xl sticky top-[72px] z-10 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search components (e.g., Uno, sensor, L298N)..."
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              aria-label="Search products"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-accent focus:border-accent"
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.split('. ')[1] || category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <div className="text-center p-12 bg-white rounded-lg">
          <p className="text-2xl font-semibold text-gray-500">No products found.</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filter.</p>
        </div>
      )}
    </main>
  );
}

