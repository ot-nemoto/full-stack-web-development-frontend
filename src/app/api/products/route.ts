import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('http://localhost:3001/products');
  const products = await response.json();

  return NextResponse.json(products, { status: 200 });
}
