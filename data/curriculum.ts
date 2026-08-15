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
  description: string;
  accent: string;
  lessonCount: number;
  courses: { title: string; modules: string[] }[];
};

export const levels: LevelSummary[] = [
  {
    level: 0,
    title: "宇宙への入口",
    subtitle: "Universe basics",
    description: "地球から観測可能な宇宙まで、数式なしで大きさ・時間・証拠の感覚をつくります。",
    accent: "#64d8cb",
    lessonCount: 18,
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
    description: "観測・理論・計算と、惑星から宇宙論までの分野がどう接続するかを見渡します。",
    accent: "#f6c85f",
    lessonCount: 20,
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
    description: "座標、距離、光、望遠鏡、測光、分光、誤差を、実際に何を測るかから学びます。",
    accent: "#ef8354",
    lessonCount: 30,
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
    description: "重力と軌道から太陽系の形成、惑星大気、系外惑星検出、生命可能性へ進みます。",
    accent: "#6fb1fc",
    lessonCount: 29,
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
    description: "光から恒星の内部と一生を推理し、白色矮星・中性子星・ブラックホールまで追います。",
    accent: "#f38ba8",
    lessonCount: 30,
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
    description: "天の川、銀河進化、ダークマターの複数証拠、重力波とニュートリノを統合します。",
    accent: "#a7c957",
    lessonCount: 22,
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
    description: "膨張、CMB、元素合成、大規模構造から ΛCDM と現代の未解決問題を評価します。",
    accent: "#c3a6ff",
    lessonCount: 24,
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
    description: "放射・流体・統計・計算を統合し、公開データ、論文、再現可能な小規模研究へ進みます。",
    accent: "#ff8f70",
    lessonCount: 58,
    courses: [
      { title: "天体物理の共通言語", modules: ["力学と連続体", "物質と放射"] },
      { title: "統計・計算・観測解析", modules: ["統計推論", "数値計算", "観測解析"] },
      { title: "Astronomy Lab", modules: ["Python", "時系列", "カタログ・スペクトル"] },
      { title: "論文と研究リテラシー", modules: ["読み方", "主張の評価"] },
      { title: "Capstone", modules: ["5つの小規模研究"] },
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
];

export const totalLessonCount = levels.reduce((sum, level) => sum + level.lessonCount, 0);
