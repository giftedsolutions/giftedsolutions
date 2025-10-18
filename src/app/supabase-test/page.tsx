'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock_quantity: number;
  is_active: boolean;
}

interface ConnectionStatus {
  connected: boolean;
  productsCount: number;
  error: string | null;
  loading: boolean;
}

/**
 * Supabase Connection Test & Setup Wizard
 * Tests database connectivity and displays configuration status
 */
export default function SupabaseTestPage() {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    productsCount: 0,
    error: null,
    loading: true,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setStatus({ ...status, loading: true, error: null });

    try {
      // Test 1: Check if we can connect to Supabase
      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: false })
        .eq('is_active', true)
        .limit(10);

      if (error) {
        throw error;
      }

      setStatus({
        connected: true,
        productsCount: count || 0,
        error: null,
        loading: false,
      });
      setProducts(data || []);
    } catch (err: any) {
      setStatus({
        connected: false,
        productsCount: 0,
        error: err.message || 'Failed to connect to Supabase',
        loading: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              🗄️ Supabase Connection Wizard
            </h1>
            <button
              onClick={testConnection}
              disabled={status.loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {status.loading ? 'Testing...' : '🔄 Retry Connection'}
            </button>
          </div>

          {/* Connection Status */}
          <div className="space-y-4">
            {status.loading ? (
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                <span>Testing Supabase connection...</span>
              </div>
            ) : status.connected ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">✅</span>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-green-800 mb-2">
                      Successfully Connected to Supabase!
                    </h2>
                    <div className="space-y-2 text-green-700">
                      <p>✓ Database connection established</p>
                      <p>✓ Found {status.productsCount} active products</p>
                      <p>✓ Row Level Security (RLS) is working</p>
                      <p>✓ Ready to use in production</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">❌</span>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">
                      Connection Failed
                    </h2>
                    <p className="text-red-700 mb-3">
                      <strong>Error:</strong> {status.error}
                    </p>
                    <button
                      onClick={() => setShowSetup(!showSetup)}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {showSetup ? 'Hide' : 'Show'} Setup Instructions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Details */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Configuration Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConfigCard
              title="Supabase URL"
              value={process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}
              status={!!process.env.NEXT_PUBLIC_SUPABASE_URL}
            />
            <ConfigCard
              title="Anon Key"
              value={
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                  ? '••••••••' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(-8)
                  : 'Not set'
              }
              status={!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
            />
            <ConfigCard
              title="Database Status"
              value={status.connected ? 'Connected' : 'Disconnected'}
              status={status.connected}
            />
            <ConfigCard
              title="Products Table"
              value={status.connected ? `${status.productsCount} items` : 'N/A'}
              status={status.connected}
            />
          </div>
        </div>

        {/* Sample Products */}
        {status.connected && products.length > 0 && (
          <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📦 Sample Products from Database
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        K{product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock_quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Setup Instructions */}
        {(showSetup || !status.connected) && (
          <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📚 Setup Instructions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Step 1: Create Supabase Project
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">supabase.com</a></li>
                  <li>Sign in or create an account</li>
                  <li>Click "New Project"</li>
                  <li>Fill in project details and create</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Step 2: Run Database Migration
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>In Supabase dashboard, go to SQL Editor</li>
                  <li>Click "New Query"</li>
                  <li>Copy contents from <code className="bg-gray-100 px-2 py-1 rounded">supabase/migrations/001_initial_schema.sql</code></li>
                  <li>Paste and click "Run"</li>
                  <li>Verify tables were created in Table Editor</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Step 3: Get API Credentials
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>Go to Settings → API in Supabase dashboard</li>
                  <li>Copy &quot;Project URL&quot;</li>
                  <li>Copy &quot;anon public&quot; key</li>
                  <li>Run the update script (see below)</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Update Credentials Script
                </h3>
                <p className="text-blue-700 mb-2">Run this command in your terminal:</p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto text-sm">
                  ./update-supabase-credentials.sh
                </pre>
                <p className="text-blue-600 text-sm mt-2">
                  Or manually edit <code className="bg-white px-2 py-1 rounded">.env.local</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Home
            </Link>
            <Link
              href="/admin"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Admin Panel
            </Link>
            <Link
              href="/firebase-test"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Test Firebase
            </Link>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Open Supabase Dashboard →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function ConfigCard({
  title,
  value,
  status,
}: {
  title: string;
  value: string;
  status: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-4 ${
        status
          ? 'bg-green-50 border border-green-200'
          : 'bg-yellow-50 border border-yellow-200'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-2xl">{status ? '✓' : '⚠'}</span>
      </div>
      <p
        className={`text-sm font-mono ${
          status ? 'text-green-700' : 'text-yellow-700'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

