import InventoryProcessing from './InventoryProcessing';
import StockHistory from './StockHistory';

interface ProductInventoryProps {
  id: number;
}

export default async function ProductInventory({ id }: ProductInventoryProps) {
  const product = await (
    await fetch(`http://localhost:3001/products?id=${id}`)
  ).json();

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">商品在庫</h2>
      <InventoryProcessing product={product[0]} />
      <StockHistory id={id} />
    </main>
  );
}
