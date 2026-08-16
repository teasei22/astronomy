export type CurriculumDomain = {
  title: string;
  mappedLevels: number[];
  outcome: string;
  minimumEvidence: string;
};

export const curriculumDomains: CurriculumDomain[] = [
  { title: "観測天文学", mappedLevels: [2, 7], outcome: "座標・測光・分光・画像・検出器・校正を扱う", minimumEvidence: "校正済みデータLab + 誤差報告" },
  { title: "天体力学", mappedLevels: [3, 7], outcome: "重力と運動方程式から軌道と質量を推定する", minimumEvidence: "導出問題 + 軌道データ解析" },
  { title: "惑星科学", mappedLevels: [3, 7], outcome: "太陽系・大気・形成・系外惑星を比較する", minimumEvidence: "比較課題 + 検出バイアス評価" },
  { title: "恒星物理", mappedLevels: [4, 7], outcome: "恒星構造・スペクトル・進化・終末を説明する", minimumEvidence: "HR図 + スペクトル + 進化計算" },
  { title: "星間物質", mappedLevels: [4, 5, 7], outcome: "ガス・ダスト・星形成・feedbackを結びつける", minimumEvidence: "多波長データ解釈" },
  { title: "コンパクト天体・高エネルギー", mappedLevels: [4, 5, 7], outcome: "降着・爆発・粒子加速を観測信号と物理過程で説明する", minimumEvidence: "X線・ガンマ線データ + 時間変動" },
  { title: "銀河天文学", mappedLevels: [5, 7], outcome: "天の川・銀河進化・暗黒物質の証拠を評価する", minimumEvidence: "カタログ解析 + 複数証拠比較" },
  { title: "マルチメッセンジャー", mappedLevels: [5, 7], outcome: "電磁波・重力波・ニュートリノの時刻・方向・不確かさを統合する", minimumEvidence: "同一天体現象の複数信号解析" },
  { title: "宇宙論", mappedLevels: [6, 7], outcome: "膨張・CMB・元素合成・構造形成をモデル化する", minimumEvidence: "宇宙論データ + モデル比較" },
  { title: "数学・基礎物理", mappedLevels: [2, 3, 4, 5, 6, 7], outcome: "微積分・力学・電磁気・熱・統計を天文問題へ適用する", minimumEvidence: "導出 + 単位つき計算 + 累積試験" },
  { title: "計算天文学", mappedLevels: [7], outcome: "Python・Astropy・FITS・数値計算を再現可能に使う", minimumEvidence: "実行可能Notebook + 環境記録" },
  { title: "天文データ解析", mappedLevels: [2, 7], outcome: "画像・スペクトル・時系列・カタログから推定する", minimumEvidence: "4データ形式の独立解析" },
  { title: "研究リテラシー", mappedLevels: [7], outcome: "論文の主張・統計・引用を評価し、小規模研究を完遂する", minimumEvidence: "論文批評 + 再現 + Capstone" },
];

export const curriculumReferences = [
  { title: "東京大学 理学部天文学科 カリキュラム", href: "https://www.astron.s.u-tokyo.ac.jp/about/undergraduate/" },
  { title: "京都大学 理学部コースツリー", href: "https://sci.kyoto-u.ac.jp/sites/default/files/2025-03/02_2025%E5%B9%B4%E5%BA%A6%20%E7%90%86%E5%AD%A6%E9%83%A8%E3%82%B3%E3%83%BC%E3%82%B9%E3%83%84%E3%83%AA%E3%83%BC.pdf" },
  { title: "Harvard Astrophysics Concentration Requirements", href: "https://astronomy.fas.harvard.edu/concentration-requirements" },
  { title: "University of Arizona Astronomy Four-Year Plan", href: "https://astro.arizona.edu/academics/undergraduate/4-year-plan-astronomy-degree" },
  { title: "MIT Astronomy Minor", href: "https://catalog.mit.edu/interdisciplinary/undergraduate-programs/minors/astronomy/" },
];
