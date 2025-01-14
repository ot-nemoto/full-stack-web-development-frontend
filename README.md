# full-stack-web-development-frontend

```sh
yarn --version
  # 1.22.22
npx --version
  # 10.9.0
node --version
  # v22.12.0
```

## アプリケーションを作成する

```sh
yarn create next-app frontend
✔ Would you like to use TypeScript? … No / [Yes]
✔ Would you like to use ESLint? … No / [Yes]
✔ Would you like to use Tailwind CSS? … No / [Yes]
✔ Would you like your code inside a `src/` directory? … No / [Yes]
✔ Would you like to use App Router? (recommended) … No / [Yes]
✔ Would you like to use Turbopack for `next dev`? … [No] / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … [No] / Yes
```

> - yarn はデフォルトでは最新のバージョンのテンプレートを使用する
> - タイミングによってバージョンの変更により構成が変わることもあるので、今回は `npx create-next-app` で環境を合わせる。
> - この場合 `yarn create next-app frontend` の実行は不要
>
> ```sh
> npx create-next-app@15.1.4 frontend --use-yarn
> ✔ Would you like to use TypeScript? … No / [Yes]
> ✔ Would you like to use ESLint? … No / [Yes]
> ✔ Would you like to use Tailwind CSS? … No / [Yes]
> ✔ Would you like your code inside a `src/` directory? … No / [Yes]
> ✔ Would you like to use App Router? (recommended) … No / [Yes]
> ✔ Would you like to use Turbopack for `next dev`? … [No] / Yes
> ✔ Would you like to customize the import alias (`@/*` by default)? … [No] / Yes
> ```

## ホットリロード対応

devcontainer 環境の場合、ソースコードの変更を検知出来ない場合があるため、WATCHPACK_POLLING 環境変数を設定。<br>
また、turbopack によるビルドでは検知できなかったため、無効（webpack）で実行させるように設定を変更。

```json
{
  "scripts": {
    "dev": "WATCHPACK_POLLING=true next dev"
  }
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
