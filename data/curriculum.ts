export type LessonAvailability = "available" | "preview" | "planned";

export type LessonSummary = {
  slug: string;
  code: string;
  title: string;
  duration: number;
  availability: LessonAvailability;
};

export type LevelSummary = {
  level: number;
  title: string;
  subtitle: string;
  domain: string;
  description: string;
  accent: string;
  lessonCount: number;
  capabilities: string[];
  prerequisites: { label: string; href?: string; available: boolean }[];
  courses: { title: string; modules: string[] }[];
};

export const levels: LevelSummary[] = [
  {
    level: 0,
    title: "宇宙への入口",
    subtitle: "Universe basics",
    domain: "基礎",
    description: "地球から観測可能な宇宙まで、数式なしで大きさ・時間・証拠の感覚をつくります。",
    accent: "#64d8cb",
    lessonCount: 18,
    capabilities: [
      "地球から観測可能な宇宙までの階層を、距離の桁とともに説明できる",
      "光の移動時間と、遠方を見ることが過去を見ることになる理由を説明できる",
      "観測事実・モデル・未解決問題を区別し、『なぜ分かるか』を問い直せる",
      "光年を時間ではなく距離として扱い、基本的な宇宙スケールを比較できる",
    ],
    prerequisites: [],
    courses: [
      { title: "私たちの宇宙住所", modules: ["地球から宇宙へ", "恒星から宇宙へ"] },
      { title: "距離と時間の感覚", modules: ["宇宙のものさし", "光で過去を見る"] },
      { title: "最初の科学的な見方", modules: ["見ることから推理する", "最初の誤解をほどく"] },
    ],
  },
  {
    level: 1,
    title: "天文学の地図",
    subtitle: "A map of astronomy",
    domain: "科学的方法",
    description: "観測・理論・計算と、惑星から宇宙論までの分野がどう接続するかを見渡します。",
    accent: "#f6c85f",
    lessonCount: 20,
    capabilities: [
      "観測・理論・計算の役割と、互いに検証し合う関係を説明できる",
      "惑星・恒星・銀河・宇宙論を、対象スケールと観測手段で位置づけられる",
      "歴史的な観測が、どの代替説明を退けたかを説明できる",
      "新しい天文学の問いに対し、必要な測定と専門分野を選べる",
    ],
    prerequisites: [
      { label: "Level 0: 宇宙の階層・光・証拠", href: "/roadmap#level-0", available: true },
    ],
    courses: [
      { title: "天文学という科学", modules: ["三つの研究方法", "スケール別の分野"] },
      { title: "宇宙観を変えた観測", modules: ["空の規則性から物理法則へ", "見えない宇宙を見る"] },
      { title: "現代の観測者たち", modules: ["光を集める施設", "光以外の宇宙"] },
    ],
  },
  {
    level: 2,
    title: "観測する宇宙",
    subtitle: "Observational astronomy",
    domain: "観測",
    description: "座標、距離、光、望遠鏡、測光、分光、誤差を、実際に何を測るかから学びます。",
    accent: "#ef8354",
    lessonCount: 30,
    capabilities: [
      "天球上の位置・角度・時刻を単位つきで扱える",
      "年周視差と距離梯子の適用範囲を判断し、距離と不確かさを計算できる",
      "画像・測光・スペクトル・カタログの基本的な列と軸を読める",
      "ランダム誤差・系統誤差・選択効果を区別し、測定結果の限界を報告できる",
      "望遠鏡・検出器・校正が観測データへ与える影響を説明できる",
    ],
    prerequisites: [
      { label: "Level 1: 観測・理論・計算の地図", href: "/learn/map-of-astronomy", available: true },
      { label: "数学: 比・10の指数・単位換算", href: "/explore/scale", available: true },
      { label: "数学: 一次式・グラフ", available: false },
    ],
    courses: [
      { title: "空の位置・時刻・距離", modules: ["天球と座標", "距離梯子"] },
      { title: "光を測る", modules: ["電磁波", "測光", "分光"] },
      { title: "望遠鏡・検出器・データ", modules: ["光学系", "校正", "データ形式"] },
    ],
  },
  {
    level: 3,
    title: "太陽・惑星・系外惑星",
    subtitle: "Worlds and orbits",
    domain: "惑星・軌道",
    description: "重力と軌道から太陽系の形成、惑星大気、系外惑星検出、生命可能性へ進みます。",
    accent: "#6fb1fc",
    lessonCount: 29,
    capabilities: [
      "ニュートン力学からケプラー則の意味を説明し、軌道周期・距離・質量を関係づけられる",
      "軌道・トランジット・視線速度データから惑星系の基本量を推定できる",
      "太陽系天体を組成・大気・熱収支・形成史で比較できる",
      "系外惑星の検出バイアスと、生命可能性について言える範囲を評価できる",
      "太陽活動と宇宙天気を、磁場と観測データから説明できる",
    ],
    prerequisites: [
      { label: "Level 2: 角度・時刻・測定誤差", href: "/learn/angular-measurement", available: true },
      { label: "数学: 代数・三角比・グラフ", available: false },
      { label: "物理: 速度・加速度・力・エネルギー", available: false },
    ],
    courses: [
      { title: "軌道を支配するもの", modules: ["運動と重力", "天体力学"] },
      { title: "太陽系", modules: ["形成と構造", "惑星比較"] },
      { title: "太陽と宇宙天気", modules: ["太陽活動", "プラズマ"] },
      { title: "系外惑星と生命", modules: ["検出方法", "居住可能性"] },
    ],
  },
  {
    level: 4,
    title: "恒星・星間物質",
    subtitle: "Stars and stellar ecosystems",
    domain: "恒星",
    description: "光から恒星の内部と一生を推理し、白色矮星・中性子星・ブラックホールまで追います。",
    accent: "#f38ba8",
    lessonCount: 30,
    capabilities: [
      "HR図を読み、恒星の色・温度・光度・半径の関係を説明できる",
      "恒星スペクトルから温度・組成・運動の基本情報を読み取れる",
      "静水圧平衡・エネルギー輸送・核融合を用いて恒星内部を説明できる",
      "質量による恒星進化の違いと、白色矮星・中性子星・ブラックホールへ至る条件を説明できる",
      "星間ガス・ダスト、星形成、恒星feedbackの循環を説明できる",
    ],
    prerequisites: [
      { label: "Level 2: 測光・分光・不確かさ", href: "/learn/measurement-uncertainty", available: true },
      { label: "Level 3: 重力・エネルギー・軌道", href: "/roadmap#level-3", available: false },
      { label: "数学: 対数・指数関数・微分", available: false },
      { label: "物理: 熱・圧力・原子・放射", available: false },
    ],
    courses: [
      { title: "恒星を測る", modules: ["色・温度・明るさ", "質量"] },
      { title: "恒星の内部と一生", modules: ["恒星構造", "星形成", "恒星進化"] },
      { title: "コンパクト天体", modules: ["星の残骸", "相対論への橋"] },
      { title: "星間物質", modules: ["ガス・ダスト", "feedback"] },
    ],
  },
  {
    level: 5,
    title: "銀河・極限宇宙",
    subtitle: "Galaxies and messengers",
    domain: "銀河",
    description: "天の川、銀河進化、ダークマターの複数証拠、重力波とニュートリノを統合します。",
    accent: "#a7c957",
    lessonCount: 22,
    capabilities: [
      "Gaiaなどの位置・運動データから天の川銀河の構造を説明できる",
      "銀河の形態・色・星形成率・環境を比較し、進化の仮説を評価できる",
      "回転曲線・銀河団・重力レンズからダークマターの証拠を比較できる",
      "活動銀河核とブラックホール降着の観測的特徴を説明できる",
      "電磁波・重力波・ニュートリノの情報を同じ天体現象へ統合できる",
    ],
    prerequisites: [
      { label: "Level 2: 距離・分光・観測選択", href: "/learn/parallax-distance", available: true },
      { label: "Level 4: 恒星・星間物質・スペクトル", href: "/roadmap#level-4", available: false },
      { label: "数学: ベクトル・統計・回帰", available: false },
    ],
    courses: [
      { title: "天の川銀河", modules: ["構造", "Gaia", "銀河中心"] },
      { title: "銀河の多様性と進化", modules: ["分類と測定", "形成と相互作用"] },
      { title: "見えない質量", modules: ["回転曲線", "銀河団", "重力レンズ"] },
      { title: "マルチメッセンジャー", modules: ["高エネルギー", "重力波・ニュートリノ"] },
    ],
  },
  {
    level: 6,
    title: "宇宙論",
    subtitle: "Cosmology",
    domain: "宇宙論",
    description: "膨張、CMB、元素合成、大規模構造から ΛCDM と現代の未解決問題を評価します。",
    accent: "#c3a6ff",
    lessonCount: 24,
    capabilities: [
      "赤方偏移・距離・膨張率の関係と、複数の宇宙論的距離を区別できる",
      "膨張宇宙の熱史をたどり、元素合成・CMB・大規模構造の証拠を説明できる",
      "ΛCDMの主要パラメータと、それを制約する観測量を対応づけられる",
      "宇宙年齢・地平線・観測可能な宇宙を、時空の膨張を含めて説明できる",
      "観測的緊張を、測定・モデル・系統誤差の可能性に分けて評価できる",
    ],
    prerequisites: [
      { label: "Level 2: 距離・光・統計的不確かさ", href: "/learn/measurement-uncertainty", available: true },
      { label: "Level 5: 銀河・大規模構造", href: "/roadmap#level-5", available: false },
      { label: "数学: 微積分・微分方程式・統計", available: false },
      { label: "物理: 相対論・熱力学", available: false },
    ],
    courses: [
      { title: "膨張する宇宙", modules: ["距離と膨張", "時空の力学"] },
      { title: "熱い初期宇宙", modules: ["Big Bang の証拠", "構造形成"] },
      { title: "標準宇宙論と未解決問題", modules: ["ΛCDM", "観測的緊張"] },
    ],
  },
  {
    level: 7,
    title: "大学天文学・研究実践",
    subtitle: "Undergraduate research practice",
    domain: "研究",
    description: "放射・流体・統計・計算を統合し、公開データ、論文、再現可能な小規模研究へ進みます。",
    accent: "#ff8f70",
    lessonCount: 58,
    capabilities: [
      "放射・流体・統計の基礎モデルを導出し、仮定と適用限界を説明できる",
      "Python・Astropy・FITSを用いて、再現可能な解析手順を作成できる",
      "画像・スペクトル・光度曲線・カタログを校正し、科学的な問いへ接続できる",
      "論文の主張・図・統計・引用を読み、証拠の強さと再現性を評価できる",
      "公開データから問いを立て、解析・図・不確かさ・考察を含む小規模研究を完成できる",
    ],
    prerequisites: [
      { label: "Level 2〜6: 観測と主要天体物理", href: "/roadmap#level-2", available: false },
      { label: "数学: 微積分・線形代数・微分方程式・統計", available: false },
      { label: "計算: Pythonの基本操作", href: "/lab", available: true },
    ],
    courses: [
      { title: "理論基礎", modules: ["放射過程", "流体・プラズマ", "統計推論"] },
      { title: "Computational Astronomy", modules: ["Python・Astropy・FITS", "数値計算", "再現可能な環境"] },
      { title: "Observational Data Analysis", modules: ["画像", "スペクトル", "Light Curve", "Catalog"] },
      { title: "Research Literacy", modules: ["論文・arXiv・ADS", "統計的有意性", "主張と引用"] },
      { title: "Capstone", modules: ["問いの設計", "実データ解析", "研究レポート"] },
    ],
  },
];

