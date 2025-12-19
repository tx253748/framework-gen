# Business Framework Generator

18種類のビジネスフレームワークを作成・エクスポートできるNext.jsアプリケーション。
AIが生成したJSONをそのままインポートする機能付き。

## 利用制限

| 項目 | 無料版 |
|------|--------|
| フレームワーク | 全18種類 |
| プレビュー | 無制限 |
| PNGエクスポート | 1日3回まで |
| 透かし | あり |

## 対応フレームワーク（18種類）

| カテゴリ | フレームワーク |
|---------|---------------|
| ビジネスモデル | BMC, Lean Canvas |
| 環境分析 | 3C, 5Forces, PESTEL, SWOT |
| マーケティング | STP |
| 戦略立案 | Ansoff, BCG, ValueChain, VRIO |
| 組織分析 | 7S |
| 目標管理 | KPIツリー, OKR, PDCA/OODA |
| 問題解決 | A3 |
| 財務分析 | ユニットエコノミクス, 損益分岐点 |

## 機能

- ✅ 18種類のフレームワーク対応
- ✅ リアルタイムプレビュー
- ✅ PNG画像エクスポート
- ✅ **AIプロンプト生成** - ChatGPT/Claude/Geminiで使えるプロンプトを自動生成
- ✅ **AIインポート** - AIが出力したJSONをそのままインポート
- ✅ JSONエクスポート/インポート

## セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build
npm start
```

## デプロイ

### Vercel（推奨）
```bash
npx vercel
```

### その他
`npm run build` で生成された `.next` フォルダをデプロイ

## AI連携の使い方

### 1. プロンプト生成
1. 「AIプロンプト」ボタンをクリック
2. フレームワークを選択
3. ビジネス概要を入力（任意）
4. 生成されたプロンプトをコピー

### 2. AIで分析
コピーしたプロンプトを以下のAIに入力：
- ChatGPT (GPT-4推奨)
- Claude
- Gemini
- その他

### 3. インポート
1. AIが出力したJSONをコピー
2. 「インポート」ボタンをクリック
3. JSONを貼り付けてインポート

## JSON形式

```json
{
  "framework": "bmc",
  "projectName": "プロジェクト名",
  "data": {
    "keyPartners": "...",
    "keyActivities": "...",
    ...
  }
}
```

## 技術スタック

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Canvas API（画像エクスポート）

## ライセンス

MIT
