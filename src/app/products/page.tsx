export default function Page() {
  return (
    <>
      <h2>商品一覧</h2>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        商品を追加する
      </button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">商品名</th>
            <th className="px-4 py-2">単価</th>
            <th className="px-4 py-2">説明</th>
            <th className="px-4 py-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">
              コットン100%バックリボンティアードワンピース（黒）
            </td>
            <td className="border px-4 py-2">6900</td>
            <td className="border px-4 py-2">
              大人の愛らしさを引き立てる、ナチュラルな風合い。リラックスxトレンドを楽しめる、上品なティアードワンピース。
            </td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                編集
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                削除
              </button>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">2</td>
            <td className="border px-4 py-2">
              ライトストレッチカットソー（ネイビー）
            </td>
            <td className="border px-4 py-2">2980</td>
            <td className="border px-4 py-2">
              しなやかな肌触りが心地よい、程よいフィット感のカットソー。ビジネスカジュアルにも普段使いにも使える、ベーシックなデザイン。
            </td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                編集
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                削除
              </button>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">3</td>
            <td className="border px-4 py-2">
              ベルト付きデニムパンツ（ブルー）
            </td>
            <td className="border px-4 py-2">5980</td>
            <td className="border px-4 py-2">
              定番のデニムパンツに、フェミニンなベルトをプラスしたスタイリッシュなアイテム。カジュアルにもきれいめにも合わせやすい。
            </td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                編集
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                削除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
