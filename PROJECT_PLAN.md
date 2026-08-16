# ASTRAEA Project Plan

更新日: 2026-08-16

## 1. プロジェクトの目的

ASTRAEA は、天文学・物理学をほぼ未履修の学習者が、観測事実から考える習慣を身につけ、大学学部の天文学・天体物理学の教科書と研究論文へ到達するためのオンライン教科書兼学習環境である。

到達目標は次の4点で測る。

1. 天文学の主要分野を、観測・モデル・不確実性を区別して説明できる。
2. 必要な数学・物理を、天文学上の問いに適用できる。
3. 公開カタログ、光度曲線、スペクトル、画像を Python で扱える。
4. 論文の Abstract、Figures、Conclusion を読み、主張と根拠の強さを評価できる。

ロードマップは各Levelについて、修了後の評価可能な能力とPrerequisitesを公開する。計画教材の公開率、カリキュラム領域の評価証拠、個々の学習者の習得率は別の指標として扱う。

## 2. 教育設計の根拠

大学学部で共通して重視される「物理・数学の基礎」「観測」「計算」「専門天体物理」「研究経験」を骨格とする。

- 東京大学理学部天文学科: 位置天文学・天体力学、銀河天文学、計算天文学、天体観測学、天体輻射論、太陽恒星物理学、星間物理学、恒星進化論、宇宙論、系外惑星、基礎観測・課題研究を配置している。
- 京都大学理学部宇宙物理学: 概論と観測から、基礎宇宙物理、太陽・恒星・惑星、銀河・星間、観測的宇宙論、計算・観測実習、課題研究へ進む。
- Harvard Astrophysics: 力学と微積分を前提に、恒星・惑星、銀河・宇宙論、観測実習、研究チュートリアルへ接続する。
- University of Arizona Astronomy: 力学、電磁気、量子、熱、計算物理を基盤に、観測、恒星、銀河・銀河系外、研究プロジェクトへ進む。
- MIT Astronomy: 物理と微分方程式を基盤に、現代天体物理、惑星科学、観測技術、独立研究を組み合わせる。

ASTRAEA では、この大学型の順序をそのまま初心者へ要求せず、「知りたい天文現象 → 必要な測定 → 必要な物理・数学 → 定量モデル」の順へ組み替える。

## 3. リリース段階

### Phase 0: Foundation

- 設計文書、全カリキュラム、コンテンツスキーマ
- Next.js / TypeScript / Tailwind CSS の基盤
- レスポンシブなアプリシェル、検索、進捗保存
- Level 0 の代表レッスンと Level 1 の導入
- 宇宙スケール、宇宙史タイムライン、Python Lab 1

完了条件: 初学者が「宇宙の住所」レッスンを読み、スケール実験を操作し、理解度チェックを記録できる。

### Phase 1A: Level 0 quality gate（制作継続判定済み）

- Level 0は全18教材を公開し、Course 0A「私たちの宇宙住所」、Course 0B「距離と時間の感覚」、Course 0C「最初の科学的な見方」を完了。全章に予想・即時フィードバック・証拠の鎖・4軸診断・解答・復習提案を実装し、通し履修と第三者テストで難易度・重複・定着を検証する
- 作者が18章を通常の学習者として通し履修し、時間、明瞭さ、難易度、読み飛ばし、再読、未知語、重複、操作迷子を記録する
- 天文学初学者3〜5人へ説明なしでURLを渡し、Pre/Post並行評価、行動観察、7〜14日後の保持確認を行う
- 反復して起きた科学的誤解、離脱、読み飛ばし、進行不能を修正し、別の初学者で再確認する
- 品質監査の結果から`ASTRAEA Lesson Standard v1.0 production baseline`を確定する
- 作者通し履修と初学者pilotは継続するが、Level 1以降の制作を止めず、発見した問題を標準と既存Lessonへ戻す

制作継続条件: 全18章が公開され、未知語・説明依存・問題文・Glossary Coverageの監査を通過し、入口コースとして重大な進行不能がない。2026-08-16に通過した。

`pilot-validated`表示条件: `validation/README.md`のpilotゲートを満たした匿名化レポートがあり、理解・転移・保持を確認できる。この条件は引き続き未達であり、制作継続条件と混同しない。

### Phase 1B: Curriculum lock + Complete Onboarding（現在）

- Lesson Standard v1.0をLevel 1へ適用する
- Level 1〜7のCourse構成、数学・物理の初出位置、依存関係を本文制作前に固定する
- Level 1の全レッスン本文
- 用語集と問題バンクは教材上必要になった分だけ追加する
- ノート、ブックマーク、復習キュー、弱点表示を検証結果に基づいて調整する

完了条件: 短いOverview中心のLevel 1を修了し、宇宙全体の地図と天文学の分野構成を説明し、自分の学習経路を選べる。

