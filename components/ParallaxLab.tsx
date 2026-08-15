"use client";

import { Calculator, CheckCircle2, Database, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

type Decision = "invert" | "model";

const observations = [
  { id: "A", parallax: 50, uncertainty: 0.5 },
  { id: "B", parallax: 10, uncertainty: 1 },
  { id: "C", parallax: 2, uncertainty: 1 },
  { id: "D", parallax: -0.5, uncertainty: 0.8 },
] as const;

export function ParallaxLab() {
  const [targetId, setTargetId] = useState<(typeof observations)[number]["id"]>("A");
  const [decision, setDecision] = useState<Decision>("invert");
  const [distanceInput, setDistanceInput] = useState("");
  const [checked, setChecked] = useState(false);
  const target = observations.find((row) => row.id === targetId) ?? observations[0];
  const signalToNoise = target.parallax / target.uncertainty;
  const relativeUncertainty = target.uncertainty / Math.abs(target.parallax);
  const directInverseAllowed = target.parallax > 0 && signalToNoise >= 5;
  const distance = directInverseAllowed ? 1000 / target.parallax : null;
  const distanceUncertainty = directInverseAllowed ? (1000 * target.uncertainty) / target.parallax ** 2 : null;
  const enteredDistance = Number(distanceInput);
  const distanceCorrect = distance !== null && Number.isFinite(enteredDistance) && Math.abs(enteredDistance - distance) / distance <= 0.02;
  const correct = directInverseAllowed ? decision === "invert" && distanceCorrect : decision === "model";

  function chooseTarget(id: (typeof observations)[number]["id"]) {
    setTargetId(id);
    setDecision("invert");
    setDistanceInput("");
    setChecked(false);
  }

  return (
    <section className="my-10 border border-[#3d494e] bg-[#101416]" aria-labelledby="parallax-lab-heading">
      <header className="border-b border-[var(--line)] p-5 sm:p-6">
        <p className="flex items-center gap-2 text-[10px] font-semibold text-[var(--coral)]"><Database size={14} /> QUANTITATIVE LAB · SIMULATED CATALOG</p>
        <h2 id="parallax-lab-heading" className="mt-2 text-xl font-semibold text-white sm:text-2xl">視差解析Lab</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">このLab内の判定規則は「正の視差かつS/Nが5以上なら一次近似を試す」です。これは教育用の規則であり、実研究では目的・選択関数・共分散を含めて決めます。</p>
      </header>

      <div className="overflow-x-auto border-b border-[var(--line)]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-[#0b0e10] text-[10px] text-[#849096]">
            <tr>
              <th className="px-4 py-3 font-medium">TARGET</th>
              <th className="px-4 py-3 font-medium">PARALLAX</th>
              <th className="px-4 py-3 font-medium">UNCERTAINTY</th>
              <th className="px-4 py-3 font-medium">S/N</th>
              <th className="px-4 py-3 font-medium">RELATIVE ERROR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#293136]">
            {observations.map((row) => {
              const selected = row.id === targetId;
              return (
                <tr key={row.id} className={selected ? "bg-[#172522]" : undefined}>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => chooseTarget(row.id)} className={clsx("grid size-9 place-items-center border font-mono font-semibold", selected ? "border-[var(--cyan)] text-[var(--cyan)]" : "border-[#465158] text-white hover:border-[#718087]")} aria-label={"Target " + row.id + " を選択"} aria-pressed={selected}>{row.id}</button>
                  </td>
                  <td className="px-4 py-3 font-mono text-white">{row.parallax.toFixed(1)} mas</td>
                  <td className="px-4 py-3 font-mono text-white">{row.uncertainty.toFixed(1)} mas</td>
                  <td className="px-4 py-3 font-mono text-[#b7c2c0]">{(row.parallax / row.uncertainty).toFixed(2)}</td>
                  <td className="px-4 py-3 font-mono text-[#b7c2c0]">{(row.uncertainty / Math.abs(row.parallax) * 100).toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-b border-[var(--line)] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold text-white">1. 推定方法を選ぶ</p>
          <div className="mt-3 grid grid-cols-2 border border-[#3b454a] p-1" role="group" aria-label="距離の推定方法">
            <button type="button" aria-pressed={decision === "invert"} onClick={() => { setDecision("invert"); setChecked(false); }} className={clsx("min-h-11 px-3 text-xs font-semibold", decision === "invert" ? "bg-[var(--cyan)] text-[#07110f]" : "text-[var(--muted)] hover:text-white")}>逆数近似</button>
            <button type="button" aria-pressed={decision === "model"} onClick={() => { setDecision("model"); setChecked(false); }} className={clsx("min-h-11 px-3 text-xs font-semibold", decision === "model" ? "bg-[var(--cyan)] text-[#07110f]" : "text-[var(--muted)] hover:text-white")}>尤度モデル</button>
          </div>

          <label className="mt-6 block text-xs font-semibold text-white" htmlFor="parallax-distance-input">2. 逆数を使う場合の距離</label>
          <div className="mt-2 flex border border-[#3d484e] bg-[#0c1012] focus-within:border-[var(--cyan)]">
            <input id="parallax-distance-input" type="number" step="any" disabled={decision !== "invert"} value={distanceInput} onChange={(event) => { setDistanceInput(event.target.value); setChecked(false); }} className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-white outline-none disabled:cursor-not-allowed disabled:opacity-40" />
            <span className="grid w-16 place-items-center border-l border-[#3d484e] text-xs text-[var(--muted)]">pc</span>
          </div>
          <p className="mt-2 text-[10px] leading-5 text-[#748086]">距離を使う場合は d = 1000 / p を計算してください。許容差は2%です。</p>

          <button type="button" onClick={() => setChecked(true)} disabled={decision === "invert" && distanceInput === ""} className="mt-5 flex h-11 w-full items-center justify-center gap-2 bg-[var(--gold)] text-sm font-semibold text-[#171307] disabled:cursor-not-allowed disabled:opacity-35"><Calculator size={17} /> 判定する</button>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold text-white">解析メモ</p>
          <dl className="mt-4 grid grid-cols-2 gap-px bg-[var(--line)]">
            <Metric label="S/N" value={signalToNoise.toFixed(2)} />
            <Metric label="相対不確かさ" value={(relativeUncertainty * 100).toFixed(1) + "%"} />
          </dl>

          {checked ? (
            <div className={clsx("mt-5 border-l-2 p-4", correct ? "border-[#4c9b8e] bg-[#142520]" : "border-[#a55b43] bg-[#291915]")} aria-live="polite">
              <p className={clsx("flex items-center gap-2 text-sm font-semibold", correct ? "text-[#a6e5db]" : "text-[#e4beb0]")}>{correct ? <CheckCircle2 size={17} /> : <XCircle size={17} />}{correct ? "判断は妥当です" : "判断を見直してください"}</p>
              <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
                {directInverseAllowed
                  ? "このLabの規則では逆数近似を使えます。d = " + distance?.toFixed(1) + " ± " + distanceUncertainty?.toFixed(1) + " pc です。"
                  : "この測定は低S/Nまたは負の視差です。直接反転せず、視差空間の尤度と距離の事前分布を使います。"}
              </p>
            </div>
          ) : (
            <div className="mt-5 min-h-28 border border-dashed border-[#364046] p-4 text-xs leading-6 text-[#748086]">方法と、必要なら距離を入力して判定します。計算前にS/Nと符号を確認してください。</div>
          )}

          <button type="button" onClick={() => chooseTarget(targetId)} className="mt-4 flex h-9 items-center gap-2 text-xs text-[var(--muted)] hover:text-white"><RotateCcw size={14} /> この行をリセット</button>
        </div>
      </div>

      <footer className="border-t border-[var(--line)] px-5 py-4 text-[10px] leading-5 text-[#6f7b81]">Provenance: ASTRAEA simulated-parallax-v1。教育用のGaussian測定例で、実在天体・Gaiaカタログ値ではありません。共分散とzero pointは含みません。</footer>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0d1113] p-3">
      <dt className="text-[10px] text-[#78858b]">{label}</dt>
      <dd className="mt-1 font-mono text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}
