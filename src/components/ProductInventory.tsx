import StockHandler from './StockHandler';
import StockHistory from './StockHistory';

interface ProductInventoryProps {
  id: number;
}

export default async function ProductInventory({ id }: ProductInventoryProps) {
  const product = await (
    await fetch(`http://localhost:3000/api/products/${id}`)
  ).json();

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">商品在庫</h2>
      <StockHandler product={product} />
      <StockHistory id={id} />
    </main>
  );
}
