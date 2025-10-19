'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin';
import type { Product } from '@/types';
import { Plus, Search, Edit, Trash2, Image as ImageIcon, AlertCircle, Package } from 'lucide-react';
import { ProductEditModal } from '@/components/admin/ProductEditModal';
import { formatCurrency, getShortCategoryName } from '@/lib/utils';

/**
 * Products Management Page
 * 
 * CRUD interface for managing products
 */
export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, categoryFilter]);

  const loadProducts = async () => {
    console.log('📦 [AdminProducts] Loading products...');
    const startTime = Date.now();
    
    try {
      setLoading(true);
      const data = await adminService.getAllProducts();
      const endTime = Date.now();
      
      console.log('✅ [AdminProducts] Products loaded successfully:', {
        count: data.length,
        fetchTime: `${endTime - startTime}ms`,
        timestamp: new Date().toISOString(),
      });
      console.log('📦 [AdminProducts] Sample products:', data.slice(0, 3).map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        image_url: p.image_url,
        is_active: p.is_active,
      })));
      
      setProducts(data);
      setError('');
    } catch (err: any) {
      console.error('❌ [AdminProducts] Failed to load products:', err);
      console.error('❌ [AdminProducts] Error details:', {
        message: err.message,
        code: err.code,
        details: err.details,
        hint: err.hint,
        stack: err.stack,
      });
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    console.log('🔍 [AdminProducts] Filtering products:', {
      totalProducts: products.length,
      searchTerm,
      categoryFilter,
    });
    
    let filtered = products;

    if (categoryFilter !== 'All') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search)
      );
    }

    console.log('✅ [AdminProducts] Filtered results:', {
      filteredCount: filtered.length,
      originalCount: products.length,
    });

    setFilteredProducts(filtered);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    console.log('🗑️ [AdminProducts] Deleting product:', { id: product.id, name: product.name });

    try {
      await adminService.deleteProduct(product.id);
      console.log('✅ [AdminProducts] Product deleted successfully');
      await loadProducts();
    } catch (err: any) {
      console.error('❌ [AdminProducts] Failed to delete product:', err);
      console.error('❌ [AdminProducts] Error details:', {
        message: err.message,
        code: err.code,
        productId: product.id,
      });
      alert(err.message || 'Failed to delete product');
    }
  };

  const handleSave = async () => {
    await loadProducts();
    setEditingProduct(null);
    setIsCreating(false);
  };

  const categories = [...new Set(products.map((p) => p.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {getShortCategoryName(category)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">{product.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getShortCategoryName(product.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-primary hover:text-primary-dark"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {(editingProduct || isCreating) && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => {
            setEditingProduct(null);
            setIsCreating(false);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

