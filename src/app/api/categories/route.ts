import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/database';

/**
 * GET /api/categories
 * 
 * Fetch all unique product categories
 */
export async function GET(request: NextRequest) {
  try {
    const categories = await productService.getCategories();

    return NextResponse.json(
      {
        success: true,
        data: categories,
        count: categories.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}

