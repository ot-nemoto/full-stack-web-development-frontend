import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('http://localhost:3001/products');
  const products = await response.json();

  return NextResponse.json(products, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  // バリデーション
  if (!data.name || typeof data.name !== 'string') {
    return NextResponse.json(
      { message: 'Invalid or missing name' },
      { status: 400 }
    );
  }
  if (!data.price || typeof data.price !== 'number') {
    return NextResponse.json(
      { message: 'Invalid or missing price' },
      { status: 400 }
    );
  }
  if (!data.description || typeof data.description !== 'string') {
    return NextResponse.json(
      { message: 'Invalid or missing description' },
      { status: 400 }
    );
  }

  // 新しいIDを生成する関数
  const generateNewId = async () => {
    const response = await fetch(
      'http://localhost:3001/products?_sort=-id&_limit=1'
    );
    const products = await response.json();
    const maxId = products.length > 0 ? parseInt(products[0].id, 10) : 0;
    return maxId + 1;
  };

  const product = {
    id: await generateNewId(),
    name: data.name,
    price: data.price,
    description: data.description,
  };

  const res = await fetch('http://localhost:3001/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (res.ok) {
    // 登録した商品情報を返す
    return NextResponse.json(await res.json(), { status: 200 });
  }
  return NextResponse.json({ message: 'failed' }, { status: 400 });
}
