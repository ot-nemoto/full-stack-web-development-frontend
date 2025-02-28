import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  console.log(data);

  const products = await (
    await fetch(`http://localhost:3001/products?id=${data.product_id}`)
  ).json();

  if (products.length === 0) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  const inventoryHistory = await (
    await fetch(
      `http://localhost:3001/inventories?product_id=${data.product_id}&_sort=-date&_limit=1`
    )
  ).json();

  console.log(inventoryHistory);

  const date = new Date();
  const formattedDate = date
    .toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Tokyo',
    })
    .replace(/\//g, '-');

  let inventory =
    inventoryHistory.length > 0 ? inventoryHistory[0].inventory : 0;

  switch (data.type) {
    case '仕入れ':
      inventory = inventory + data.quantity;
      break;
    case '卸し':
      inventory = inventory - data.quantity;
      if (inventory < 0) {
        return NextResponse.json(
          { message: 'Invalid quantity' },
          { status: 400 }
        );
      }
      break;
    default:
      return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
  }

  const history = {
    product_id: products[0].id,
    type: data.type,
    date: formattedDate,
    price: products[0].price,
    quantity: data.quantity,
    totalPrice: products[0].price * data.quantity,
    inventory: inventory,
  };

  console.log(history);

  const res = await fetch('http://localhost:3001/inventories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(history),
  });

  if (res.ok) {
    return NextResponse.json({ message: 'successful' }, { status: 200 });
  }
  return NextResponse.json({ message: 'failed' }, { status: 400 });
}
