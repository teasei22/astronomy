"use client";

import { ArrowLeftRight, MoveHorizontal, Ruler } from "lucide-react";
import { useMemo, useState } from "react";

type ScaleObject = {
  name: string;
  nameEn: string;
  meters: number;
  kind: "diameter" | "distance";
  context: string;
  color: string;
};

const objects: ScaleObject[] = [
  { name: "地球", nameEn: "Earth", meters: 1.2742e7, kind: "diameter", context: "直径。光なら約 0.043 秒で横切ります。", color: "#64d8cb" },
  { name: "月軌道", nameEn: "Moon orbit", meters: 3.844e8, kind: "distance", context: "地球中心から月までの平均距離。光で約 1.28 秒。", color: "#d4d7d4" },
  { name: "太陽", nameEn: "Sun", meters: 1.3927e9, kind: "diameter", context: "直径は地球の約 109 倍です。", color: "#f6c85f" },
  { name: "地球–太陽", nameEn: "1 AU", meters: 1.495978707e11, kind: "distance", context: "1 天文単位。太陽光は約 8 分 19 秒で届きます。", color: "#ef8354" },
  { name: "海王星軌道", nameEn: "Neptune orbit", meters: 4.5e12, kind: "distance", context: "太陽から約 30 AU。太陽系はここで突然終わりません。", color: "#6fb1fc" },
  { name: "オールト雲外縁", nameEn: "Outer Oort Cloud", meters: 1.5e16, kind: "distance", context: "推定範囲の目安。直接見た境界ではありません。", color: "#a7c957" },
  { name: "最寄りの恒星", nameEn: "Proxima Centauri", meters: 4.014e16, kind: "distance", context: "太陽から約 4.25 光年。", color: "#f38ba8" },
  { name: "天の川銀河", nameEn: "Milky Way", meters: 1.0e21, kind: "diameter", context: "恒星円盤の直径を約 10 万光年とした目安。境界は一枚の線ではありません。", color: "#c3a6ff" },
  { name: "局所銀河群", nameEn: "Local Group", meters: 9.5e22, kind: "diameter", context: "天の川とアンドロメダ銀河などを含む、重力で結びついた銀河群。", color: "#ff8f70" },
  { name: "おとめ座銀河団", nameEn: "Virgo Cluster", meters: 1.5e23, kind: "diameter", context: "数千個規模の銀河を含む近傍の大きな銀河団。", color: "#f6c85f" },
  { name: "観測可能な宇宙", nameEn: "Observable Universe", meters: 8.8e26, kind: "diameter", context: "現在の共動距離で表した直径の目安。宇宙年齢×光速より大きいのは、空間が膨張したためです。", color: "#64d8cb" },
];

const units = [
  { id: "km", label: "km", meters: 1e3 },
  { id: "AU", label: "AU", meters: 1.495978707e11 },
  { id: "ly", label: "光年", meters: 9.4607304725808e15 },
  { id: "pc", label: "pc", meters: 3.085677581491367e16 },
] as const;

