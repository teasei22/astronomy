# ASTRAEA Architecture

更新日: 2026-08-16

## 1. 方針

教材コンテンツ、学習状態、視覚化、外部天文データを独立させる。教材を数百章へ増やしても UI コードの変更を必要とせず、localStorage から認証付き DB へ移行してもレッスン本文を変更しない構造にする。

## 2. 技術構成

- Next.js App Router / React / TypeScript
- Tailwind CSS
- Markdown + YAML frontmatter（教材本文）
- TypeScript / JSON / CSV（カリキュラム、用語、サンプル観測データ）
- localStorage（初期の学習状態）
- CSS / Canvas / SVG（決定論的な教育図解）
- 静的生成を基本とし、外部データ取得だけ Route Handler または別サービスへ隔離

## 3. ディレクトリ

```text
app/                 画面とルーティング
components/          UI、教材ブロック、インタラクティブ実験
content/level-N/     Markdown レッスン
data/                カリキュラム、用語、施設、データセット定義
CURRICULUM.md         Lesson / Bridge / Lab / Capstoneの正規計画
data/lesson-experiences.ts  本文前の予想・証拠シナリオ
data/skill-bridges.ts       必要時に開く数学・物理の短い復習
data/curriculum-standard.ts 学部相当を判定する領域・評価証拠・参照大学
lib/content/         Markdown の検証と読み込み
lib/progress/        学習状態リポジトリ
lib/data-sources/    外部アーカイブ用アダプター
public/data/         小規模で出典付きの教材用サンプル
public/images/       画像とクレジットメタデータ
validation/          手動pilotの実施手順、並行評価、匿名化レポート雛形
scripts/check-curriculum-plan.mjs  計画ID・件数・公開Lesson対応の検査
```

## 4. コンテンツ契約

```ts
type LessonMeta = {
  slug: string;
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  courseId: string;
  moduleId: string;
  order: number;
  title: string;
  titleEn?: string;
  summary: string;
  durationMinutes: number;
  prerequisites: string[];
  outcomes: string[];
  statusClaims: ScientificClaim[];
  glossaryIds: string[];
  sources: SourceReference[];
  lastReviewed: string;
};
```

frontmatter を実行時スキーマで検証する。slug の重複、存在しない前提レッスン、未登録用語、取得日のない可変情報を CI で失敗させる。

Course 1AはLevel 1以降の基準実装とする。4章すべてにPredict First、Recall / Concept / Reasoning / Dataを含む5問以上の診断、独力演習と解答、`Required Now / Preview Only / Returns In`を必須とし、`lib/content.ts`でビルド時に検証する。専門語のCORE / SUPPORTING / ADVANCED分類とGlossary・診断topicの対応は`data/level-1-term-tiers.json`で監査する。

本文の早い位置で`Required Now / Preview Only / Returns In`を示す。将来frontmatterへ構造化するときも、本文に学習要求が見えることを省略しない。

Levelは説明文だけでなく、観察可能な行動で書く `capabilities` と、公開状態・復習先を持つ `prerequisites` を必須とする。Level色は基礎、科学的方法、観測、惑星・軌道、恒星、銀河、宇宙論、研究の領域識別に一貫して使う。

## 5. 学習状態

UI は `ProgressRepository` のみを参照する。

```ts
interface ProgressRepository {
  load(): Promise<LearnerState>;
  completeLesson(slug: string): Promise<void>;
  saveQuiz(attempt: QuizAttempt): Promise<void>;
  toggleBookmark(slug: string): Promise<void>;
  saveNote(slug: string, note: string): Promise<void>;
}
```

初期実装は `LocalProgressRepository`。将来は Supabase / Postgres 等の `RemoteProgressRepository` を追加し、ログイン時にバージョン付きイベントをマージする。保存キーは `astraea:learner:v1` とし、明示的なマイグレーションを持つ。

