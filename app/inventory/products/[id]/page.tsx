"use client";

import { useEffect, useState } from "react";
import inventoriesData from "../sample/dummy_inventories.json";
import productsData from "../sample/dummy_products.json";
type ProductData = {
  id: number;
  name: string;
  price: number;
  description: string;
};

type InventoryData = {
  id: number;
  type: string;
  date: string;
  unit: number;
  quantity: number;
  price: number;
  inventory: number;
};

export default function Page() {
  // 商品IDにあたる検索条件
  const params = { id: 1 };

  // 読込データを保持
  const [product, setProduct] = useState<ProductData>({
    id: 0,
    name: "",
    price: 0,
    description: "",
  });
  const [data, setData] = useState<Array<InventoryData>>([]);

  useEffect(() => {
    const selectedProduct: ProductData = productsData.find(
      (v) => v.id === params.id,
    ) ?? {
      id: 0,
      name: "",
      price: 0,
      description: "",
    };
    setProduct(selectedProduct);
    setData(inventoriesData);
  }, []);

  return (
    <>
      <h2>商品在庫管理</h2>
      <h3>在庫処理</h3>
      <form>
        <div>
          <span>商品名:</span>
          <span>{product.name}</span>
        </div>
        <div>
          <label htmlFor="quantity">数量:</label>
          <input type="number" id="quantity" />
        </div>
        <button type="submit">商品を仕入れる</button>
        <button type="submit">商品を卸す</button>
      </form>
      <h3>在庫履歴</h3>
      <table>
        <thead>
          <tr>
            <th>処理種別</th>
            <th>処理日時</th>
            <th>単価</th>
            <th>数量</th>
            <th>価格</th>
            <th>在庫数</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data: InventoryData) => (
            <tr key={data.id}>
              <td>{data.type}</td>
              <td>{data.date}</td>
              <td>{data.unit}</td>
              <td>{data.quantity}</td>
              <td>{data.price}</td>
              <td>{data.inventory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
