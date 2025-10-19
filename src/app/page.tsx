import { productService } from '@/services/database';
import { Header } from '@/components/Header';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';

/**
 * Home Page - Server Component
 * 
 * Fetches products server-side for optimal SEO and initial load performance
 * Implements ISR (Incremental Static Regeneration) for dynamic content with caching
 */
export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function HomePage() {
  let products: any[] = [];
  let categories: string[] = [];
  let error = null;
  let debugInfo = null;

  console.log('🏠 [HomePage] Starting product fetch...');
  const startTime = Date.now();

  try {
    // Fetch products and categories in parallel
    [products, categories] = await Promise.all([
      productService.getProducts(),
      productService.getCategories(),
    ]);
    
    const endTime = Date.now();
    debugInfo = {
      productsCount: products.length,
      categoriesCount: categories.length,
      fetchTime: `${endTime - startTime}ms`,
      timestamp: new Date().toISOString(),
    };
    
    console.log('✅ [HomePage] Products loaded successfully:', debugInfo);
    console.log('📦 [HomePage] Sample products:', products.slice(0, 3).map(p => ({ id: p.id, name: p.name, image_url: p.image_url })));
    console.log('📂 [HomePage] Categories:', categories);
    
  } catch (err: any) {
    console.error('❌ [HomePage] Failed to fetch products:', err);
    console.error('❌ [HomePage] Error details:', {
      message: err.message,
      code: err.code,
      details: err.details,
      hint: err.hint,
    });
    error = `Failed to load products: ${err.message || 'Unknown error'}`;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {error ? (
        <main className="container mx-auto p-8 flex-grow">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-semibold">{error}</p>
            <p className="text-sm text-gray-600 mt-2">
              Please check your Supabase configuration or try refreshing the page.
            </p>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm font-medium text-gray-700">Debug Info</summary>
              <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto">
                {JSON.stringify({ error, timestamp: new Date().toISOString() }, null, 2)}
              </pre>
            </details>
          </div>
        </main>
      ) : (
        <>
          <ProductGrid products={products} categories={categories} />
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white text-xs p-3 rounded-lg max-w-sm">
              <div className="font-bold mb-1">🐛 Debug Info</div>
              <div>Products: {debugInfo.productsCount}</div>
              <div>Categories: {debugInfo.categoriesCount}</div>
              <div>Fetch Time: {debugInfo.fetchTime}</div>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}

