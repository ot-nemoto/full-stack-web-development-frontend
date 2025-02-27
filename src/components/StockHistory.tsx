interface StckHistoryProps {
  id: number;
}

interface History {
  id: number;
  product_id: number;
  type: string;
  date: string;
  price: number;
  quantity: number;
  totalPrice: number;
  inventory: number;
}

export default async function StckHistory({ id }: StckHistoryProps) {
  const histories = await (
    await fetch(
      `http://localhost:3001/inventories?product_id=${id}&_sort=-date`
    )
  ).json();

  return (
    <>
      <h3 className="text-xl font-bold mb-4">在庫履歴</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="py-2 px-4 border-b">処理種別</th>
            <th className="py-2 px-4 border-b">処理日時</th>
            <th className="py-2 px-4 border-b">単価</th>
            <th className="py-2 px-4 border-b">数量</th>
            <th className="py-2 px-4 border-b">価格</th>
            <th className="py-2 px-4 border-b">在庫数</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history: History) => (
            <tr key={history.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{history.type}</td>
              <td className="py-2 px-4 border-b">{history.date}</td>
              <td className="py-2 px-4 border-b">{history.price}</td>
              <td className="py-2 px-4 border-b">{history.quantity}</td>
              <td className="py-2 px-4 border-b">{history.totalPrice}</td>
              <td className="py-2 px-4 border-b">{history.inventory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
