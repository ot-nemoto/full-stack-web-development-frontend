# full-stack-web-development-frontend

## devcontainer の設定

```json
{
	"name": "frontend",
	"image": "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm",
	"features": {
		"ghcr.io/devcontainers/features/git:1": {}
	}
}
```

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
✔ Would you like to use ESLint? … [No] / Yes
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
> Need to install the following packages:
> create-next-app@15.2.2
> Ok to proceed? (y)
>
> ✔ Would you like to use TypeScript? … No / [Yes]
> ✔ Would you like to use ESLint? … [No] / Yes
> ✔ Would you like to use Tailwind CSS? … No / [Yes]
> ✔ Would you like your code inside a `src/` directory? … No / [Yes]
> ✔ Would you like to use App Router? (recommended) … No / [Yes]
> ✔ Would you like to use Turbopack for `next dev`? … [No] / Yes
> ✔ Would you like to customize the import alias (`@/*` by default)? … [No] / Yes
> ```

```
mv frontend/* .
mv frontend/.* .

rm -r frontend
```

## Formater / Lineter の設定

```sh
yarn add -D @biomejs/biome
```

```sh
yarn biome init
```

_biome.json_

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": false,
    "clientKind": "git",
    "useIgnoreFile": false
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": []
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space"
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double"
    }
  }
}
```

- formatter.indentStyleの `tab` を `space` に変更

### フォーマットチェック

```sh
yarn biome format src/
```

### 構文チェック

```sh
yarn biome lint src/
```

### devcontainer.jsonの変更

_.devcontainer/devcontaner.json_

```json
{
  "name": "frontend",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm",
  "features": {
    "ghcr.io/devcontainers/features/git:1": {}
  },

  "postCreateCommand": "yarn install",

  "customizations": {
    "vscode": {
      "extensions": ["biomejs.biome"],
      "settings": {
        "editor.defaultFormatter": "biomejs.biome",
        "editor.formatOnSave": true, // 保存時に自動フォーマットを有効にする設定
        "editor.insertSpaces": true,
        "editor.detectIndentation": false,
        "editor.tabSize": 2,
        "files.trimTrailingWhitespace": true,
        "editor.codeActionsOnSave": {
          "source.organizeImports": "explicit" // 保存時にimport文の自動整形を有効にする設定
        }
      }
    }
  }
}
```

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

## API モック対応

API のモックとして、json-server を利用。

```sh
yarn add -D json-server@0.17.4
```

yarn で起動させるために、`package.json` に以下の設定を追加。

```json
{
  "scripts": {
    "json-server": "json-server --watch data.json --port 3001 --host 0.0.0.0"
  }
}
```

## 開発環境を起動

```sh
yarn json-server
```

```sh
yarn dev
```

### コンポーネント関連図

**商品一覧**

```mermaid
graph TD;
  page --> Header
  page --> ProductMain[ProductMain<br>商品一覧]
  page --> Footer

```

**商品在庫**

```mermaid
graph TD;
  page --> Header
  page --> StockMain[StockMain<br>商品在庫]
  StockMain --> StockAction[StockAction<br>在庫処理]
  StockMain --> StockHistory[StockHistory<br>在庫履歴]
  page --> Footer
```

### 内部 API とモック API の関連図

- 実際はバックエンド API と接続するが、開発環境においては、モック API を利用する。
- 但し、バックエンド API とモック API とではインタフェースが異なる為、内部 API を介して接続させる。

**本番環境**

```mermaid
sequenceDiagram
  participant Frontend
  participant BackendAPI
  Frontend->>BackendAPI: /api/products
```

**開発環境**

```mermaid
sequenceDiagram
  participant Frontend
  participant InternalAPI
  participant MockAPI
  Frontend->>InternalAPI: /api/products
  InternalAPI->>MockAPI: /products
```
