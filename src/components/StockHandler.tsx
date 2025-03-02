'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function StockHandler({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (eventType: string) => {
    if (quantity <= 0) {
      return;
    }

    const history = {
      product_id: product.id,
      type: eventType,
      quantity: quantity,
    };

    const res = await fetch('http://localhost:3000/api/inventories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(history),
    });

    if (res.ok) {
      alert('在庫処理が完了しました');
    } else {
      alert('エラーが発生しました');
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0 && Number.isInteger(value)) {
      setQuantity(value);
    } else {
      setQuantity(0);
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4">在庫処理</h3>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center mb-4">
            <span className="mr-2">商品名:</span>
            <span className="font-bold">{product.name}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="mr-2">数量:</span>
            <input
              type="number"
              value={quantity}
              className="border border-gray-200 rounded px-2 py-1"
              onChange={handleQuantityChange}
            />
          </div>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => handleSubmit('仕入れ')}
          >
            商品を仕入れる
          </button>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => handleSubmit('卸し')}
          >
            商品を卸す
          </button>
        </form>
      </div>
    </>
  );
}
