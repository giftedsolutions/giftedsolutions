import { NextRequest, NextResponse } from 'next/server';
import { orderService } from '@/services/database';
import { CreateOrderSchema } from '@/types';
import { z } from 'zod';

/**
 * POST /api/orders
 * 
 * Create a new order
 * Validates request body and stores order in database
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = CreateOrderSchema.parse(body);

    // Create order in database
    const order = await orderService.createOrder(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid order data',
          details: (error as any).errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order',
      },
      { status: 500 }
    );
  }
}

