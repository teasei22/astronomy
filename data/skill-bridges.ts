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
};
