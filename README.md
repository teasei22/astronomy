# ASTRAEA

文系・物理未履修レベルから、観測・物理・数学・データ解析・論文読解を通して大学学部相当の天文学基礎へ進む、データ駆動の教材 Web アプリです。

## 現在の初期実装

- Level 0–7、合計231レッスン相当のカリキュラム設計
- Level 0–1 の代表6レッスン（Markdown、三層説明、出典、科学的ステータス）
- 学習ダッシュボード、依存関係付きロードマップ
- 検索可能な日英用語集
- 宇宙スケール比較、138億年タイムライン
- Python Astronomy Lab 01
- 理解度チェック、進捗、ノート、ブックマークの localStorage 保存

## 起動

```bash
npm install
npm run dev
```

本番検証:

```bash
npm run typecheck
npm run lint
npm run build
```

## 教材を追加する

1. `CURRICULUM.md` の Lesson ID を選ぶ。
2. `content/level-N/<slug>.md` に既存レッスンと同じ frontmatter と章構造で本文を作る。
3. `data/curriculum.ts` の公開レッスン一覧へ追加する。
4. 新語を `data/glossary.ts` へ登録する。
5. 重要主張に科学的ステータス、一次情報、参照日を付ける。
6. 型検査、lint、本番ビルドを通す。

編集基準は `CONTENT_GUIDELINES.md`、技術境界は `ARCHITECTURE.md`、段階計画は `PROJECT_PLAN.md` を参照してください。

## データ方針

外部天文アーカイブと教材本文を分離します。NASA Exoplanet Archive、Gaia、SDSS、MAST などは provider adapter を通し、データリリース、クエリ、取得日、引用、利用条件を結果に付随させる設計です。初期版は外部 API へ依存せず動作します。
