import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { requireSellerAuth } from '@/lib/sellerAuth';
import { logError } from '@/lib/errorTracking';

// GET - Fetch all products
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query: any = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, products },
      { status: 200 }
    );
  } catch (error: unknown) {
    logError(error instanceof Error ? error : new Error('Unknown error'), {
      endpoint: '/api/products',
      method: 'GET',
    });
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create a new product (seller only)
export async function POST(request: NextRequest) {
  try {
    // Check seller authentication
    const authError = requireSellerAuth(request);
    if (authError) {
      return authError;
    }

    await connectDB();

    const body = await request.json();
    const product = new Product(body);
    await product.save();

    return NextResponse.json(
      { success: true, product },
      { status: 201 }
    );
  } catch (error: unknown) {
    logError(error instanceof Error ? error : new Error('Unknown error'), {
      endpoint: '/api/products',
      method: 'POST',
    });
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

