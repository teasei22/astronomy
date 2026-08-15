import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { glossaryById } from "@/data/glossary";

export function LessonGlossary({ ids }: { ids: string[] }) {
  const entries = ids.map((id) => glossaryById[id]).filter(Boolean);
  if (entries.length === 0) return null;

  return (
    <section className="border-y border-[var(--line)] py-8" aria-labelledby="lesson-glossary-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-semibold text-[var(--cyan)]">
            <BookOpenText size={13} aria-hidden="true" /> KEY TERMS
          </p>
          <h2 id="lesson-glossary-title" className="mt-2 text-xl font-semibold text-white sm:text-2xl">この章の用語</h2>
        </div>
        <Link href="/glossary" className="inline-flex items-center gap-1.5 text-xs text-[#a8cac6] hover:text-white">
          用語集を開く <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>

      <dl className="mt-5 divide-y divide-[var(--line)] border-t border-[var(--line)]">
        {entries.map((entry) => (
          <div key={entry.id} className="grid gap-2 py-4 sm:grid-cols-[minmax(150px,0.36fr)_minmax(0,1fr)] sm:gap-6">
            <dt>
              <span className="block text-sm font-semibold text-[#e5eae8]">{entry.termJa}</span>
              <span className="mt-1 block text-[11px] text-[var(--cyan)]">
                {entry.termEn}{entry.abbr ? ` · ${entry.abbr}` : ""}
              </span>
            </dt>
            <dd className="text-sm leading-6 text-[#aeb9b7]">{entry.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
