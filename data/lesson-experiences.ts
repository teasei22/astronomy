type EvidenceStep = {
  label: string;
  detail: string;
};

type SequenceStep = {
  current: string;
  prompt: string;
  options: string[];
  correct: number;
  feedback: string[];
};

type PredictionExperience = {
  kind: "prediction";
  title: string;
  setup: string;
  prompt: string;
  options: string[];
  correct: number;
  feedback: string[];
  evidenceQuestion: string;
  evidence: EvidenceStep[];
};

type SequenceExperience = {
  kind: "sequence";
  title: string;
  setup: string;
  steps: SequenceStep[];
  evidenceQuestion: string;
  evidence: EvidenceStep[];
};

export type LessonExperience = PredictionExperience | SequenceExperience;

export const lessonExperiences: Record<string, LessonExperience> = {
  "cosmic-address": {
    kind: "sequence",
    title: "あなたは、宇宙のどこにいる？",
    setup: "地球から視野を一段ずつ広げます。いま見ている構造を含む、次の構造を選んでください。",
    steps: [
      {
        current: "地球",
        prompt: "地球を含む、一段外側の構造は？",
        options: ["月", "太陽系", "天の川銀河"],
        correct: 1,
        feedback: ["月は地球の外側を回る天体で、地球を含む構造ではありません。", "地球は太陽を回る惑星の一つです。", "天の川銀河も地球を含みますが、一段外側は太陽系です。"],
      },
      {
        current: "太陽系",
        prompt: "太陽系を含む、一段外側の構造は？",
        options: ["局所銀河群", "天の川銀河", "観測可能な宇宙"],
        correct: 1,
        feedback: ["局所銀河群は天の川銀河を含む、さらに外側の構造です。", "太陽は天の川銀河にある多数の恒星の一つです。", "観測可能な宇宙までには、いくつもの階層があります。"],
      },
      {
        current: "天の川銀河",
        prompt: "天の川銀河を含む、一段外側の構造は？",
        options: ["局所銀河群", "太陽系", "宇宙の網"],
        correct: 0,
        feedback: ["天の川銀河とアンドロメダ銀河などが局所銀河群を作ります。", "太陽系は天の川銀河の内側です。", "宇宙の網は銀河群よりさらに大きな分布です。"],
      },
      {
        current: "局所銀河群",
        prompt: "さらに視野を広げると、銀河はどんな分布を作る？",
        options: ["均一な格子", "宇宙の網", "一つの巨大銀河"],
        correct: 1,
        feedback: ["銀河は完全に均一でも規則的な格子でもありません。", "銀河はフィラメントや壁に集まり、間に空洞を作ります。", "大規模構造は一つの重力的に結びついた銀河ではありません。"],
      },
      {
        current: "宇宙の網",
        prompt: "私たちが信号を受け取れる範囲を何と呼ぶ？",
        options: ["観測可能な宇宙", "天の川銀河", "宇宙全体"],
        correct: 0,
        feedback: ["観測可能な宇宙は、宇宙全体と同じとは限りません。", "天の川銀河は、宇宙の網を作る銀河の一つです。", "宇宙全体の大きさや外側は、観測だけでは確定していません。"],
      },
    ],
    evidenceQuestion: "この入れ子構造を、どうやって確かめた？",
    evidence: [
      { label: "位置を測る", detail: "天体の空での方向と、その時間変化を記録します。" },
      { label: "距離を測る", detail: "レーダー、年周視差、標準光源などを、重なる距離で校正します。" },
      { label: "運動を測る", detail: "固有運動とスペクトルのずれから、重力的に同じ集団かを調べます。" },
      { label: "三次元地図にする", detail: "多数の銀河の位置と赤方偏移を集めると、宇宙の網が現れます。" },
    ],
  },
  "light-is-a-time-machine": {
    kind: "prediction",
    title: "いま見ている光は、いつの光？",
    setup: "地球から100光年離れた恒星を、今夜望遠鏡で観測したとします。",
    prompt: "望遠鏡に届いたのは、恒星のいつの姿でしょう？",
    options: ["今この瞬間", "100年前", "100年後"],
    correct: 1,
    feedback: ["恒星の『今』の光は、地球へ向かって進んでいる途中です。", "光が100年間進んで届いたため、100年前の姿を見ています。", "未来の情報が先に届くことはありません。"],
    evidenceQuestion: "光の移動時間を、どう確かめる？",
    evidence: [
      { label: "距離を独立に測る", detail: "近い恒星では年周視差から距離を求めます。" },
      { label: "光速を使う", detail: "真空中の光速と距離から、光が進んだ時間を計算します。" },
      { label: "変化を照合する", detail: "超新星や変光星の時系列を比較し、到着時刻の違いを測ります。" },
    ],
  },
  "observable-universe": {
    kind: "prediction",
    title: "宇宙の年齢と、見える半径は同じ？",
    setup: "宇宙の年齢は約138億年です。では、現在の観測可能な宇宙の半径も約138億光年でしょうか。",
    prompt: "もっとも適切な予想を選んでください。",
    options: ["必ず138億光年", "膨張のため、それより大きくなりうる", "光年は時間なので比べられない"],
    correct: 1,
    feedback: ["光が進む間にも空間が膨張したため、現在距離は単純な光速×年齢ではありません。", "光を出した場所との現在の距離は、光の飛行時間に対応する距離より大きくなります。", "光年は時間ではなく距離の単位です。"],
    evidenceQuestion: "直接見えない境界を、どう推定する？",
    evidence: [
      { label: "古い光を観測する", detail: "遠い銀河と宇宙マイクロ波背景放射の赤方偏移を測ります。" },
      { label: "膨張史を推定する", detail: "距離、赤方偏移、宇宙の組成を複数の観測から制約します。" },
      { label: "光の経路を計算する", detail: "一般相対論に基づく宇宙モデルで、膨張中を進む光を追跡します。" },
    ],
  },
  "how-astronomy-knows": {
    kind: "prediction",
    title: "誰もメジャーを伸ばしていないのに、なぜ分かる？",
    setup: "アンドロメダ銀河までは約250万光年あります。そこへ探査機を送って往復測定したわけではありません。",
    prompt: "距離を支える、もっとも強い考え方は？",
    options: ["写真で大きく見えるから", "一つの方法を遠方まで延長する", "重なる範囲を持つ複数の方法を校正する"],
    correct: 2,
    feedback: ["見かけの大きさは、実際の大きさにも左右されます。", "一つの方法だけでは、適用できる距離と系統誤差を越えられません。", "年周視差、標準光源などを重なる範囲で比較する距離梯子を使います。"],
    evidenceQuestion: "主張が距離になるまでの鎖を見る",
    evidence: [
      { label: "視差", detail: "近い恒星の幾何学的距離を測り、最初の基準を作ります。" },
      { label: "変光星", detail: "視差が分かる星で、周期と本来の明るさの関係を校正します。" },
      { label: "見かけの明るさ", detail: "同じ種類の変光星を遠い銀河で見つけ、距離を推定します。" },
      { label: "独立検証", detail: "別の距離指標やモデルと照合し、系統誤差を探します。" },
    ],
  },
};
