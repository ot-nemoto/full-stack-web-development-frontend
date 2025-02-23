type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default async function ProductList() {
  const response = await fetch('http://localhost:3001/products');
  const products = await response.json();

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">商品一覧</h2>
      <button className="bg-green-500 text-white py-2 px-4 rounded mb-4 ml-1">
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
          {products.map((product: Product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                  編集
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