export const availableLessons: LessonSummary[] = [
  { slug: "cosmic-address", code: "L0-05", title: "宇宙の住所をたどる", duration: 18, availability: "available" },
  { slug: "light-is-a-time-machine", code: "L0-10", title: "光は宇宙のタイムマシン", duration: 14, availability: "available" },
  { slug: "observable-universe", code: "L0-12", title: "観測可能な宇宙とは", duration: 16, availability: "available" },
  { slug: "how-astronomy-knows", code: "L0-14", title: "触れずに、なぜ分かる？", duration: 20, availability: "available" },
  { slug: "map-of-astronomy", code: "L1-01", title: "天文学の全体地図", duration: 17, availability: "available" },
  { slug: "history-of-evidence", code: "L1-09", title: "観測が宇宙観を変えた", duration: 19, availability: "available" },
  { slug: "angular-measurement", code: "M2-01", title: "角度で宇宙を測る", duration: 50, availability: "available" },
  { slug: "parallax-distance", code: "L2-04", title: "年周視差から距離を測る", duration: 60, availability: "available" },
  { slug: "measurement-uncertainty", code: "M2-02", title: "測定誤差と推定", duration: 70, availability: "available" },
];

export const totalLessonCount = levels.reduce((sum, level) => sum + level.lessonCount, 0);
