'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';

interface Product {
  id: number | null;
  name: string;
  price: number;
  description: string;
}

export default function ProductList() {
  // 商品追加フォームの表示状態
  const [showForm, setShowForm] = useState(false);
  // 商品一覧
  const [products, setProducts] = useState<Product[]>([]);
  // 新規商品情報
  const [newProduct, setNewProduct] = useState<Product>({
    id: null,
    name: '',
    price: 0,
    description: '',
  });

  // 商品追加ボタンクリック時の処理
  const handleAddProductClick = () => {
    setShowForm(true);
  };
  // 商品追加フォームの入力値変更時の処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  // 数値入力用の入力値変更時の処理
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: Number(value), // 入力値を数値に変換
    }));
  };
  // 商品追加フォームのキャンセルボタンクリック時の処理
  const handleCancelClick = () => {
    setShowForm(false);
    setNewProduct({
      id: null,
      name: '',
      price: 0,
      description: '',
    });
  };
  // 商品追加フォームの登録ボタンクリック時の処理
  const handleRegisterClick = async () => {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const product = await response.json();
      setProducts((prevProducts) => [...prevProducts, product]);
      handleCancelClick(); // フォームをリセットして非表示にする
    } else {
      alert('商品登録に失敗しました');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3000/api/products');
      const products = await response.json();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">商品一覧</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={handleAddProductClick}
      >
        商品を追加する
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="py-2 px-4 border-b">商品ID</th>
            <th className="py-2 px-4 border-b">商品名</th>
            <th className="py-2 px-4 border-b">単価</th>
            <th className="py-2 px-4 border-b">説明</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {showForm && (
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b"></td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleNumberInputChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={handleCancelClick}
                >
                  キャンセル
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded"
                  onClick={handleRegisterClick}
                >
                  登録する
                </button>
              </td>
            </tr>
          )}
          {products.map((product: Product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  href={`/inventory/products/${product.id}`}
                  className="text-blue-500 hover:text-blue-700 hover:underline"
                >
                  在庫処理
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
