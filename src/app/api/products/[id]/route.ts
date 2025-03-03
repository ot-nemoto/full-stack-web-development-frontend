import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const response = await fetch(`http://localhost:3001/products?id=${id}`);
  const product = await response.json();

  if (product.length > 0) {
    return NextResponse.json(product[0], { status: 200 });
  } else {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}
