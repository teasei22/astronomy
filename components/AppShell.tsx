"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Atom,
  BookOpen,
  Braces,
  ChevronRight,
  Compass,
  FlaskConical,
  Menu,
  Orbit,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { availableLessons } from "@/data/curriculum";
import { glossary } from "@/data/glossary";

const navItems = [
  { href: "/", label: "学習ホーム", icon: Compass },
  { href: "/roadmap", label: "ロードマップ", icon: Orbit },
  { href: "/glossary", label: "用語集", icon: BookOpen },
  { href: "/explore/scale", label: "スケール実験", icon: Atom },
  { href: "/explore/timeline", label: "宇宙史", icon: Braces },
  { href: "/lab", label: "Astronomy Lab", icon: FlaskConical },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const lessons = availableLessons
      .filter((lesson) => `${lesson.title} ${lesson.code}`.toLowerCase().includes(normalized))
      .map((lesson) => ({ href: `/learn/${lesson.slug}`, title: lesson.title, meta: `レッスン ${lesson.code}` }));
    const terms = glossary
      .filter((entry) => `${entry.termJa} ${entry.termEn} ${entry.abbr ?? ""}`.toLowerCase().includes(normalized))
      .slice(0, 8)
      .map((entry) => ({ href: `/glossary?q=${encodeURIComponent(entry.termJa)}`, title: entry.termJa, meta: entry.termEn }));
    return [...lessons, ...terms].slice(0, 10);
  }, [query]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center border-b border-[var(--line)] bg-[#0b0d0ff2] px-4 backdrop-blur lg:left-64 lg:px-7">
        <button
          type="button"
          className="mr-3 grid size-10 place-items-center text-[var(--muted)] hover:text-white lg:hidden"
          aria-label="ナビゲーションを開く"
          title="ナビゲーション"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={21} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-[var(--muted)]">UNDERGRADUATE ASTRONOMY PATH</p>
        </div>
        <button
          type="button"
          className="flex h-10 min-w-10 items-center gap-2 border border-[var(--line)] bg-[var(--panel)] px-3 text-sm text-[var(--muted)] hover:border-[#556169] hover:text-white sm:min-w-56"
          onClick={() => setSearchOpen(true)}
          aria-label="教材を検索"
        >
          <Search size={17} />
          <span className="hidden sm:inline">教材・用語を検索</span>
          <span className="ml-auto hidden rounded border border-[#3b444a] px-1.5 py-0.5 text-[10px] text-[#7f8a90] sm:inline">/</span>
        </button>
      </header>

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-[60] flex w-64 flex-col border-r border-[var(--line)] bg-[#0e1113] transition-transform lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <Link href="/" className="group" onClick={() => setMenuOpen(false)}>
            <span className="block text-xl font-semibold tracking-[0.18em] text-white">ASTRAEA</span>
            <span className="mt-0.5 block text-[10px] text-[var(--cyan)]">証拠から学ぶ天文学</span>
          </Link>
          <button
            type="button"
            className="grid size-9 place-items-center text-[var(--muted)] hover:text-white lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="ナビゲーションを閉じる"
            title="閉じる"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4" aria-label="メインナビゲーション">
          <p className="mb-2 px-3 text-[10px] font-semibold text-[#6f7b81]">EXPLORE & LEARN</p>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  "mb-1 flex h-11 items-center gap-3 border-l-2 px-3 text-sm transition-colors",
                  active
                    ? "border-[var(--cyan)] bg-[#17201f] text-white"
                    : "border-transparent text-[var(--muted)] hover:bg-[#14191c] hover:text-white",
                )}
              >
                <Icon size={18} strokeWidth={1.8} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[var(--line)] p-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-[var(--muted)]">初期公開範囲</span>
            <span className="font-mono text-[var(--cyan)]">L0–L1</span>
          </div>
          <div className="h-1.5 overflow-hidden bg-[#252c30]">
            <div className="h-full w-1/4 bg-[var(--cyan)]" />
          </div>
          <Link href="/roadmap" className="mt-3 flex items-center gap-1 text-xs text-[#c2cccf] hover:text-white">
            全カリキュラムを見る <ChevronRight size={13} />
          </Link>
        </div>
      </aside>

      {menuOpen && (
        <button
          className="fixed inset-0 z-50 bg-black/70 lg:hidden"
          aria-label="ナビゲーションを閉じる"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="min-h-screen pt-16 lg:ml-64">{children}</main>

      {searchOpen && (
        <div className="fixed inset-0 z-[80] flex justify-center bg-black/75 px-4 pt-[12vh]" onMouseDown={() => setSearchOpen(false)}>
          <div
            className="h-fit w-full max-w-2xl border border-[#3b454b] bg-[#101417] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="教材を検索"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex h-14 items-center gap-3 border-b border-[var(--line)] px-4">
              <Search size={19} className="text-[var(--cyan)]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-[#69757b]"
                placeholder="例: 光年、赤方偏移、宇宙の住所"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="検索を閉じる" title="閉じる" className="text-[var(--muted)] hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {!query && <p className="p-5 text-sm text-[var(--muted)]">レッスン名、日本語・英語の用語、略称から検索できます。</p>}
              {query && results.length === 0 && <p className="p-5 text-sm text-[var(--muted)]">一致する項目がありません。</p>}
              {results.map((result) => (
                <Link
                  key={`${result.href}-${result.title}`}
                  href={result.href}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 border-b border-[#232a2e] px-3 py-3.5 last:border-0 hover:bg-[#181e21]"
                >
                  <span className="min-w-0 flex-1 truncate text-sm text-white">{result.title}</span>
                  <span className="text-xs text-[var(--muted)]">{result.meta}</span>
                  <ChevronRight size={16} className="text-[#667278]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
