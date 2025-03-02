import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default async function ProductList() {
  const response = await fetch('http://localhost:3000/api/products');
  const products = await response.json();

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">商品一覧</h2>
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
