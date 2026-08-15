"use client";

import { CalendarDays, Clock3, History } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const universeAge = 13.8;
const events = [
  { name: "ビッグバン宇宙の始まり", age: 0, note: "時間と空間の初期状態を記述するモデルの起点。空間内の爆発地点ではありません。", status: "Established" },
  { name: "CMB が自由に進み始める", age: 0.00038, note: "宇宙誕生から約 38 万年。宇宙が冷え、光が物質に散乱され続けなくなりました。", status: "Established" },
  { name: "最初の恒星", age: 0.15, note: "正確な時期には幅があります。初代星そのものの詳細は活発な研究対象です。", status: "Active Research" },
  { name: "初期の銀河", age: 0.4, note: "非常に遠い銀河の観測によって、形成時期の理解は更新され続けています。", status: "Active Research" },
  { name: "天の川の形成が進む", age: 0.8, note: "銀河形成は一度の出来事ではなく、合体・星形成を伴う長い過程です。", status: "Strong Evidence" },
  { name: "太陽系の形成", age: 9.23, note: "約 45.7 億年前。隕石の放射年代測定が主要な証拠です。", status: "Established" },
  { name: "地球の形成", age: 9.26, note: "太陽系形成の直後から集積が進みました。", status: "Established" },
  { name: "地球上の初期生命の証拠", age: 10.1, note: "どの証拠を最古と認めるかには研究上の幅があります。", status: "Active Research" },
  { name: "現在", age: 13.8, note: "宇宙年齢は複数の宇宙論的観測を標準モデルで統合した推定値です。", status: "Strong Evidence" },
] as const;

export function CosmicTimeline() {
  const [mode, setMode] = useState<"age" | "calendar">("age");
  const [selected, setSelected] = useState(events.length - 1);
  const event = events[selected];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-xs font-semibold text-[var(--gold)]"><History size={15} /> COSMIC TIMELINE</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">138億年を、一本の時間にする</h1>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">宇宙の始まりを1月1日、現在を12月31日の終わりに置くと、太陽系の誕生は9月ごろです。</p>
      </div>

      <div className="mt-8 inline-flex border border-[var(--line)] bg-[var(--panel)] p-1" aria-label="時間表示モード">
        <button type="button" onClick={() => setMode("age")} className={clsx("flex h-9 items-center gap-2 px-3 text-xs", mode === "age" ? "bg-[#283035] text-white" : "text-[var(--muted)]")}><Clock3 size={15} /> 実時間</button>
        <button type="button" onClick={() => setMode("calendar")} className={clsx("flex h-9 items-center gap-2 px-3 text-xs", mode === "calendar" ? "bg-[#283035] text-white" : "text-[var(--muted)]")}><CalendarDays size={15} /> 宇宙暦</button>
      </div>

      <section className="mt-6 grid border border-[var(--line)] bg-[var(--panel)] lg:grid-cols-[1fr_340px]">
        <div className="overflow-x-auto p-6 sm:p-8">
          <div className="relative min-w-[680px] py-16">
            <div className="absolute left-0 right-0 top-[79px] h-0.5 bg-[#3d484d]" />
            {events.map((item, index) => {
              const x = Math.max(0.8, Math.min(99.2, (item.age / universeAge) * 100));
              const active = index === selected;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelected(index)}
                  className="absolute top-[64px] -translate-x-1/2"
                  style={{ left: `${x}%` }}
                  aria-label={`${item.name}: ${displayDate(item.age, mode)}`}
                >
                  <span className={clsx("block size-8 rounded-full border-4 border-[var(--panel)]", active ? "bg-[var(--gold)] ring-2 ring-[#80682d]" : "bg-[#68757b] hover:bg-white")} />
                  <span className={clsx("absolute top-11 block w-24 -translate-x-[calc(50%-16px)] text-center text-[10px] leading-4", active ? "text-white" : "text-[#7e898e]")}>{shortName(item.name)}</span>
                </button>
              );
            })}
            <div className="absolute left-0 top-2 text-xs text-[var(--muted)]">{mode === "age" ? "0 年" : "1月1日 00:00"}</div>
            <div className="absolute right-0 top-2 text-right text-xs text-[var(--muted)]">{mode === "age" ? "138 億年" : "12月31日 24:00"}</div>
          </div>
        </div>
        <aside className="border-t border-[var(--line)] bg-[#101416] p-6 lg:border-l lg:border-t-0 lg:p-7">
          <p className="text-[10px] font-semibold text-[var(--gold)]">SELECTED EVENT</p>
          <p className="mt-3 font-mono text-sm text-[#d8c58e]">{displayDate(event.age, mode)}</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{event.name}</h2>
          <p className="mt-4 text-sm leading-7 text-[#c4cdca]">{event.note}</p>
          <span className="mt-5 inline-block border border-[#4b555a] px-2 py-1 text-[10px] text-[var(--muted)]">{event.status}</span>
        </aside>
      </section>

      <div className="mt-8 grid gap-px bg-[var(--line)] border border-[var(--line)] sm:grid-cols-3">
        <Fact value="38 万年" label="CMB が自由に進み始めるまで" />
        <Fact value="約 92 億年" label="太陽系ができるまで" />
        <Fact value="約 46 億年" label="太陽系形成から現在まで" />
      </div>

      <div className="mt-8 border-l-2 border-[var(--cyan)] pl-4 text-sm leading-7 text-[var(--muted)]">
        <strong className="text-white">時間軸の注意:</strong> 「天の川形成」「生命誕生」は一瞬の点ではなく、証拠の定義にも幅がある出来事です。この図の点は学習用の代表時刻で、誤差のない日付ではありません。
      </div>
    </div>
  );
}

function displayDate(age: number, mode: "age" | "calendar") {
  if (mode === "age") {
    if (age === 0) return "宇宙誕生時";
    if (age < 0.001) return `誕生から約 ${Math.round(age * 1e9).toLocaleString("ja-JP")} 年`;
    return `誕生から約 ${(age * 10).toFixed(age < 1 ? 1 : 0)} 億年`;
  }
  if (age === universeAge) return "12月31日 24:00";
  const date = new Date(Date.UTC(2024, 0, 1));
  date.setUTCSeconds((age / universeAge) * 365 * 24 * 60 * 60);
  return new Intl.DateTimeFormat("ja-JP", { timeZone: "UTC", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
}

function shortName(name: string) {
  return name.replace("宇宙の始まり", "").replace("が自由に進み始める", "").replace("の形成が進む", "");
}

function Fact({ value, label }: { value: string; label: string }) {
  return <div className="bg-[var(--panel)] p-5"><p className="font-mono text-xl text-white">{value}</p><p className="mt-2 text-xs leading-5 text-[var(--muted)]">{label}</p></div>;
}
