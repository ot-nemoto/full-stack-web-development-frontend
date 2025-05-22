"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import productsData from "./sample/dummy_products.json";

type ProductData = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function Page() {
  // 読込データを保持
  const [data, setData] = useState<Array<ProductData>>([]);
  useEffect(() => {
    setData(productsData as ProductData[]);
  }, []);

  // 新規登録処理、新規登録行の表示状態を保持
  const [shownNewRow, setShownNewRow] = useState(false);
  const handleShowNewRow = () => {
    setShownNewRow(true);
  };
  const handleAddCancel = () => {
    setShownNewRow(false);
  };
  const handleAdd = () => {
    // TODO: バックエンドを使用した登録処理を呼ぶ
    setShownNewRow(false);
  };

  // 更新・削除処理、更新・削除行の表示状態を保持
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const handleEditRow = (id: number) => {
    setShownNewRow(false);
    setEditingRow(id);
  };
  const handleEditCancel = (id: number) => {
    setEditingRow(null);
  };
  const handleEdit = (id: number) => {
    setEditingRow(null);
  };
  const handleDelete = (id: number) => {
    setEditingRow(null);
  };

  return (
    <>
      <h2>商品一覧</h2>
      <button type="button" onClick={handleShowNewRow}>
        商品を追加する
      </button>
      <table>
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名</th>
            <th>単価</th>
            <th>説明</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {shownNewRow ? (
            <tr>
              <td />
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="number" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td />
              <td>
                <button type="button" onClick={handleAddCancel}>
                  キャンセル
                </button>
                <button type="button" onClick={handleAdd}>
                  登録する
                </button>
              </td>
            </tr>
          ) : null}
          {data.map((data: ProductData) =>
            editingRow === data.id ? (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>
                  <input type="text" defaultValue={data.name} />
                </td>
                <td>
                  <input type="number" defaultValue={data.price} />
                </td>
                <td>
                  <input type="text" defaultValue={data.description} />
                </td>
                <td />
                <td>
                  <button
                    type="button"
                    onClick={() => handleEditCancel(data.id)}
                  >
                    キャンセル
                  </button>
                  <button type="button" onClick={() => handleEdit(data.id)}>
                    更新する
                  </button>
                  <button type="button" onClick={() => handleDelete(data.id)}>
                    削除する
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td>{data.description}</td>
                <td>
                  <Link href={`/inventory/products/${data.id}`}>在庫処理</Link>
                </td>
                <td>
                  <button type="button" onClick={() => handleEditRow(data.id)}>
                    更新・削除
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </>
  );
}
