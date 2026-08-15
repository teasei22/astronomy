import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { availableLessons } from "@/data/curriculum";
import { GlossaryTerm } from "@/components/GlossaryTerm";
import { LayerStack } from "@/components/LayerStack";
import { LessonActions } from "@/components/LessonActions";
import { LessonExperience } from "@/components/LessonExperience";
import { LessonInteractive } from "@/components/LessonInteractive";
import { LessonSection } from "@/components/LessonSection";
import { QuizBlock } from "@/components/QuizBlock";
import { SkillBridge } from "@/components/SkillBridge";
import { StatusBadge } from "@/components/StatusBadge";
import { getAllLessonSlugs, getLesson } from "@/lib/content";

export function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return lesson ? { title: lesson.meta.title, description: lesson.meta.summary } : {};
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const { meta, sections } = lesson;
  const layers = sections.filter((section) => section.title.startsWith("Layer"));
  const regular = sections.filter((section) => !section.title.startsWith("Layer"));
  const currentIndex = availableLessons.findIndex((item) => item.slug === slug);
  const previous = availableLessons[currentIndex - 1];
  const next = availableLessons[currentIndex + 1];
  const layerInsertAt = Math.min(3, regular.length);

  return (
    <div>
      <header className="border-b border-[var(--line)] bg-[#0f1315]">
        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8 lg:px-12 lg:py-12">
          <Link href="/roadmap" className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-white"><ArrowLeft size={14} /> ロードマップ</Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="border border-[var(--cyan)] px-2 py-1 font-mono text-[var(--cyan)]">{meta.code}</span>
            <span className="text-[var(--muted)]">Level {meta.level} · {meta.module}</span>
            <span className="flex items-center gap-1 text-[var(--muted)]"><Clock3 size={13} /> 約 {meta.duration} 分</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{meta.title}</h1>
          <p className="mt-2 text-sm text-[var(--cyan)]">{meta.titleEn}</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#b5c0be]">{meta.summary}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:px-12 lg:py-12">
        <article className="min-w-0">
          <LessonExperience slug={slug} />

          <section className="grid gap-px bg-[var(--line)] border border-[var(--line)] sm:grid-cols-2">
            <div className="bg-[var(--panel)] p-5">
              <p className="text-[10px] font-semibold text-[var(--cyan)]">LEARNING OUTCOMES</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#cbd2d0]">
                {meta.outcomes.map((outcome) => <li key={outcome} className="flex gap-2"><span className="text-[var(--cyan)]">✓</span>{outcome}</li>)}
              </ul>
            </div>
            <div className="bg-[var(--panel)] p-5">
              <p className="text-[10px] font-semibold text-[var(--gold)]">CLAIM STATUS</p>
              <div className="mt-3 space-y-3">
                {meta.claims.map((claim) => <div key={claim.text}><StatusBadge status={claim.status} /><p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">{claim.text}</p></div>)}
              </div>
            </div>
          </section>

          <SkillBridge slug={slug} />

          <div className="mt-2">
            {regular.map((section, index) => (
              <div key={section.title}>
                {index === layerInsertAt && layers.length > 0 && <LayerStack layers={layers} />}
                <LessonSection title={section.title} markdown={section.markdown} index={index} collapsible={isOptionalReference(meta.level, section.title)} />
              </div>
            ))}
            {layerInsertAt >= regular.length && layers.length > 0 && <LayerStack layers={layers} />}
          </div>

          <LessonInteractive slug={slug} />

          <section className="border-y border-[var(--line)] py-7">
            <p className="text-[10px] font-semibold text-[#7d898f]">KEY TERMS · TAP OR HOVER</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              {meta.glossaryIds.map((id) => <GlossaryTerm key={id} id={id} />)}
            </div>
          </section>

          <QuizBlock slug={slug} />

          <section className="mt-10 border-t border-[var(--line)] pt-7">
            <p className="text-[10px] font-semibold text-[#758187]">SOURCES & REVIEW</p>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-[var(--muted)]">
              {meta.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="text-[#b7dcd7] underline decoration-[#49615e] underline-offset-2 hover:text-white">{source.title}</a> · {source.publisher} · 参照 {source.accessed}</li>)}
            </ul>
            <p className="mt-3 text-[10px] text-[#667278]">科学レビュー: {meta.lastReviewed}</p>
          </section>

          <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="前後のレッスン">
            {previous ? <Link href={`/learn/${previous.slug}`} className="group border border-[var(--line)] bg-[var(--panel)] p-4 hover:border-[#526067]"><span className="flex items-center gap-2 text-[10px] text-[var(--muted)]"><ArrowLeft size={13} /> PREVIOUS</span><span className="mt-2 block text-sm font-semibold text-white">{previous.title}</span></Link> : <div />}
            {next ? <Link href={`/learn/${next.slug}`} className="group border border-[var(--line)] bg-[var(--panel)] p-4 text-right hover:border-[#526067]"><span className="flex items-center justify-end gap-2 text-[10px] text-[var(--muted)]">NEXT <ArrowRight size={13} /></span><span className="mt-2 block text-sm font-semibold text-white">{next.title}</span></Link> : <Link href="/roadmap" className="border border-[var(--cyan)] p-4 text-right"><span className="text-[10px] text-[var(--cyan)]">NEXT</span><span className="mt-2 block text-sm font-semibold text-white">全体ロードマップへ</span></Link>}
          </nav>
        </article>
        <LessonActions slug={slug} />
      </div>
    </div>
  );
}

const optionalReferenceTitles = [
  "図・模式図",
  "身近なたとえ",
  "正確な科学的説明",
  "重要用語",
  "数学・物理との接続",
  "実際の宇宙での具体例",
  "実際の観測データ例",
  "現在分かっていること",
  "まだ分かっていないこと",
];

function isOptionalReference(level: number, title: string) {
  return level <= 1 && optionalReferenceTitles.includes(title);
}
