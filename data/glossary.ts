export type GlossaryEntry = {
  id: string;
  termJa: string;
  termEn: string;
  abbr?: string;
  definition: string;
  level: number;
  category: "scale" | "observation" | "object" | "physics" | "cosmology" | "research";
  aliases?: string[];
};

export const glossary: GlossaryEntry[] = [
  { id: "universe", termJa: "宇宙", termEn: "Universe", definition: "空間・時間と、その中にある物質・エネルギーをすべて含む対象。", level: 0, category: "cosmology" },
  { id: "celestial-body", termJa: "天体", termEn: "Celestial body", definition: "宇宙にある、まとまりとして扱える自然の物体や構造。", level: 0, category: "object" },
  { id: "planet", termJa: "惑星", termEn: "Planet", definition: "恒星の周りを回り、自らの核融合では光っていない、ほぼ球形の天体。", level: 0, category: "object" },
  { id: "star", termJa: "恒星", termEn: "Star", definition: "主に核融合でエネルギーを作り、自ら光る高温のガス天体。", level: 0, category: "object" },
  { id: "galaxy", termJa: "銀河", termEn: "Galaxy", definition: "多数の恒星、ガス、ダスト、ダークマターなどが重力で結びついた巨大な集団。", level: 0, category: "object" },
  { id: "milky-way", termJa: "天の川銀河", termEn: "Milky Way Galaxy", definition: "太陽系が属している棒渦巻銀河。", level: 0, category: "object" },
  { id: "solar-system", termJa: "太陽系", termEn: "Solar System", definition: "太陽と、その重力の影響下を公転する惑星・小天体などの集まり。", level: 0, category: "object" },
  { id: "au", termJa: "天文単位", termEn: "Astronomical Unit", abbr: "AU", definition: "地球と太陽の平均的な距離を基準にした長さで、正確に 149,597,870,700 m。", level: 0, category: "scale" },
  { id: "light-year", termJa: "光年", termEn: "Light-year", abbr: "ly", definition: "光が真空中を1年間に進む距離で、時間ではなく長さの単位。", level: 0, category: "scale" },
  { id: "parsec", termJa: "パーセク", termEn: "Parsec", abbr: "pc", definition: "年周視差が1秒角になる距離で、約3.26光年。", level: 0, category: "scale" },
  { id: "observable-universe", termJa: "観測可能な宇宙", termEn: "Observable Universe", definition: "宇宙の始まり以後に届きうる信号によって、原理的に観測できる領域。", level: 0, category: "cosmology" },
  { id: "lookback-time", termJa: "ルックバック時間", termEn: "Lookback time", definition: "今届いた光が天体を出てから経過した時間。", level: 0, category: "observation" },
  { id: "observation", termJa: "観測", termEn: "Observation", definition: "装置と手順を用いて、宇宙から届く信号を測ること。", level: 0, category: "research" },
  { id: "data", termJa: "データ", termEn: "Data", definition: "観測や計算で得た測定値と、それに付随する条件・不確かさの記録。", level: 0, category: "research" },
  { id: "model", termJa: "モデル", termEn: "Model", definition: "現象の重要な要素を選び、説明や予測に使える形にした表現。", level: 0, category: "research" },
  { id: "hypothesis", termJa: "仮説", termEn: "Hypothesis", definition: "観測によって確かめたり反証したりできる、現象への提案的な説明。", level: 0, category: "research" },
  { id: "evidence", termJa: "証拠", termEn: "Evidence", definition: "ある説明を他の説明より支持する、観測や実験の結果。", level: 0, category: "research" },
  { id: "uncertainty", termJa: "不確かさ", termEn: "Uncertainty", definition: "測定値や推定値がどの程度の範囲を取りうるかを表す情報。", level: 0, category: "research" },
  { id: "electromagnetic-wave", termJa: "電磁波", termEn: "Electromagnetic wave", definition: "電場と磁場の変化が空間を伝わる波で、可視光もその一種。", level: 1, category: "physics" },
  { id: "wavelength", termJa: "波長", termEn: "Wavelength", abbr: "λ", definition: "波の山から次の山までの距離。", level: 1, category: "physics" },
  { id: "spectrum", termJa: "スペクトル", termEn: "Spectrum", definition: "光を波長やエネルギーごとに分けて、強さを並べたもの。", level: 1, category: "observation" },
  { id: "photometry", termJa: "測光", termEn: "Photometry", definition: "天体から届く光の量と、その時間変化や色を測る方法。", level: 1, category: "observation" },
  { id: "spectroscopy", termJa: "分光", termEn: "Spectroscopy", definition: "光を波長ごとに分け、温度・組成・運動などを調べる方法。", level: 1, category: "observation" },
  { id: "redshift", termJa: "赤方偏移", termEn: "Redshift", abbr: "z", definition: "受け取った光の波長が、基準より長い側へずれる現象またはその量。", level: 1, category: "observation" },
  { id: "telescope", termJa: "望遠鏡", termEn: "Telescope", definition: "遠い天体から届く信号を集め、像や測定データを作る装置。", level: 1, category: "observation" },
  { id: "parallax", termJa: "年周視差", termEn: "Annual parallax", definition: "地球の公転に伴って、近い恒星の方向が遠方背景に対して周期的にずれて見える角度。", level: 2, category: "observation" },
  { id: "flux", termJa: "フラックス", termEn: "Flux", definition: "観測地点で単位面積・単位時間あたりに受け取るエネルギー。", level: 2, category: "observation" },
  { id: "luminosity", termJa: "光度", termEn: "Luminosity", abbr: "L", definition: "天体が単位時間あたりに全方向へ放つエネルギー。", level: 2, category: "physics" },
  { id: "magnitude", termJa: "等級", termEn: "Magnitude", definition: "天体の明るさを対数的な尺度で表した量で、値が小さいほど明るい。", level: 2, category: "observation" },
  { id: "signal-to-noise", termJa: "信号対雑音比", termEn: "Signal-to-noise ratio", abbr: "S/N", definition: "測りたい信号の強さを、ばらつきの大きさと比べた値。", level: 2, category: "observation" },
  { id: "gravity", termJa: "重力", termEn: "Gravity", definition: "質量・エネルギーによって生じ、物体の運動や時空に影響する相互作用。", level: 3, category: "physics" },
  { id: "orbit", termJa: "軌道", termEn: "Orbit", definition: "重力などの力を受けた天体が描く運動経路。", level: 3, category: "physics" },
  { id: "transit", termJa: "トランジット", termEn: "Transit", definition: "惑星が恒星の手前を横切り、恒星の見かけの明るさを少し減らす現象。", level: 3, category: "observation" },
  { id: "nuclear-fusion", termJa: "核融合", termEn: "Nuclear fusion", definition: "軽い原子核どうしが結びつき、より重い原子核とエネルギーを生む反応。", level: 4, category: "physics" },
  { id: "black-hole", termJa: "ブラックホール", termEn: "Black hole", abbr: "BH", definition: "事象の地平面より内側から、光を含む信号が外へ戻れない時空領域。", level: 4, category: "object" },
  { id: "dark-matter", termJa: "ダークマター", termEn: "Dark matter", definition: "光ではほぼ見えないが、重力効果から存在量が推定される物質成分の呼び名。", level: 5, category: "cosmology" },
  { id: "gravitational-lens", termJa: "重力レンズ", termEn: "Gravitational lens", definition: "手前の質量による時空の曲がりで、背景天体の光路が曲げられる現象。", level: 5, category: "observation" },
  { id: "cmb", termJa: "宇宙マイクロ波背景放射", termEn: "Cosmic Microwave Background", abbr: "CMB", definition: "宇宙が高温のプラズマから透明になった時代に由来する、ほぼ一様なマイクロ波。", level: 6, category: "cosmology" },
  { id: "dark-energy", termJa: "ダークエネルギー", termEn: "Dark energy", definition: "現在の宇宙の加速膨張を記述するために導入される、性質が未解明の成分。", level: 6, category: "cosmology" },
  { id: "systematic-error", termJa: "系統誤差", termEn: "Systematic error", definition: "測定や解析を特定の方向へ偏らせる、方法や装置に由来する誤差。", level: 7, category: "research" },
  { id: "peer-review", termJa: "査読", termEn: "Peer review", definition: "論文を公表する前に、同分野の研究者が方法・論理・記述を検討する過程。", level: 7, category: "research" },
];

export const glossaryById = Object.fromEntries(glossary.map((entry) => [entry.id, entry]));
