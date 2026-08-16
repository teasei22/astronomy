"use client";

import { BookOpen, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { glossary, type GlossaryEntry } from "@/data/glossary";

const categories: { id: GlossaryEntry["category"] | "all"; label: string }[] = [
  { id: "all", label: "すべて" },
  { id: "scale", label: "距離・尺度" },
  { id: "observation", label: "観測" },
  { id: "object", label: "天体" },
  { id: "physics", label: "物理" },
  { id: "cosmology", label: "宇宙論" },
  { id: "research", label: "研究" },
];

export function GlossaryBrowser() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<(typeof categories)[number]["id"]>("all");
  const [targetId, setTargetId] = useState<string | null>(null);
  useEffect(() => {
    const syncTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1)) || null;
      setTargetId(id);
      if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };
    syncTarget();
    window.addEventListener("hashchange", syncTarget);
    return () => window.removeEventListener("hashchange", syncTarget);
  }, []);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return glossary.filter((entry) => {
      const categoryMatch = category === "all" || entry.category === category;
      const haystack = `${entry.termJa} ${entry.termEn} ${entry.abbr ?? ""} ${entry.definition} ${(entry.aliases ?? []).join(" ")}`.toLowerCase();
      return categoryMatch && (!normalized || haystack.includes(normalized));
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-xs font-semibold text-[var(--cyan)]"><BookOpen size={15} /> ASTRONOMY GLOSSARY</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">用語を、知識のつながりに戻す</h1>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">日本語名、英語名、略称、一文定義を並べています。本文では初出時にも説明し、この用語集だけに理解を預けません。</p>
      </div>

      <div className="sticky top-16 z-20 -mx-5 mt-8 border-y border-[var(--line)] bg-[#0b0d0ff2] px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:mx-0 lg:border lg:px-4">
        <div className="flex items-center gap-3 border-b border-[#384248] pb-3">
          <Search size={19} className="text-[var(--cyan)]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="用語・英語・略称で検索" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#69757b]" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="検索を消去" title="検索を消去" className="text-[var(--muted)] hover:text-white"><X size={18} /></button>}
        </div>
        <div className="scrollbar-thin mt-3 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button key={item.id} type="button" onClick={() => setCategory(item.id)} className={clsx("h-8 shrink-0 border px-3 text-xs", category === item.id ? "border-[var(--cyan)] bg-[#17302c] text-[#9ee3d8]" : "border-[#343e43] text-[var(--muted)] hover:text-white")}>{item.label}</button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-[var(--muted)]">
        <span>{filtered.length} 語を表示</span>
        <span>設計上は数百語まで拡張可能</span>
      </div>

      <div className="mt-3 grid gap-px bg-[var(--line)] border border-[var(--line)] md:grid-cols-2">
        {filtered.map((entry) => (
          <article key={entry.id} id={entry.id} tabIndex={-1} className={clsx("glossary-entry min-h-48 scroll-mt-40 bg-[var(--panel)] p-5 sm:p-6", targetId === entry.id && "glossary-entry-active")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{entry.termJa}</h2>
                <p className="mt-1 text-sm text-[var(--cyan)]">{entry.termEn}{entry.abbr ? ` · ${entry.abbr}` : ""}</p>
              </div>
              <span className="border border-[#3a454a] px-2 py-1 text-[10px] text-[var(--muted)]">L{entry.level}</span>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#c7cfcc]">{entry.definition}</p>
          </article>
        ))}
      </div>

      {filtered.length === 0 && <div className="mt-3 border border-[var(--line)] p-10 text-center text-sm text-[var(--muted)]">一致する用語がありません。表記を短くして試してください。</div>}
    </div>
  );
}