各受験は `dimensionScores` と誤答した `reviewTopicIds` を保存する。ホームの理解プロフィールは各教材の最新受験だけを集計し、Recall / Concept / Reasoning / Data の次の復習行動を示す。低得点を固定的な「苦手」と断定しない。

クイズがあるレッスンは、選択式と許容誤差つき数値回答を採点し、80%以上を修了条件とする。完了ボタンだけで習得扱いにしない。Level 2以降は、導出・単位つき計算・データ判断を修了判定へ含める。

## 6. 外部データ境界

```ts
interface AstronomyDataSource<TQuery, TRow> {
  id: string;
  version: string;
  query(input: TQuery): Promise<DataEnvelope<TRow>>;
}

type DataEnvelope<T> = {
  rows: T[];
  provenance: {
    provider: string;
    release: string;
    query: string;
    retrievedAt: string;
    sourceUrl: string;
    citation: string;
    usageTermsUrl: string;
  };
};
```

候補アダプター:

- NASA Exoplanet Archive: IVOA TAP。教材では列を明示し、件数上限を設ける。
- ESA Gaia Archive: TAP+ / ADQL。大規模処理は非同期ジョブとサーバー側キャッシュを使う。
- SDSS: 公開リリースごとにスキーマを固定し、引用すべき Data Release を保持する。
- MAST: TESS / Kepler / Hubble / JWST のデータ製品をミッション別アダプターで扱う。

ブラウザから無制限に直接叩かず、入力検証、レート制御、タイムアウト、キャッシュ、許可列を持つ Route Handler を通す。外部サービス停止時は同梱 snapshot にフォールバックし、データ取得日を画面に表示する。

## 7. ルーティング

```text
/                       学習ダッシュボード
/roadmap                全体ロードマップと依存関係
/learn/[slug]           三層レッスン
/glossary               用語検索
/explore/scale          宇宙スケール実験
/explore/timeline       宇宙史タイムライン
/lab                    Python Astronomy Lab
```

## 8. レンダリング方針

- カリキュラム、用語、本文は Server Component で読み、検索用の軽量 index だけ Client Component へ渡す。
- シミュレーション、クイズ、ノートは Client Component に限定する。
- 図の状態は URL search params へ反映し、説明と同じ状態を共有できるようにする。
- インタラクティブ教材は教材本文から ID で参照し、Markdown 内に複雑なロジックを書かない。

## 9. セキュリティとプライバシー

初期版は学習データを端末内だけに保存し、解析送信を行わない。外部リンクと取得データは信頼境界として扱い、Markdown の生 HTML は許可しない。将来のコード実行 Lab は分離 sandbox を使用し、アプリサーバー上で任意 Python を実行しない。

## 10. テスト

- Unit: 単位変換、進捗計算、前提依存、クイズ採点
- Content: frontmatter、リンク、用語、出典、全 Level のカバレッジ
- Component: Layer 開閉、検索、保存、キーボード操作
- E2E: 初回訪問 → 予想 → 証拠の段階表示 → 4軸診断 → 完了 → ダッシュボード反映
- Visual: 360 / 768 / 1440 px、ライトではなく基本ダークテーマ、200% 拡大
- Education: 作者の通し履修、初学者のPre/Post、行動観察、7〜14日後の保持確認。生ログはGit管理外とし、匿名化した集計だけを公開する

## 11. 意思決定記録

- ADR-001: Markdown を正文とし、本文を React コンポーネントへハードコードしない。
- ADR-002: 数値・用語・進捗は構造化データ、説明は Markdown に置く。
- ADR-003: 外部データは必ず provenance envelope 付きで返す。
- ADR-004: 初期版の Lab は説明・コード・可視化を同梱し、ブラウザ内 Python 実行は後続フェーズにする。
- ADR-005: 教材総数を先に固定しない。`CURRICULUM.md`の一意な学習単位を数え、`data/curriculum.ts`との一致を自動検査する。
- ADR-006: 数学・物理はL2〜6の初出直前に導入し、L7では初出ではなく導出・計算・研究利用へ統合する。
