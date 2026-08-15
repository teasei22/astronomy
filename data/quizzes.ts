type BaseQuestion = {
  type: "Recall" | "Concept" | "Reasoning" | "Data";
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
  ],
  "light-is-a-time-machine": [
    {
      type: "Concept",
      prompt: "100光年先の恒星を今見るとき、見ているのは何ですか？",
      options: ["恒星の100年前の姿", "恒星の100年後の姿", "恒星の現在の姿", "距離だけで時間とは無関係"],
      correct: 0,
      explanations: ["正解。光が100年かけて届いたためです。", "未来から情報は届きません。", "『現在』の光はまだ地球へ届いていません。", "光の有限速度により、距離と見える過去は関係します。"],
      topicIds: ["lookback-time"],
    },
  ],
  "how-astronomy-knows": [
    {
      type: "Reasoning",
      prompt: "一つの観測結果だけで新しい仮説を確定できない主な理由は何ですか？",
      options: ["天文学では計算できないから", "別の原因や系統誤差でも似た結果が出る可能性があるから", "望遠鏡は写真しか撮れないから", "仮説は観測で検証できないから"],
      correct: 1,
      explanations: ["天文学でも定量的な計算と予測を行います。", "正解。独立な方法と追加予測で代替説明を絞ります。", "望遠鏡は画像以外にもスペクトルや時系列などを測ります。", "検証可能であることが科学的仮説の重要な条件です。"],
      topicIds: ["evidence", "systematic-error"],
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
