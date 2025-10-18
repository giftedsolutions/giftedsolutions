import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/database';

/**
 * GET /api/products
 * 
 * Fetch all active products
 * Supports query parameters for filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let products;

    if (category) {
      products = await productService.getProductsByCategory(category);
    } else if (search) {
      products = await productService.searchProducts(search);
    } else {
      products = await productService.getProducts();
    }

    return NextResponse.json(
      {
        success: true,
        data: products,
        count: products.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}

