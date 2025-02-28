import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = await params;
  const response = await fetch(
    `http://localhost:3001/inventories?product_id=${productId}&_sort=-date`
  );
  const inventories = await response.json();

  return NextResponse.json(inventories, { status: 200 });
}
