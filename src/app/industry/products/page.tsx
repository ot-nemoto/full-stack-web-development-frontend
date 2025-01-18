export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">商品一覧</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">商品名</th>
            <th className="py-2 px-4 border-b">単価</th>
            <th className="py-2 px-4 border-b">説明</th>
            <th className="py-2 px-4 border-b">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">1</td>
            <td className="py-2 px-4 border-b">
              コットン100%バックリボンティアードワンピース（黒）
            </td>
            <td className="py-2 px-4 border-b">6900</td>
            <td className="py-2 px-4 border-b">
              大人の愛らしさを引き立てる、ナチュラルな風合い。リラックスxトレンドを楽しめる、上品なティアードワンピース。
            </td>
            <td className="py-2 px-4 border-b">
              <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                編集
              </button>
              <button className="bg-red-500 text-white py-1 px-3 rounded">
                削除
              </button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">2</td>
            <td className="py-2 px-4 border-b">
              ライトストレッチカットソー（ネイビー）
            </td>
            <td className="py-2 px-4 border-b">2980</td>
            <td className="py-2 px-4 border-b">
              しなやかな肌触りが心地よい、程よいフィット感のカットソー。ビジネスカジュアルにも普段使いにも使える、ベーシックなデザイン。
            </td>
            <td className="py-2 px-4 border-b">
              <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                編集
              </button>
              <button className="bg-red-500 text-white py-1 px-3 rounded">
                削除
              </button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">3</td>
            <td className="py-2 px-4 border-b">
              ベルト付きデニムパンツ（ブルー）
            </td>
            <td className="py-2 px-4 border-b">5980</td>
            <td className="py-2 px-4 border-b">
              定番のデニムパンツに、フェミニンなベルトをプラスしたスタイリッシュなアイテム。カジュアルにもきれいめにも合わせやすい。
            </td>
            <td className="py-2 px-4 border-b">
              <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                編集
              </button>
              <button className="bg-red-500 text-white py-1 px-3 rounded">
                削除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
