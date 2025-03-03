'use client';

import { useEffect, useState, useCallback } from 'react';
import StockHandler from './StockHandler';
import StockHistory from './StockHistory';

interface ProductInventoryProps {
  productId: number;
}

export default function ProductInventory({ productId }: ProductInventoryProps) {
  const [product, setProduct] = useState(null);
  const [histories, setHistories] = useState([]);

  const fetchProduct = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    const data = await response.json();
    setProduct(data);
  }, [productId]);

  const fetchHistories = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3000/api/inventories?productId=${productId}`
    );
    const data = await response.json();
    setHistories(data);
  }, [productId]);

  useEffect(() => {
    fetchProduct();
    fetchHistories();
  }, [fetchProduct, fetchHistories]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">商品在庫</h2>
      <StockHandler product={product} onSuccess={fetchHistories} />
      <StockHistory histories={histories} />
    </main>
  );
}
