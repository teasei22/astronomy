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
      { label: "距離を測る", detail: "電波の往復時間、地球の移動で生じる見かけの位置ずれ、本来の明るさが分かる天体などを距離に応じて使います。" },
      { label: "運動を測る", detail: "空の上での位置変化と、光の波長のずれから、同じ重力集団に属するかを調べます。" },
      { label: "三次元地図にする", detail: "多数の銀河について空の位置と光の波長のずれを集めると、宇宙の網が現れます。" },
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
      { label: "距離を独立に測る", detail: "地球が太陽の反対側へ移動したときに生じる、近い恒星の見かけの位置ずれから距離を求めます。" },
      { label: "光速を使う", detail: "真空中の光速と距離から、光が進んだ時間を計算します。" },
      { label: "変化を照合する", detail: "星の明るさを時刻順に記録し、光が届いた時刻の違いを比べます。" },
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
      { label: "古い光を観測する", detail: "遠い銀河と、宇宙誕生約38万年後に由来するマイクロ波を測ります。" },
      { label: "膨張の歴史を調べる", detail: "銀河までの距離と光の波長のずれなど、複数の観測を組み合わせます。" },
      { label: "光の経路を計算する", detail: "観測に合う宇宙モデルを使い、膨張する空間を進んだ光の経路を計算します。" },
    ],
  },
  "how-astronomy-knows": {
    kind: "prediction",
    title: "グラフのへこみから、どこまで言える？",
    setup: "恒星の光を波長ごとに並べると、656.3 nm 付近だけ光の量が少なくなっていました。用語はこの後に一つずつ説明します。",
    prompt: "このグラフから、まず直接言えることは？",
    options: ["恒星に水素があると確定した", "656.3 nm 付近の光が周囲より少ない", "惑星が恒星の前を通った"],
    correct: 1,
    feedback: ["水素は有力な解釈ですが、地上実験や別の特徴との比較が必要です。", "まずグラフから直接読める特徴を記録し、その原因は次の段階で考えます。", "このグラフだけでは惑星の通過を示していません。"],
    evidenceQuestion: "水素という解釈を、どう確かめる？",
    evidence: [
      { label: "装置を確かめる", detail: "基準になる光を測り、グラフの横軸が正しい波長を示すか確認します。" },
      { label: "地上実験と比べる", detail: "水素が吸収する波長を実験室で測り、恒星のへこみの位置と比べます。" },
      { label: "別の特徴を探す", detail: "水素なら現れるはずの、ほかの波長のへこみも探します。" },
      { label: "独立に測り直す", detail: "別の日や別の装置でも同じ結果になるか確認します。" },
    ],
  },
};
