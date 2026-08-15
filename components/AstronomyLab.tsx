"use client";

import { CheckCircle2, Code2, FlaskConical, LockKeyhole, Play, Table2 } from "lucide-react";
import { useMemo, useState } from "react";

const lightYearInAu = 63241.077;
const labs = [
  "AU と光年を変換する", "惑星データを表にする", "惑星軌道をプロットする", "恒星データを散布図にする", "HR 図を作る", "Light Curve を描く", "Transit を検出する", "系外惑星候補を比較する", "天体カタログを検索する", "Gaia データを可視化する", "スペクトルを描く", "redshift を推定する", "銀河データを分析する", "簡単な N 体シミュレーション",
];

export function AstronomyLab() {
  const [au, setAu] = useState(63241.077);
  const lightYears = useMemo(() => au / lightYearInAu, [au]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-xs font-semibold text-[var(--coral)]"><FlaskConical size={15} /> PYTHON ASTRONOMY LAB</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">コードを、宇宙の意味へつなぐ</h1>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">最初の Lab は単位変換です。数値を出すだけでなく、何を計算し、その結果が宇宙で何を意味するかまで確認します。</p>
      </div>

      <div className="mt-9 grid gap-6 xl:grid-cols-[270px_1fr]">
        <aside className="h-fit border border-[var(--line)] bg-[var(--panel)]">
          <div className="border-b border-[var(--line)] p-4">
            <p className="text-xs font-semibold text-white">14 Labs</p>
            <p className="mt-1 text-[10px] text-[var(--muted)]">基礎 Python → 実データ → simulation</p>
          </div>
          <div className="max-h-[470px] overflow-y-auto">
            {labs.map((lab, index) => (
              <div key={lab} className={`flex items-center gap-3 border-b border-[#252d31] px-4 py-3 text-xs ${index === 0 ? "bg-[#2a1e18] text-white" : "text-[#748086]"}`}>
                {index === 0 ? <CheckCircle2 size={15} className="text-[var(--coral)]" /> : <LockKeyhole size={14} />}
                <span className="w-6 font-mono text-[10px]">{String(index + 1).padStart(2, "0")}</span>
                <span>{lab}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="min-w-0 border border-[var(--line)] bg-[var(--panel)]">
          <div className="border-b border-[var(--line)] p-5 sm:p-7">
            <p className="text-[10px] font-semibold text-[var(--coral)]">LAB 01 · CONCEPT ONLY → USE THE FORMULA</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">AU と光年を変換する</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">太陽系では AU、恒星間では光年をよく使います。同じ距離を違う単位で表し、スケールの切り替わりをつかみます。</p>
          </div>

          <div className="grid lg:grid-cols-2">
            <div className="border-b border-[var(--line)] p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <p className="flex items-center gap-2 text-xs font-semibold text-white"><Code2 size={16} /> Python code</p>
              <pre className="mt-4 overflow-x-auto border border-[#2a3338] bg-[#080a0c] p-4 text-[13px] leading-7 text-[#c7d3d0]"><code>{`# 1光年に含まれる天文単位
AU_PER_LIGHT_YEAR = 63_241.077

# 変換したい距離
distance_au = ${au.toFixed(3)}

# AUを光年へ変換
distance_ly = distance_au / AU_PER_LIGHT_YEAR

print(distance_ly)`}</code></pre>
              <div className="mt-5 space-y-3 text-sm leading-6 text-[var(--muted)]">
                <p><span className="font-mono text-[var(--cyan)]">AU_PER_LIGHT_YEAR</span> は換算係数です。1 光年が何 AU かを保存します。</p>
                <p><span className="font-mono text-[var(--cyan)]">distance_au</span> は、いま変換したい距離です。</p>
                <p>AU を「1 光年あたりの AU 数」で割ると、光年になります。単位も AU ÷ (AU/ly) = ly と確かめられます。</p>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <p className="flex items-center gap-2 text-xs font-semibold text-white"><Play size={16} /> 入力と結果</p>
              <label className="mt-5 block text-xs text-[var(--muted)]" htmlFor="au-input">距離（AU）</label>
              <div className="mt-2 flex border border-[#3d484e] bg-[#0c1012] focus-within:border-[var(--cyan)]">
                <input id="au-input" type="number" value={au} min="0" step="100" onChange={(event) => setAu(Math.max(0, Number(event.target.value)))} className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-white outline-none" />
                <span className="grid w-14 place-items-center border-l border-[#3d484e] text-xs text-[var(--muted)]">AU</span>
              </div>
              <div className="mt-4 border-l-2 border-[var(--coral)] bg-[#191311] p-4">
                <p className="text-[10px] text-[#ac8b7c]">OUTPUT</p>
                <p className="mt-1 break-all font-mono text-2xl text-white">{lightYears.toPrecision(7)} ly</p>
              </div>
              <div className="mt-6">
                <p className="flex items-center gap-2 text-xs font-semibold text-white"><Table2 size={15} /> 天文学的な意味</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">約 63,241 AU は 1 光年です。オールト雲の推定外縁は、この恒星間スケールへ近づいています。一方、最寄りの恒星プロキシマ・ケンタウリまでは約 4.25 光年あります。</p>
              </div>
              <div className="mt-6 border-t border-[var(--line)] pt-5">
                <p className="text-xs font-semibold text-[#f3d58e]">確認</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">4.25 光年を AU に戻すには、割り算と掛け算のどちらを使いますか？</p>
                <details className="mt-3 text-xs"><summary className="cursor-pointer text-white">解答を見る</summary><p className="mt-2 leading-5 text-[var(--muted)]">掛け算です。4.25 ly × 63,241 AU/ly ≈ 268,800 AU となり、ly が消えて AU が残ります。</p></details>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
