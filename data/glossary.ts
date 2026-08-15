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
  { id: "galaxy-group", termJa: "銀河群", termEn: "Galaxy group", definition: "数個から数十個ほどの銀河が、互いの重力でまとまった集団。天の川銀河は局所銀河群に属する。", level: 0, category: "object" },
  { id: "galaxy-cluster", termJa: "銀河団", termEn: "Galaxy cluster", definition: "数百から数千個規模の銀河、高温ガス、ダークマターなどを含む大きな重力集団。", level: 0, category: "object" },
  { id: "cosmic-web", termJa: "宇宙の網", termEn: "Cosmic web", definition: "銀河が糸や壁のように集まり、その間に銀河の少ない空洞が広がる、宇宙の大規模な網状構造。", level: 0, category: "cosmology" },
  { id: "au", termJa: "天文単位", termEn: "Astronomical Unit", abbr: "AU", definition: "地球と太陽の平均的な距離を基準にした長さで、正確に 149,597,870,700 m。", level: 0, category: "scale" },
  { id: "light-year", termJa: "光年", termEn: "Light-year", abbr: "ly", definition: "光が真空中を1年間に進む距離で、時間ではなく長さの単位。", level: 0, category: "scale" },
  { id: "parsec", termJa: "パーセク", termEn: "Parsec", abbr: "pc", definition: "年周視差が1秒角になる距離で、約3.26光年。", level: 0, category: "scale" },
  { id: "observable-universe", termJa: "観測可能な宇宙", termEn: "Observable Universe", definition: "宇宙の始まり以後に届きうる信号によって、原理的に観測できる領域。", level: 0, category: "cosmology" },
  { id: "light-speed", termJa: "光速", termEn: "Speed of light", abbr: "c", definition: "光が真空中を進む速さ。1秒あたり約30万kmで、情報が伝わる速さの上限でもある。", level: 0, category: "physics" },
  { id: "lookback-time", termJa: "ルックバック時間", termEn: "Lookback time", definition: "今届いた光が天体を出てから経過した時間。", level: 0, category: "observation" },
  { id: "cosmic-expansion", termJa: "宇宙膨張", termEn: "Cosmic expansion", definition: "大きなスケールで、銀河どうしの隔たりを表す空間そのものが時間とともに広がること。物体が空間内を飛び散るだけの運動とは異なる。", level: 0, category: "cosmology" },
  { id: "comoving-distance", termJa: "共動距離", termEn: "Comoving distance", definition: "宇宙膨張を座標に織り込み、現在の宇宙での隔たりに対応させて表す宇宙論的な距離。", level: 0, category: "cosmology" },
  { id: "luminosity-distance", termJa: "光度距離", termEn: "Luminosity distance", definition: "天体が本来放つ光の量と、観測者が受け取る光の量の関係から定義する距離。", level: 0, category: "cosmology" },
  { id: "observation", termJa: "観測", termEn: "Observation", definition: "装置と手順を用いて、宇宙から届く信号を測ること。", level: 0, category: "research" },
  { id: "data", termJa: "データ", termEn: "Data", definition: "観測や計算で得た測定値と、それに付随する条件・不確かさの記録。", level: 0, category: "research" },
  { id: "model", termJa: "モデル", termEn: "Model", definition: "現象の重要な要素を選び、説明や予測に使える形にした表現。", level: 0, category: "research" },
  { id: "hypothesis", termJa: "仮説", termEn: "Hypothesis", definition: "観測によって確かめたり反証したりできる、現象への提案的な説明。", level: 0, category: "research" },
  { id: "evidence", termJa: "証拠", termEn: "Evidence", definition: "ある説明を他の説明より支持する、観測や実験の結果。", level: 0, category: "research" },
  { id: "uncertainty", termJa: "不確かさ", termEn: "Uncertainty", definition: "測定値や推定値がどの程度の範囲を取りうるかを表す情報。", level: 0, category: "research" },
  { id: "detector", termJa: "検出器", termEn: "Detector", definition: "届いた光などの信号を電気信号や数値へ変え、記録できるようにする装置。", level: 0, category: "observation" },
  { id: "calibration", termJa: "校正", termEn: "Calibration", definition: "既知の基準と比べて装置のずれや感度を調べ、装置の記録を物理的な測定値へ変換する作業。", level: 0, category: "observation" },
  { id: "electromagnetic-wave", termJa: "電磁波", termEn: "Electromagnetic wave", definition: "電場と磁場の変化が空間を伝わる波で、目に見える光、赤外線、電波などをまとめた呼び名。", level: 0, category: "physics" },
  { id: "wavelength", termJa: "波長", termEn: "Wavelength", abbr: "λ", definition: "波の形が一回繰り返す間隔。光では波長の違いが色や電磁波の種類の違いに対応する。", level: 0, category: "physics" },
  { id: "nanometer", termJa: "ナノメートル", termEn: "Nanometer", abbr: "nm", definition: "10億分の1メートルを表す長さの単位。可視光の波長はおよそ380〜700 nm。", level: 0, category: "scale" },
  { id: "spectrum", termJa: "スペクトル", termEn: "Spectrum", definition: "光を波長ごとに分け、各波長でどれだけの光を受け取ったかを並べたもの。画像やグラフで表す。", level: 0, category: "observation" },
  { id: "absorption-line", termJa: "吸収線", termEn: "Absorption line", definition: "スペクトル上で、周囲より光が少なくなっている細い波長域。物質が特定の波長の光を吸収すると生じる。", level: 0, category: "observation" },
  { id: "atom", termJa: "原子", termEn: "Atom", definition: "元素の性質を保つ基本的な粒子。中心の原子核と、その周りにある電子からなる。", level: 0, category: "physics" },
  { id: "element", termJa: "元素", termEn: "Chemical element", definition: "原子核にある陽子の数で区別される物質の種類。水素、ヘリウム、鉄などがある。", level: 0, category: "physics" },
  { id: "hydrogen", termJa: "水素", termEn: "Hydrogen", abbr: "H", definition: "陽子を1個持つ、最も単純で宇宙に最も多い元素。恒星のスペクトルに特徴的な吸収線や輝線を作る。", level: 0, category: "physics" },
  { id: "photometry", termJa: "測光", termEn: "Photometry", definition: "天体から届く光の量と、その時間変化や色を測る方法。", level: 1, category: "observation" },
  { id: "spectroscopy", termJa: "分光", termEn: "Spectroscopy", definition: "光を波長ごとに分け、温度・組成・運動などを調べる方法。", level: 1, category: "observation" },
  { id: "redshift", termJa: "赤方偏移", termEn: "Redshift", abbr: "z", definition: "受け取った光の波長が、もとの基準より長い側へずれる現象またはその量。遠方銀河では宇宙膨張を調べる手がかりになる。", level: 0, category: "observation" },
  { id: "telescope", termJa: "望遠鏡", termEn: "Telescope", definition: "遠い天体から届く信号を集め、像や測定データを作る装置。", level: 1, category: "observation" },
  { id: "parallax", termJa: "年周視差", termEn: "Annual parallax", definition: "地球の公転に伴って、近い恒星の方向が遠い背景に対して周期的にずれて見える現象と、その角度。", level: 0, category: "observation" },
  { id: "flux", termJa: "フラックス", termEn: "Flux", definition: "観測地点で単位面積・単位時間あたりに受け取るエネルギー。", level: 2, category: "observation" },
  { id: "luminosity", termJa: "光度", termEn: "Luminosity", abbr: "L", definition: "天体が単位時間あたりに全方向へ放つエネルギー。", level: 2, category: "physics" },
  { id: "magnitude", termJa: "等級", termEn: "Magnitude", definition: "天体の明るさを対数的な尺度で表した量で、値が小さいほど明るい。", level: 2, category: "observation" },
  { id: "signal-to-noise", termJa: "信号対雑音比", termEn: "Signal-to-noise ratio", abbr: "S/N", definition: "測りたい信号の強さを、ばらつきの大きさと比べた値。", level: 2, category: "observation" },
  { id: "gravity", termJa: "重力", termEn: "Gravity", definition: "質量を持つ物体どうしの運動に影響し、惑星の軌道や銀河のまとまりを作る相互作用。", level: 0, category: "physics" },
  { id: "orbit", termJa: "軌道", termEn: "Orbit", definition: "重力などの力を受けた天体が描く運動経路。", level: 3, category: "physics" },
  { id: "transit", termJa: "トランジット", termEn: "Transit", definition: "惑星が恒星の手前を横切り、恒星の見かけの明るさを少し減らす現象。", level: 3, category: "observation" },
  { id: "nuclear-fusion", termJa: "核融合", termEn: "Nuclear fusion", definition: "軽い原子核どうしが結びつき、より重い原子核とエネルギーを生む反応。太陽などの恒星が光る主なエネルギー源。", level: 0, category: "physics" },
  { id: "black-hole", termJa: "ブラックホール", termEn: "Black hole", abbr: "BH", definition: "ある境界より内側からは、光を含む信号が外へ戻れないほど重力の強い時空領域。", level: 0, category: "object" },
  { id: "dark-matter", termJa: "ダークマター", termEn: "Dark matter", definition: "光では直接見えないが、恒星や銀河の運動などに及ぼす重力から存在量が推定される物質成分。正体は未解明。", level: 0, category: "cosmology" },
  { id: "gravitational-lens", termJa: "重力レンズ", termEn: "Gravitational lens", definition: "手前の質量による時空の曲がりで、背景天体の光路が曲げられる現象。", level: 5, category: "observation" },
  { id: "cmb", termJa: "宇宙マイクロ波背景放射", termEn: "Cosmic Microwave Background", abbr: "CMB", definition: "宇宙誕生から約38万年後、光が物質に邪魔されず進めるようになった時代に由来する、ほぼ一様なマイクロ波。", level: 0, category: "cosmology" },
  { id: "dark-energy", termJa: "ダークエネルギー", termEn: "Dark energy", definition: "現在の宇宙の加速膨張を記述するために導入される、性質が未解明の成分。", level: 6, category: "cosmology" },
  { id: "systematic-error", termJa: "系統誤差", termEn: "Systematic error", definition: "装置や測定方法のくせによって、測定結果を繰り返し同じ方向へ偏らせる誤差。", level: 0, category: "research" },
  { id: "peer-review", termJa: "査読", termEn: "Peer review", definition: "論文を公表する前に、同分野の研究者が方法・論理・記述を検討する過程。", level: 7, category: "research" },
];

export const glossaryById = Object.fromEntries(glossary.map((entry) => [entry.id, entry]));
