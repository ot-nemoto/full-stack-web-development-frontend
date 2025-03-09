import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`);
    const product = await response.json();
    if (product) {
      return NextResponse.json(product, { status: 200 });
    } else {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return NextResponse.json(
        { message: 'Product deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to delete product' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
