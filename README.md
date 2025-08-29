# 日記アプリ

その日の出来事を素早く書き留め、同一画面で下部に時系列で蓄積・閲覧できるシンプルな日記アプリです。

## 🎯 特徴

- **シンプルな入力**: 複数行テキストエリアで素早く記録
- **オフライン対応**: ブラウザ内のIndexedDBに保存
- **時系列表示**: 新しい順で記録を一覧表示
- **キーボード操作**: ⌘/Ctrl+Enterで素早く追加
- **データ永続化**: ページ再読み込み後も記録が保持

## 🚀 技術スタック

- **フロントエンド**: Next.js 15.5.2 (App Router)
- **言語**: TypeScript
- **データベース**: IndexedDB (Dexie.js)
- **スタイリング**: Tailwind CSS
- **開発環境**: ESLint, Prettier

## 📋 要件定義

詳細な要件定義は [docs/requirements.md](./docs/requirements.md) をご覧ください。

## 🛠️ 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 📁 プロジェクト構造

```
todo-app/
├── docs/
│   └── requirements.md    # 要件定義書
├── src/
│   └── app/
│       ├── page.tsx       # メインページ
│       ├── layout.tsx     # レイアウト
│       └── globals.css    # グローバルスタイル
├── public/                # 静的ファイル
└── package.json
```

## 🎨 機能

### 基本機能
- [x] 記録の追加（テキストエリア + ボタン/キーボードショートカット）
- [x] 記録の一覧表示（新しい順）
- [x] 記録の削除
- [x] データの永続化（IndexedDB）

### 拡張機能（予定）
- [ ] 文字数カウント
- [ ] 削除後のUndo機能
- [ ] ダーク/ライトテーマ対応
- [ ] 日付別アーカイブ

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start

# リント
npm run lint
```

## 📝 ライセンス

このプロジェクトは学習目的で作成されています。

---

**作成者**: [Your Name]  
**作成日**: 2024年12月