### Phase 2: Observation + Foundations

- Level 2 の観測天文学と、必要時学習の数学・物理ブリッジ
- 天球座標、測光、分光、画像、誤差、S/N の実験
- 公開データアダプターの契約テスト
- 最初の定量モジュールとして、角度・年周視差・誤差伝播を実装。数式導出、数値回答、80%修了判定、模擬視差カタログLabを基準実装とする
- 数学・物理は独立コースの完了を一律に要求せず、使用直前に短いBridgeまたは段階的なFoundation Lessonを併設する。高校数学・高校物理の履修を前提にせず、変数・グラフ・力なども意味から始める

完了条件: カタログの基本列、光度曲線、スペクトルの意味を説明できる。

### Phase 3: Objects

- Level 3 太陽系・惑星・系外惑星
- Level 4 恒星・星間物質・コンパクト天体
- 軌道、トランジット、黒体、HR 図、スペクトルの操作教材

完了条件: 物理法則から代表的な観測量を予測できる。

### Phase 4: Galaxies + Cosmology

- Level 5A〜B 天の川・銀河形成進化
- Level 5C 活動銀河核・クエーサー
- Level 5D ダークマター・重力レンズ
- Level 5E 高エネルギー宇宙
- Level 5F 重力波・ニュートリノ・マルチメッセンジャー
- Level 6 宇宙論
- 回転曲線、重力レンズ、距離梯子、膨張、CMB の証拠連鎖

完了条件: 観測事実とモデル仮定を分けて、現代宇宙像を説明できる。

### Phase 5: Research Practice

- Level 7A 理論基礎: 放射過程・流体・プラズマ・統計推論の統合
- Level 7B Computational Astronomy: Python・Astropy・FITS・数値計算
- Level 7C Observational Data Analysis: 画像・スペクトル・光度曲線・カタログ
- Level 7D Research Literacy: 論文・ADS・arXiv・統計的有意性
- Level 7E Capstone: 問いの設計・実データ解析・研究レポート
- 14 の Astronomy Lab、論文読解、5つの Capstone
- 実データ取得、キャッシュ、出典・ライセンス表示

完了条件: 再現可能なノートブックと短い研究レポートを提出できる。

## 4. 品質ゲート

各レッスンは公開前に次を満たす。

- Level 0は説明前の予想と、観測から結論までの証拠の鎖を持つ。
- 新語は使用前または同時に定義する。
- 直感 → 現象 → 測定 → 関係 → 数式の順を守る。
- 観測事実、解釈、モデル、仮説、未解決問題を区別する。
- 数値には単位、基準時点、典拠、取得日を持たせる。
- 図には目的、軸、単位、凡例、読み取り方、アクセシブルな代替説明がある。
- 四種の演習と、誤答がなぜ違うかの説明がある。
- 修了判定は4軸の理解プロフィールと、次に実行する復習を返す。
- モバイル 360 px とデスクトップ 1440 px で読める。
- TypeScript、lint、production build、主要導線のブラウザテストが通る。

## 5. データ戦略

教材本体と外部データ取得を分離する。初期版は出典付きの小規模 JSON / CSV を同梱し、後に同じインターフェースへ NASA Exoplanet Archive TAP、ESA Gaia TAP+、SDSS API、MAST 等のアダプターを接続する。

データ取得時は、配布元、データリリース、クエリ、取得日時、単位、フィルター、引用方法、利用条件をメタデータへ保存する。外部 API 障害時にも教材本文と同梱サンプルは利用できる。

## 6. 公式参照資料

- 東京大学理学部天文学科「カリキュラム（学科）」: https://www.astron.s.u-tokyo.ac.jp/about/undergraduate/
- 京都大学理学部「コースツリー」: https://sci.kyoto-u.ac.jp/ja/education/undergraduate/divisions
- Harvard Department of Astronomy, Concentration Requirements: https://astronomy.fas.harvard.edu/concentration-requirements
- University of Arizona, Four-Year Plan: https://astro.arizona.edu/academics/undergraduate/4-year-plan-astronomy-degree
- MIT Course Catalog, Minor in Astronomy: https://catalog.mit.edu/interdisciplinary/undergraduate-programs/minors/astronomy/
- MIT Course Catalog, Department of Physics: https://catalog.mit.edu/schools/science/physics/
- NASA Exoplanet Archive TAP: https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html
- ESA Gaia Archive: https://gea.esac.esa.int/archive/
- SDSS Data Access: https://www.sdss.org/dr20/data_access/
- NASA Images and Media Guidelines: https://www.nasa.gov/nasa-brand-center/images-and-media/

参照確認日: 2026-08-16。年度やデータリリースに依存する記述は、公開前に再確認する。
