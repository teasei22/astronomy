export type QuizQuestion = {
  type: "Recall" | "Concept" | "Reasoning" | "Data";
  prompt: string;
  options: string[];
  correct: number;
  explanations: string[];
  topicIds: string[];
};

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
};
