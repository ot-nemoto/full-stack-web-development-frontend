'use client';

import { useEffect, useState, useCallback } from 'react';
import StockHandler from './StockHandler';
import StockHistory from './StockHistory';
import Alert, { Severity } from './Alert';

interface ProductInventoryProps {
  productId: number;
}

export default function ProductInventory({ productId }: ProductInventoryProps) {
  const [product, setProduct] = useState(null);
  const [histories, setHistories] = useState([]);
  const [severity, setSeverity] = useState<Severity>('info');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  // productIdが変更されたときに商品情報を取得するCallBack関数を作成
  const fetchProduct = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    const data = await response.json();
    setProduct(data);
  }, [productId]);

  // productIdが変更されたときに商品情報を取得するCallBack関数を作成
  const fetchHistories = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3000/api/inventories?productId=${productId}`
    );
    const data = await response.json();
    setHistories(data);
  }, [productId]);

  // fetchProductとfetchHistoriesが作成されたときに実行
  useEffect(() => {
    fetchProduct();
    fetchHistories();
  }, [fetchProduct, fetchHistories]);

  // messageが変更されたときにvisibleを更新
  useEffect(() => {
    setVisible(message !== '');
  }, [message]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-grow p-4">
      <Alert severity={severity} visible={visible}>
        {message}
      </Alert>
      <h2 className="text-2xl font-bold mb-4">商品在庫</h2>
      <StockHandler
        product={product}
        onSuccess={fetchHistories}
        setSeverity={setSeverity}
        setMessage={setMessage}
      />
      <StockHistory histories={histories} />
    </main>
  );
}
