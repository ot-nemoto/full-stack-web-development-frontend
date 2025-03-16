import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("productId");

  const response = await fetch(
    `http://localhost:3001/inventories?product_id=${productId}&_sort=date&_order=desc`,
  );
  const inventories = await response.json();

  return NextResponse.json(inventories, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const products = await (
    await fetch(`http://localhost:3001/products?id=${data.product_id}`)
  ).json();

  if (products.length === 0) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  // 最新の在庫情報を取得する関数
  const getQuantityInStock = async () => {
    const response = await fetch(
      `http://localhost:3001/inventories?product_id=${data.product_id}&_sort=date&_order=desc&_limit=1`,
    );
    const inventories = await response.json();
    return inventories.length > 0 ? inventories[0].inventory : 0;
  };

  const date = new Date();
  const formattedDate = date
    .toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Tokyo",
    })
    .replace(/\//g, "-");

  let inventory = await getQuantityInStock();

  switch (data.type) {
    case "仕入れ":
      inventory = inventory + data.quantity;
      break;
    case "卸し":
      inventory = inventory - data.quantity;
      if (inventory < 0) {
        return NextResponse.json(
          { message: "Invalid quantity" },
          { status: 400 },
        );
      }
      break;
    default:
      return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  }

  // 新しいIDを生成する関数
  const generateNewId = async () => {
    const response = await fetch(
      "http://localhost:3001/inventories?_sort=id&_order=desc&_limit=1",
    );
    const products = await response.json();
    const maxId = products.length > 0 ? products[0].id : 0;
    return maxId + 1;
  };

  const history = {
    id: await generateNewId(),
    product_id: products[0].id,
    type: data.type,
    date: formattedDate,
    price: products[0].price,
    quantity: data.quantity,
    totalPrice: products[0].price * data.quantity,
    inventory: inventory,
  };

  const res = await fetch("http://localhost:3001/inventories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(history),
  });

  if (res.ok) {
    return NextResponse.json(await res.json(), { status: 200 });
  }
  return NextResponse.json({ message: "failed" }, { status: 400 });
}
