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

  try {
    // Fetch products and categories in parallel
    [products, categories] = await Promise.all([
      productService.getProducts(),
      productService.getCategories(),
    ]);
  } catch (err) {
    console.error('Failed to fetch products:', err);
    error = 'Failed to load products. Please try again later.';
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
          </div>
        </main>
      ) : (
        <ProductGrid products={products} categories={categories} />
      )}

      <Footer />
    </div>
  );
}

