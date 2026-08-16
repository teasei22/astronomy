export type SkillBridge = {
  duration: number;
  title: string;
  reason: string;
  skills: string[];
  refreshers: { label: string; explanation: string; check: string }[];
  related?: { href: string; label: string };
};

export const skillBridges: Record<string, SkillBridge> = {
  "angular-measurement": {
    duration: 5,
    title: "比・単位換算・円周",
    reason: "角度をラジアンへ直し、小角近似を単位つきで使うために必要です。",
    skills: ["比を式で表す", "10のべきで単位換算する", "円周が2πrであることを使う"],
    refreshers: [
      { label: "比", explanation: "a:b は a/b と同じ関係です。ラジアンは弧長sと半径rの比 θ=s/r です。", check: "弧長が半径の半分なら θ=0.5 rad。" },
      { label: "単位換算", explanation: "1度=60分角、1分角=60秒角なので、1度=3600秒角です。", check: "0.5度=1800秒角。" },
      { label: "円周", explanation: "一周の弧長2πrをrで割るため、一周は2π radです。", check: "半周=π rad=180度。" },
    ],
    related: { href: "/explore/scale", label: "10の指数をスケール実験で確認" },
  },
  "horizon-coordinates-and-daily-motion": {
    duration: 5,
    title: "向き・正負の角度・速さ",
    reason: "地平線を基準にした方向と、一時間あたりの見かけの移動角を読むために必要です。",
    skills: ["方角を角度へ対応させる", "地平線の上下を正負で表す", "角度÷時間から角速度を求める"],
    refreshers: [
      { label: "方角", explanation: "北を0度として東回りなら、東90度、南180度、西270度です。", check: "225度は南西。" },
      { label: "正負", explanation: "基準より上を正、下を負と決めると、地平線の上下を一つの数直線で表せます。", check: "高度-3度は地平線より3度下。" },
      { label: "角速度", explanation: "一周360度を24時間で割ると、約15度/時です。", check: "2時間なら約30度。" },
    ],
    related: { href: "/learn/angular-measurement", label: "角度単位を先に復習" },
  },
  "right-ascension-and-declination": {
    duration: 6,
    title: "60進法・符号・一周",
    reason: "赤経の時分秒を角度へ変え、赤緯の南北を符号で読むために必要です。",
    skills: ["時と分を小数へ直す", "正負で南北を表す", "24時間と360度を比例させる"],
    refreshers: [
      { label: "60進法", explanation: "30分は30/60=0.5時間です。", check: "5時間30分=5.5時間。" },
      { label: "比例", explanation: "24時間=360度なので、1時間=15度です。", check: "6時間=90度。" },
      { label: "符号", explanation: "赤緯は天の赤道より北を正、南を負で表します。", check: "-20度は南側。" },
    ],
    related: { href: "/learn/horizon-coordinates-and-daily-motion", label: "観測者基準の座標と比較" },
  },
  "astronomical-time-and-epoch": {
    duration: 6,
    title: "時刻差・一周の折り返し・割合",
    reason: "24時間をまたぐ時角を求め、恒星日と太陽日の差を概算するために必要です。",
    skills: ["時分を引き算する", "一周24時間を足し引きする", "角度÷角速度から時間を求める"],
    refreshers: [
      { label: "時刻差", explanation: "10時40分-8時10分は2時間30分です。", check: "2時間30分=2.5時間。" },
      { label: "一周", explanation: "角度では-3時間と21時間は同じ方向です。通常は-12〜+12時間へ折り返します。", check: "25時間は1時間と同じ向き。" },
      { label: "時間を逆算", explanation: "時間=角度/角速度です。", check: "1度÷15度/時=4分。" },
    ],
    related: { href: "/learn/right-ascension-and-declination", label: "赤経の時間単位を復習" },
  },
  "parallax-distance": {
    duration: 5,
    title: "逆数・比例・信号対雑音比",
    reason: "視差が小さいほど距離が大きくなる関係と、逆数推定の限界を判断するために必要です。",
    skills: ["d=1/pの逆比例を読む", "割合と百分率を行き来する", "測定値÷不確かさを計算する"],
    refreshers: [
      { label: "逆数", explanation: "pが2倍なら1/pは半分です。視差と距離は同じ向きには変化しません。", check: "p=0.05 arcsecなら d=20 pc。" },
      { label: "相対不確かさ", explanation: "σp/p は測定値に対する不確かさの割合です。", check: "40±2 masの相対不確かさは5%。" },
      { label: "S/N", explanation: "単純化すると信号対雑音比は測定値を標準不確かさで割ります。", check: "40±2 masなら S/N=20。" },
    ],
    related: { href: "/learn/angular-measurement", label: "角度と秒角を先に復習" },
  },
  "measurement-uncertainty": {
    duration: 8,
    title: "平方根・微分・重みつき平均",
    reason: "ばらつきを要約し、測定誤差を計算結果へ伝えるために必要です。",
    skills: ["平方と平方根を使う", "簡単な関数の傾きを読む", "重みつき平均を計算する"],
    refreshers: [
      { label: "平方根", explanation: "正負のずれを打ち消さず大きさとしてまとめるため、二乗して平均し最後に平方根を取ります。", check: "4の平方根は2。" },
      { label: "微分", explanation: "df/dx はxを少し変えたときfがどれだけ変わるかを表します。誤差伝播ではこの局所的な傾きを使います。", check: "f=2xなら df/dx=2。" },
      { label: "重み", explanation: "精密な測定ほど大きく効かせます。逆分散重みは w=1/σ² です。", check: "σが半分なら重みは4倍。" },
    ],
    related: { href: "/learn/parallax-distance", label: "視差の不確かさで使い方を見る" },
  },
  "standard-candles-and-rulers": {
    duration: 7,
    title: "二乗・平方根・逆二乗",
    reason: "光が球面へ広がる関係を使い、明るさの比から距離比を戻すために必要です。",
    skills: ["数を二乗する", "平方根で二乗を戻す", "逆二乗の比例を読む"],
    refreshers: [
      { label: "二乗", explanation: "距離が3倍なら、光が広がる球面積は3²=9倍です。", check: "距離2倍なら面積4倍。" },
      { label: "平方根", explanation: "届く光が1/9なら、距離比は√9=3です。", check: "1/16の明るさなら距離4倍。" },
      { label: "比", explanation: "同じ固有光度の天体同士なら、未知の光度を消してフラックス比だけで比べられます。", check: "校正天体との比較を使う。" },
    ],
    related: { href: "/learn/measurement-uncertainty", label: "割合と不確かさを復習" },
  },
  "distance-uncertainty-and-bias": {
    duration: 8,
    title: "相対不確かさ・非線形な式・標本",
    reason: "距離式へ誤差を伝え、数式変換と選択が結果を偏らせる条件を判断するために必要です。",
    skills: ["不確かさ÷測定値を計算する", "逆数と平方根の傾向を読む", "選ばれたデータと母集団を区別する"],
    refreshers: [
      { label: "相対不確かさ", explanation: "20.0±1.0の割合は1.0/20.0=0.05、5%です。", check: "1.0±0.4は40%。" },
      { label: "非線形", explanation: "1/xはxが0へ近づくほど急に大きくなります。同じ±のずれが結果では対称になりません。", check: "1/2と1/1の差は、1/1と1/0の差と同じでない。" },
      { label: "標本選択", explanation: "見つかった対象だけの分布は、見つからなかった対象を含む全体と同じとは限りません。", check: "検出限界より暗い対象は表から抜ける。" },
    ],
    related: { href: "/learn/standard-candles-and-rulers", label: "三種類の距離式を復習" },
  },
};
