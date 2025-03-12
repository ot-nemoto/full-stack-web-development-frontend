"use client";

import type { Severity } from "@/components/Alert";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface StockHandlerProps {
  product: Product;
  onSuccess: () => void;
  showAlert: (msg: string, sev: Severity) => void;
}

export default function StockHandler({
  product,
  onSuccess,
  showAlert,
}: StockHandlerProps) {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (actionType: string) => {
    if (quantity <= 0) {
      showAlert("数量は0より大きい整数でなければなりません", "error");
      return;
    }

    const history = {
      product_id: product.id,
      type: actionType,
      quantity: quantity,
    };

    const res = await fetch("http://localhost:3000/api/inventories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(history),
    });

    if (res.ok) {
      showAlert("在庫処理が完了しました", "success");
      setQuantity(0); // 在庫処理の数量を初期化
      onSuccess(); // 在庫履歴を更新するためのコールバック関数を呼び出す
    } else {
      showAlert("エラーが発生しました", "error");
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
            onClick={() => handleSubmit("仕入れ")}
          >
            商品を仕入れる
          </button>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => handleSubmit("卸し")}
          >
            商品を卸す
          </button>
        </form>
      </div>
    </>
  );
}