export function ScaleExplorer() {
  const [exponent, setExponent] = useState(11.175);
  const [unit, setUnit] = useState<(typeof units)[number]["id"]>("AU");
  const meters = 10 ** exponent;
  const closest = useMemo(() => objects.reduce((best, object) => Math.abs(Math.log10(object.meters) - exponent) < Math.abs(Math.log10(best.meters) - exponent) ? object : best), [exponent]);
  const selectedUnit = units.find((item) => item.id === unit)!;

  return (
    <div>
      <header className="border-b border-[var(--line)] bg-[#0f1315]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <p className="flex items-center gap-2 text-xs font-semibold text-[var(--cyan)]"><Ruler size={15} /> SCALE EXPLORER</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">宇宙を、一つのものさしに載せる</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">横へ少し動くたびに距離が10倍になります。等間隔に見える目盛りでも、隣へ進むごとに世界の大きさが一桁変わります。</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <section className="border border-[var(--line)] bg-[var(--panel)]">
          <div className="border-b border-[var(--line)] p-5 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs text-[var(--muted)]">現在のスケール</p>
                <p className="mt-1 font-mono text-3xl font-semibold text-white sm:text-4xl">10<sup className="text-xl text-[var(--cyan)]">{exponent.toFixed(1)}</sup> m</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--muted)]">{selectedUnit.label} では</p>
                <p className="mt-1 max-w-[16rem] truncate font-mono text-lg text-[#dce4e1]">{formatNumber(meters / selectedUnit.meters)} {selectedUnit.label}</p>
              </div>
            </div>
            <div className="mt-8">
              <input
                className="range-track"
                type="range"
                min="7"
                max="27"
                step="0.025"
                value={exponent}
                onChange={(event) => setExponent(Number(event.target.value))}
                aria-label="距離スケールの指数"
              />
              <div className="mt-3 flex justify-between font-mono text-[10px] text-[#6d797f]"><span>10⁷ m</span><span>10¹¹ m</span><span>10¹⁶ m</span><span>10²¹ m</span><span>10²⁷ m</span></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px]">
            <div className="min-h-72 p-5 sm:p-7">
              <p className="text-[10px] font-semibold text-[#77848a]">NEAREST LANDMARK</p>
              <div className="mt-5 flex items-center gap-5">
                <div className="grid size-20 shrink-0 place-items-center rounded-full border" style={{ borderColor: closest.color, boxShadow: `inset 0 0 28px ${closest.color}22` }}>
                  <MoveHorizontal size={30} style={{ color: closest.color }} strokeWidth={1.3} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-2xl font-semibold text-white">{closest.name}</h2>
                  <p className="mt-1 text-sm" style={{ color: closest.color }}>{closest.nameEn} · {closest.kind === "diameter" ? "直径" : "距離"}</p>
                </div>
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#c8d0ce]">{closest.context}</p>
              <div className="mt-6 h-2 bg-[#242c30]">
                <div className="h-full min-w-1 transition-[width]" style={{ width: `${Math.max(2, Math.min(100, 100 * (meters / closest.meters)))}%`, backgroundColor: closest.color }} />
              </div>
              <p className="mt-2 text-xs text-[var(--muted)]">選択スケール ÷ この目印 = {formatNumber(meters / closest.meters)}</p>
            </div>

            <aside className="border-t border-[var(--line)] bg-[#101416] p-5 lg:border-l lg:border-t-0 lg:p-6">
              <p className="flex items-center gap-2 text-xs font-semibold text-white"><ArrowLeftRight size={15} /> 単位を変えて見る</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {units.map((item) => (
                  <button key={item.id} type="button" onClick={() => setUnit(item.id)} className={`h-9 border text-xs ${unit === item.id ? "border-[var(--cyan)] bg-[#17302c] text-[#9ee3d8]" : "border-[#343e43] text-[var(--muted)] hover:text-white"}`}>{item.label}</button>
                ))}
              </div>
              <div className="mt-6 border-l-2 border-[var(--gold)] pl-3">
                <p className="text-xs font-semibold text-[#f3d58e]">ここで考えてみよう</p>
                <p className="mt-2 text-sm leading-6 text-[#c8ccbd]">地球を直径 1 cm のビー玉に縮めたら、太陽はどれくらい離れるでしょう？</p>
                <details className="mt-3 text-xs text-[var(--muted)]">
                  <summary className="cursor-pointer text-white">答えを見る</summary>
                  <p className="mt-2 leading-5">約 117 m 先です。太陽の直径は約 1.09 m。天体の大きさに比べ、宇宙は非常に空いています。</p>
                </details>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-white">目印へジャンプ</h2>
          <div className="scrollbar-thin mt-4 flex gap-2 overflow-x-auto pb-3">
            {objects.map((object) => (
              <button key={object.name} type="button" onClick={() => setExponent(Math.log10(object.meters))} className="min-w-36 border border-[var(--line)] bg-[var(--panel)] p-3 text-left hover:border-[#56636a]">
                <span className="block text-xs font-semibold text-white">{object.name}</span>
                <span className="mt-1 block font-mono text-[10px]" style={{ color: object.color }}>10^{Math.log10(object.meters).toFixed(1)} m</span>
              </button>
            ))}
          </div>
        </section>

        <p className="mt-8 text-xs leading-6 text-[#6f7b80]">値は学習用の代表値です。オールト雲・銀河・銀河群のように鋭い表面を持たない構造は、定義により大きさが変わります。定義値: 1 AU = 149,597,870,700 m。</p>
      </div>
    </div>
  );
}

function formatNumber(value: number) {
  if (value === 0) return "0";
  if (Math.abs(value) >= 1e5 || Math.abs(value) < 1e-3) return value.toExponential(3);
  return new Intl.NumberFormat("ja-JP", { maximumSignificantDigits: 5 }).format(value);
}
