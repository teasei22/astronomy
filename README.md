# ASTRAEA

文系・物理未履修レベルから、観測・物理・数学・データ解析・論文読解を通して大学学部相当の天文学基礎へ進む、データ駆動の教材 Web アプリです。

## 現在の初期実装

- Level 0–7の到達経路を設計し、教材は学習テストを通した単位で段階公開
- Level 0–2 の38レッスン。Level 0は全18章、Level 1は全12章、Level 2 Course 2Aは全8章を公開。Level 2では数式導出、数値演習、80%修了判定を実装
- 学習ダッシュボード、依存関係付きロードマップ
- 各Levelの到達能力・Prerequisites・領域色、参照大学と評価証拠を示すCurriculum Standard
- 検索可能な日英用語集
- 宇宙スケール比較、138億年タイムライン
- Python Astronomy Lab 01、模擬観測データを使う視差解析Lab
- 用語・概念・推論・データの理解診断、復習提案、進捗、ノート、ブックマークの localStorage 保存

## 現在のマイルストーン

全225学習単位の依存関係を確定し、Level 2 Course 2A「空の位置・時刻・距離」までを制作基準に沿って実装しています。次のゲートはCourse 2Aの作者通し履修です。再現した問題を本文だけでなくLesson Standardと依存関係へ戻してからCourse 2B「光を測る」へ進みます。

Level 0のpilot検証も並行して継続します。実施手順は`validation/README.md`、並行評価は`validation/level-0-assessment.md`、Lessonごとの記録用紙は`validation/level-0-lesson-log.csv`を参照してください。生の参加者ログや個人情報はGitへ保存しません。

## 起動

```bash
npm install
npm run dev
```

本番検証:

```bash
npm run typecheck
npm run lint
npm run check:curriculum
npm run check:terminology
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
