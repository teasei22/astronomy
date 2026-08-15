export type QuizDimension = "Recall" | "Concept" | "Reasoning" | "Data";

export const quizDimensionInfo: Record<QuizDimension, { label: string; description: string }> = {
  Recall: { label: "用語", description: "定義・単位・基礎事実を取り出す" },
  Concept: { label: "概念", description: "関係を自分のモデルで捉える" },
  Reasoning: { label: "推論", description: "新しい状況を予測して理由を選ぶ" },
  Data: { label: "データ", description: "数値・単位・傾向・誤差を読む" },
};

type BaseQuestion = {
  type: QuizDimension;
  prompt: string;
  topicIds: string[];
};

export type ChoiceQuestion = BaseQuestion & {
  kind?: "choice";
  options: string[];
  correct: number;
  explanations: string[];
};

export type NumericQuestion = BaseQuestion & {
  kind: "numeric";
  answer: number;
  tolerance: number;
  unit?: string;
  solution: string;
};

export type QuizQuestion = ChoiceQuestion | NumericQuestion;

export const quizzes: Record<string, QuizQuestion[]> = {
  "cosmic-address": [
    {
      type: "Recall",
      prompt: "太陽系が属する銀河はどれですか？",
      options: ["アンドロメダ銀河", "天の川銀河", "局所銀河群", "おとめ座銀河団"],
      correct: 1,
      explanations: ["アンドロメダ銀河は局所銀河群の別の大銀河です。", "正解。太陽系は天の川銀河の円盤内にあります。", "局所銀河群は天の川銀河を含む銀河の集団です。", "おとめ座銀河団はさらに大きな別の銀河集団です。"],
      topicIds: ["milky-way"],
    },
    {
      type: "Concept",
      prompt: "『宇宙の住所』として、内側から外側へ正しい順序はどれですか？",
      options: ["地球 → 太陽系 → 天の川銀河 → 局所銀河群", "地球 → 天の川銀河 → 太陽系 → 局所銀河群", "太陽系 → 地球 → 局所銀河群 → 天の川銀河", "地球 → 局所銀河群 → 天の川銀河 → 太陽系"],
      correct: 0,
      explanations: ["正解。小さい構造がより大きい構造に含まれます。", "太陽系は天の川銀河の中にあります。", "地球は太陽系の中、天の川は局所銀河群の中です。", "局所銀河群が天の川銀河を含みます。"],
      topicIds: ["scale"],
    },
    {
      type: "Reasoning",
      prompt: "太陽が突然、同じ質量のブラックホールに置き換わったと仮定します。地球の軌道は直後にどうなりますか？",
      options: ["すぐ吸い込まれる", "ほぼ同じ軌道を続ける", "重力が消えて直線に飛ぶ", "公転速度が瞬時に2倍になる"],
      correct: 1,
      explanations: ["同じ距離・同じ質量なら、外側での重力はほぼ同じです。", "正解。太陽光は失われますが、重力だけを見れば軌道はほぼ変わりません。", "ブラックホールにも質量があり、重力は消えません。", "中心質量が同じなら、公転速度を瞬時に変える理由はありません。"],
      topicIds: ["gravity", "black-hole"],
    },
    {
      type: "Data",
      prompt: "対数スケールで 10¹¹ m から 10¹⁶ m へ移動しました。距離は何倍ですか？",
      options: ["5倍", "10⁵倍", "10¹⁶倍", "約1.45倍"],
      correct: 1,
      explanations: ["指数の差は足し算ではなく、10のべきの比で読みます。", "正解。10¹⁶ ÷ 10¹¹ = 10⁵ = 100,000 です。", "10¹⁶は移動後の表現で、倍率ではありません。", "指数差5は非常に大きな倍率になります。"],
      topicIds: ["scale", "exponent"],
    },
    {
      type: "Concept",
      prompt: "天の川銀河の『直径』が、資料によって異なる主な理由は何ですか？",
      options: ["銀河が毎年2倍になるから", "恒星円盤・ガス・暗黒物質など、境界の定義が異なるから", "望遠鏡では角度を測れないから", "銀河は地球の大気中にあるから"],
      correct: 1,
      explanations: ["銀河がその速さで膨張しているわけではありません。", "正解。何を銀河の範囲とするかで測る外縁が変わります。", "望遠鏡は天体の角度や明るさを測れます。", "天の川銀河は地球を含む宇宙の構造です。"],
      topicIds: ["milky-way", "model"],
    },
  ],
  "light-is-a-time-machine": [
    {
      type: "Recall",
      prompt: "光年は何の単位ですか？",
      options: ["時間", "距離", "速さ", "明るさ"],
      correct: 1,
      explanations: ["『年』を含みますが、光年は時間ではありません。", "正解。真空中の光が1年間に進む距離です。", "光速そのものを表す単位ではありません。", "天体の明るさを表す単位ではありません。"],
      topicIds: ["light-year"],
    },
    {
      type: "Concept",
      prompt: "100光年先の恒星を今見るとき、見ているのは何ですか？",
      options: ["恒星の100年前の姿", "恒星の100年後の姿", "恒星の現在の姿", "距離だけで時間とは無関係"],
      correct: 0,
      explanations: ["正解。光が100年かけて届いたためです。", "未来から情報は届きません。", "『現在』の光はまだ地球へ届いていません。", "光の有限速度により、距離と見える過去は関係します。"],
      topicIds: ["lookback-time"],
    },
    {
      type: "Reasoning",
      prompt: "600光年先の恒星が爆発する光を今初めて観測した場合、もっとも適切な説明はどれですか？",
      options: ["地球での観測と同時に爆発した", "約600年前に爆発し、その光が今届いた", "約600年後に爆発する予告である", "距離と爆発時刻には関係がない"],
      correct: 1,
      explanations: ["恒星で起きた出来事と地球で見る時刻は同時ではありません。", "正解。光が約600年間進んで地球へ届きました。", "未来の光が先に届くわけではありません。", "光の有限速度により、距離は見ている過去の深さに関係します。"],
      topicIds: ["lookback-time", "light-year"],
    },
    {
      type: "Data",
      prompt: "観測表に A: 4.2光年、B: 100光年、C: 250万光年とあります。もっとも古い姿を見ている対象はどれですか？",
      options: ["A", "B", "C", "距離だけでは比較できない"],
      correct: 2,
      explanations: ["Aの光の移動時間は3対象で最短です。", "BよりCの方がはるかに遠方です。", "正解。Cは約250万年前に出た光を見ています。", "光年で示した距離なら、光の移動時間を直接比較できます。"],
      topicIds: ["lookback-time", "data"],
    },
    {
      type: "Concept",
      prompt: "遠方天体の画像を『その天体の現在の姿』と呼ぶときに必要な注意は？",
      options: ["画像は必ず偽物である", "地球に届いた時点ではなく、光が天体を出た時点の姿である", "遠方天体には現在が存在しない", "光は距離に関係なく瞬時に届く"],
      correct: 1,
      explanations: ["観測画像は届いた光を記録したデータです。", "正解。天文学では観測時刻と放射時刻を区別します。", "遠方天体にも局所的な時刻はあります。", "光速は有限です。"],
      topicIds: ["observation", "lookback-time"],
    },
  ],
  "observable-universe": [
    {
      type: "Recall",
      prompt: "観測可能な宇宙とは何ですか？",
      options: ["宇宙全体だと証明された範囲", "宇宙史の中で信号が私たちへ届きうる範囲", "望遠鏡なしで肉眼観測できる範囲", "天の川銀河の外縁"],
      correct: 1,
      explanations: ["宇宙全体の大きさは確定していません。", "正解。光などの信号が届きうる因果的な範囲です。", "観測装置の性能だけで決まる範囲ではありません。", "天の川銀河よりはるかに大きな範囲です。"],
      topicIds: ["observable-universe"],
    },
    {
      type: "Concept",
      prompt: "観測可能な宇宙の境界について正しい説明はどれですか？",
      options: ["宇宙空間にある固い壁である", "宇宙全体の端と同じだと確定している", "信号が届く時間により決まる観測上の地平線である", "地球を中心に物質が作られた証拠である"],
      correct: 2,
      explanations: ["物質でできた壁ではありません。", "観測可能な範囲の外側を直接確定できません。", "正解。私たちが情報を受け取れる範囲の境界です。", "各観測者は自分を中心とする観測可能領域を持ちます。"],
      topicIds: ["observable-universe", "horizon"],
    },
    {
      type: "Reasoning",
      prompt: "宇宙年齢×光速より、観測可能な宇宙の現在半径が大きくなる主な理由は？",
      options: ["過去の光が光速を超えたから", "光が進む間にも空間の尺度が変化したから", "光年が時間の単位だから", "天の川銀河が宇宙の中心だから"],
      correct: 1,
      explanations: ["局所的に光が真空中の光速を超えたという説明ではありません。", "正解。放射後の宇宙膨張を含めて現在距離を定義します。", "光年は距離の単位です。", "宇宙に特別な銀河中心があるという意味ではありません。"],
      topicIds: ["cosmic-expansion", "lookback-time"],
    },
    {
      type: "Data",
      prompt: "信号Aは10年前、Bは10億年前、Cは138億年近く前に放たれました。初期宇宙をもっとも直接調べる信号は？",
      options: ["A", "B", "C", "どれも同じ"],
      correct: 2,
      explanations: ["Aは宇宙史ではごく最近の信号です。", "Bも古いですが、Cほど初期ではありません。", "正解。放射時刻が最も古く、初期宇宙に近い情報を運びます。", "放射時刻が異なるため、調べる宇宙時代も異なります。"],
      topicIds: ["lookback-time", "data"],
    },
    {
      type: "Reasoning",
      prompt: "観測可能な宇宙の外側について、科学的にもっとも適切な言い方は？",
      options: ["確実に何も存在しない", "直接の情報は届かないが、宇宙全体がそこで終わるとは限らない", "地球と同じ天体だけがある", "望遠鏡を大きくすれば必ず今すぐ見える"],
      correct: 1,
      explanations: ["観測不能と不存在は同じではありません。", "正解。観測限界と宇宙全体の境界を区別します。", "外側の内容を直接確認できません。", "原理的な因果地平線は望遠鏡の口径だけでは越えられません。"],
      topicIds: ["observable-universe", "evidence"],
    },
  ],
  "how-astronomy-knows": [
    {
      type: "Recall",
      prompt: "観測データに付随する『不確かさ』は何を表しますか？",
      options: ["研究者が自信を持っていない気分", "測定値が取りうる範囲についての定量情報", "データが必ず誤りである印", "仮説の人気投票"],
      correct: 1,
      explanations: ["心理状態ではなく測定に関する量です。", "正解。測定・推定値のばらつきうる範囲を表します。", "不確かさを持つことはデータが無価値という意味ではありません。", "仮説の支持人数を表すものではありません。"],
      topicIds: ["uncertainty"],
    },
    {
      type: "Concept",
      prompt: "観測とモデルの関係として、もっとも適切なものは？",
      options: ["観測値は解釈なしで原因を一意に示す", "モデルは観測から予測を作り、別の観測で検査される", "モデルは観測と無関係な物語である", "観測に合わないモデルほど優れている"],
      correct: 1,
      explanations: ["同じ観測を複数の原因が説明できる場合があります。", "正解。モデルは説明だけでなく、検査可能な予測へつなげます。", "科学モデルは観測との対応を持ちます。", "観測との不一致はモデルや前提を見直す理由になります。"],
      topicIds: ["observation", "model"],
    },
    {
      type: "Reasoning",
      prompt: "一つの観測結果だけで新しい仮説を確定できない主な理由は何ですか？",
      options: ["天文学では計算できないから", "別の原因や系統誤差でも似た結果が出る可能性があるから", "望遠鏡は写真しか撮れないから", "仮説は観測で検証できないから"],
      correct: 1,
      explanations: ["天文学でも定量的な計算と予測を行います。", "正解。独立な方法と追加予測で代替説明を絞ります。", "望遠鏡は画像以外にもスペクトルや時系列などを測ります。", "検証可能であることが科学的仮説の重要な条件です。"],
      topicIds: ["evidence", "systematic-error"],
    },
    {
      type: "Data",
      prompt: "同じ星を測ると、装置Aは毎回ほぼ10.0、装置Bは毎回ほぼ10.8を示しました。まず疑うべきものは？",
      options: ["星が装置ごとに別の明るさを持つ", "装置間の校正による系統差", "ランダム誤差だけで必ず説明できる", "単位は一切関係しない"],
      correct: 1,
      explanations: ["同時刻の同じ対象なら、装置による差を先に検査します。", "正解。繰り返しても残る一定方向の差は校正の系統差を示唆します。", "ランダム誤差なら測定ごとに両方向へばらつくのが通常です。", "単位やゼロ点の確認は校正の基本です。"],
      topicIds: ["data", "systematic-error"],
    },
    {
      type: "Reasoning",
      prompt: "新しい仮説を強く支持する証拠の組み合わせはどれですか？",
      options: ["同じ解析を同じデータで何度も実行する", "予測を後から観測結果に合わせ続ける", "独立な装置・方法で、事前の予測が再現される", "都合のよい測定だけを残す"],
      correct: 2,
      explanations: ["計算再現性は大切ですが、独立な系統誤差までは検査できません。", "後付けだけでは新しい予測能力を検査できません。", "正解。独立な方法で事前予測が再現されるほど代替説明が狭まります。", "選択的な除外は結論を偏らせます。"],
      topicIds: ["evidence", "prediction"],
    },
  ],
  "angular-measurement": [
    {
      type: "Recall",
      prompt: "小角近似 D ≃ dθ へ代入するとき、角度 θ に必要な単位はどれですか？",
      options: ["度", "分角", "秒角", "ラジアン"],
      correct: 3,
      explanations: ["度のままでは換算係数が必要です。", "分角のままでは換算係数が必要です。", "秒角のままでは換算係数が必要です。", "正解。ラジアンは弧長と半径の比として定義されます。"],
      topicIds: ["angle", "radian"],
    },
    {
      kind: "numeric",
      type: "Data",
      prompt: "0.25度を秒角へ変換してください。",
      answer: 900,
      tolerance: 0.1,
      unit: "arcsec",
      solution: "1度 = 3600秒角なので、0.25 × 3600 = 900秒角です。",
      topicIds: ["angle", "unit-conversion"],
    },
    {
      kind: "numeric",
      type: "Data",
      prompt: "30度をラジアンへ変換してください。小数で入力します。",
      answer: 0.5236,
      tolerance: 0.001,
      unit: "rad",
      solution: "30 × π / 180 = π / 6 ≃ 0.5236 radです。",
      topicIds: ["angle", "radian"],
    },
    {
      kind: "numeric",
      type: "Reasoning",
      prompt: "距離20 pc、角直径0.50秒角の構造の直径をAUで求めてください。",
      answer: 10,
      tolerance: 0.05,
      unit: "AU",
      solution: "D(AU) ≃ d(pc) × θ(arcsec) = 20 × 0.50 = 10 AUです。",
      topicIds: ["small-angle", "parsec"],
    },
    {
      type: "Concept",
      prompt: "同じ直径の天体を2倍遠くへ置いたとき、小角近似で角直径はどうなりますか？",
      options: ["2倍", "1/2", "1/4", "変わらない"],
      correct: 1,
      explanations: ["角度は距離に反比例します。", "正解。θ ≃ D/dなので距離が2倍なら角度は1/2です。", "逆二乗ではなく逆比例です。", "距離が変われば見かけの角度も変わります。"],
      topicIds: ["small-angle"],
    },
    {
      type: "Reasoning",
      prompt: "検出器画像で測った天体像の幅を、そのまま天体固有の角直径とみなせない主な理由は何ですか？",
      options: ["宇宙膨張で画像が毎秒変わるから", "点像分布関数や大気・光学系が像を広げるから", "ラジアンが無次元だから", "すべての恒星は同じ直径だから"],
      correct: 1,
      explanations: ["通常の角直径測定で支配的な理由ではありません。", "正解。PSFの寄与を校正して分離する必要があります。", "単位の性質は画像の広がりの原因ではありません。", "恒星の直径は同じではありません。"],
      topicIds: ["resolution", "psf"],
    },
  ],
  "parallax-distance": [
    {
      type: "Concept",
      prompt: "半年間隔の観測で見える全方向変化がおよそ2pのとき、年周視差pは何を表しますか？",
      options: ["全変位そのもの", "全変位の半分", "地球軌道の直径", "恒星の固有運動"],
      correct: 1,
      explanations: ["通常の年周視差は半角です。", "正解。1 AUを基線とする半角として定義します。", "軌道直径は長さであり角度pではありません。", "固有運動は年周視差と別にフィットします。"],
      topicIds: ["parallax"],
    },
    {
      kind: "numeric",
      type: "Data",
      prompt: "視差10.0 masの恒星までの距離をpcで求めてください。",
      answer: 100,
      tolerance: 0.1,
      unit: "pc",
      solution: "d(pc) = 1000 / p(mas) = 1000 / 10.0 = 100 pcです。",
      topicIds: ["parallax", "distance"],
    },
    {
      kind: "numeric",
      type: "Data",
      prompt: "p = 40.0 ± 2.0 masの距離をpcで求めてください。",
      answer: 25,
      tolerance: 0.05,
      unit: "pc",
      solution: "d = 1000 / 40.0 = 25.0 pcです。",
      topicIds: ["parallax", "distance"],
    },
    {
      kind: "numeric",
      type: "Reasoning",
      prompt: "p = 40.0 ± 2.0 masについて、線形近似による距離の不確かさをpcで求めてください。",
      answer: 1.25,
      tolerance: 0.02,
      unit: "pc",
      solution: "σd ≃ 1000 σp / p² = 1000 × 2.0 / 40.0² = 1.25 pcです。",
      topicIds: ["parallax", "error-propagation"],
    },
    {
      type: "Reasoning",
      prompt: "負の視差測定値をカタログから一律に削除すると、どんな問題が起こりえますか？",
      options: ["単位がpcからmasへ変わる", "正方向へ散らばった測定だけが残り標本が偏る", "真の距離がすべて0になる", "固有運動が必ず2倍になる"],
      correct: 1,
      explanations: ["削除で単位は変わりません。", "正解。ノイズによる負値も尤度情報を持ち、切断は選択効果を作ります。", "物理的距離が0になるわけではありません。", "固有運動との関係はそのように決まりません。"],
      topicIds: ["parallax", "selection-effect"],
    },
    {
      type: "Concept",
      prompt: "低S/Nの視差で単純な逆数距離が危険な主な理由は何ですか？",
      options: ["逆数は常に単位を失うから", "対称な視差誤差が距離では強く非対称になるから", "光速が観測ごとに変わるから", "パーセクが時間単位だから"],
      correct: 1,
      explanations: ["d = 1000/pは単位を保ちます。", "正解。pが0に近い領域で1/pは非線形かつ発散的です。", "光速変化が原因ではありません。", "パーセクは距離単位です。"],
      topicIds: ["parallax", "inference"],
    },
  ],
  "measurement-uncertainty": [
    {
      type: "Concept",
      prompt: "標準偏差と平均の標準誤差の違いとして正しいものはどれですか？",
      options: ["両者は常に同じ", "標準偏差は個々の値の散らばり、標準誤差は平均の推定精度", "標準誤差だけが系統誤差を含む", "標準偏差は標本数を増やすほど必ず0になる"],
      correct: 1,
      explanations: ["SE = s/√Nであり一般には異なります。", "正解。何の不確かさかが異なります。", "標準誤差が自動的に系統誤差を含むわけではありません。", "母集団の散らばりを反映する標準偏差は0へ向かいません。"],
      topicIds: ["statistics", "standard-error"],
    },
    {
      kind: "numeric",
      type: "Data",
      prompt: "p = 20.0 ± 1.0 masの視差信号対雑音比を求めてください。",
      answer: 20,
      tolerance: 0.01,
      unit: "S/N",
      solution: "S/N = p / σp = 20.0 / 1.0 = 20です。",
      topicIds: ["signal-to-noise", "parallax"],
    },
    {
      kind: "numeric",
      type: "Data",
      prompt: "p = 20.0 ± 1.0 masから得る距離の線形近似不確かさをpcで求めてください。",
      answer: 2.5,
      tolerance: 0.02,
      unit: "pc",
      solution: "σd ≃ 1000 σp / p² = 1000 / 400 = 2.5 pcです。",
      topicIds: ["error-propagation", "parallax"],
    },
    {
      kind: "numeric",
      type: "Reasoning",
      prompt: "10 ± 1と14 ± 2を独立測定として逆分散重み付き平均を求めてください。",
      answer: 10.8,
      tolerance: 0.02,
      solution: "重みは1と0.25です。(10 + 0.25 × 14) / 1.25 = 10.8となります。",
      topicIds: ["weighted-mean", "statistics"],
    },
    {
      type: "Reasoning",
      prompt: "100回の測定すべてに同じ+0.3の校正偏差があるとき、単純平均後の偏差はどうなりますか？",
      options: ["およそ+0.3のまま", "+0.03", "+0.003", "必ず0"],
      correct: 0,
      explanations: ["正解。共通の系統偏差は独立なランダム成分のようには減りません。", "√Nで減るのは独立なランダム成分です。", "標本数で直接割ることはできません。", "平均だけで校正偏差は消えません。"],
      topicIds: ["systematic-error"],
    },
    {
      type: "Concept",
      prompt: "一次誤差伝播をそのまま使うのが特に危険なのはどれですか？",
      options: ["相対誤差が小さく関数が局所的に直線的", "独立な測定を足し合わせる", "視差が0に近く相対誤差が大きい状態で1/pを計算する", "単位換算で一定値を掛ける"],
      correct: 2,
      explanations: ["一次近似が働きやすい条件です。", "独立性を確認すれば通常の伝播が使えます。", "正解。特異点近くの非線形変換では分布が強く非対称になります。", "一定倍率の変換は一次式です。"],
      topicIds: ["error-propagation", "inference"],
    },
  ],
};
