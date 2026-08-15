"use client";

import Link from "next/link";
import { Check, CheckCircle2, ChevronDown, Circle, LockKeyhole, Route, Target } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { CurriculumStandard } from "@/components/CurriculumStandard";
import { availableLessons, levels } from "@/data/curriculum";
import { useLearnerState } from "@/lib/progress";

export function Roadmap() {
  const learner = useLearnerState();
  const [openLevel, setOpenLevel] = useState(0);
  const currentLesson = availableLessons.find((lesson) => lesson.slug === learner.lastVisited);
  const currentLevel = currentLesson ? Number(currentLesson.code[1]) : 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-xs font-semibold text-[var(--cyan)]"><Route size={15} /> LEARNING ROADMAP</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">今いる場所と、これから行く場所</h1>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">入口では数式を使わず、観測できる量を増やしながら、物理・数学・データ解析・論文読解へ進みます。各段階は学習テストを通した教材から公開します。</p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <Summary label="現在地" value={"Level " + currentLevel} />
        <Summary label="公開・検証中" value={availableLessons.length + " 教材"} />
        <Summary label="修了条件" value="判定 80% + 演習" />
      </div>

      <div className="relative mt-10">
        <div className="absolute bottom-8 left-[23px] top-8 w-px bg-[#344046] sm:left-[31px]" />
        <div className="space-y-4">
          {levels.map((level) => {
            const open = openLevel === level.level;
            const activeLessons = availableLessons.filter((lesson) => Number(lesson.code[1]) === level.level);
            return (
              <section id={`level-${level.level}`} key={level.level} className="relative scroll-mt-24 pl-14 sm:pl-20">
                <button
                  type="button"
                  onClick={() => setOpenLevel(open ? -1 : level.level)}
                  aria-expanded={open}
                  className="group w-full border border-[var(--line)] bg-[var(--panel)] p-5 text-left hover:border-[#49565c] sm:p-6"
                >
                  <span className="absolute left-0 top-5 z-10 grid size-12 place-items-center border-2 bg-[var(--bg)] text-sm font-bold sm:size-16" style={{ borderColor: level.accent, color: level.accent }}>
                    {level.level}
                  </span>
                  <div className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold" style={{ color: level.accent }}>LEVEL {level.level} · {level.subtitle.toUpperCase()}</p>
                      <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{level.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{level.description}</p>
                      <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#c5cecb]"><Target size={14} className="mt-0.5 shrink-0" style={{ color: level.accent }} /><span><span className="mr-2 font-semibold" style={{ color: level.accent }}>修了すると</span>{level.capabilities[0]}</span></p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-xs text-[var(--muted)] sm:block">公開 {activeLessons.length}</span>
                      <ChevronDown size={20} className={clsx("text-[#829096] transition-transform", open && "rotate-180")} />
                    </div>
                  </div>
                </button>

                {open && (
                  <div className="border-x border-b border-[var(--line)] bg-[#0f1315] p-5 sm:p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-semibold" style={{ color: level.accent }}>CAN DO</p>
                        <h3 className="mt-1 text-base font-semibold text-white">修了するとできること</h3>
                        <ul className="mt-3 space-y-2.5">
                          {level.capabilities.map((capability) => <li key={capability} className="flex items-start gap-2 text-xs leading-5 text-[#c8d0ce]"><CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: level.accent }} />{capability}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#89959a]">PREREQUISITES</p>
                        <h3 className="mt-1 text-base font-semibold text-white">先に使えるようにする道具</h3>
                        {level.prerequisites.length ? (
                          <div className="mt-3 space-y-2">
                            {level.prerequisites.map((prerequisite) => {
                              const content = <><span className={clsx("grid size-5 shrink-0 place-items-center border", prerequisite.available ? "border-[#438378] bg-[#18312c] text-[#9ee3d8]" : "border-[#465158] text-[#718087]")}>{prerequisite.available ? <Check size={12} /> : <Circle size={7} />}</span><span className="min-w-0 flex-1">{prerequisite.label}</span><span className="shrink-0 text-[9px] text-[#728087]">{prerequisite.available ? "復習可" : "準備中"}</span></>;
                              return prerequisite.href ? <Link key={prerequisite.label} href={prerequisite.href} className="flex min-h-10 items-center gap-2 border border-[#2f383d] px-3 py-2 text-xs text-[#c8d0ce] hover:border-[#59666c] hover:text-white">{content}</Link> : <div key={prerequisite.label} className="flex min-h-10 items-center gap-2 border border-[#2a3236] px-3 py-2 text-xs text-[var(--muted)]">{content}</div>;
                            })}
                          </div>
                        ) : <p className="mt-3 border-l-2 border-[#3f4a4f] px-3 py-2 text-xs text-[var(--muted)]">前提知識はありません。</p>}
                      </div>
                    </div>

                    <div className="mt-7 border-t border-[var(--line)] pt-6">
                      <p className="mb-4 text-[10px] font-semibold text-[#738087]">COURSE STRUCTURE</p>
                      <div className="grid gap-6 md:grid-cols-2">
                      {level.courses.map((course, courseIndex) => (
                        <div key={course.title}>
                          <p className="text-xs font-semibold text-white">Course {level.level}{String.fromCharCode(65 + courseIndex)} · {course.title}</p>
                          <div className="mt-3 space-y-2">
                            {course.modules.map((module) => (
                              <div key={module} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                                <Circle size={8} fill={level.accent} strokeWidth={0} /> {module}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>
                    {activeLessons.length > 0 ? (
                      <div className="mt-6 border-t border-[var(--line)] pt-5">
                        <p className="mb-3 text-[10px] font-semibold text-[#738087]">AVAILABLE NOW</p>
                        <div className="divide-y divide-[#262e32]">
                          {activeLessons.map((lesson) => {
                            const done = learner.completed.includes(lesson.slug);
                            return (
                              <Link key={lesson.slug} href={`/learn/${lesson.slug}`} className="flex items-center gap-3 py-3 text-sm hover:text-[var(--cyan)]">
                                <span className={clsx("grid size-5 place-items-center border", done ? "border-[#438378] bg-[#21473f] text-[#9ee3d8]" : "border-[#465158] text-[#718087]")}>{done ? <Check size={13} /> : <Circle size={7} />}</span>
                                <span className="w-14 shrink-0 font-mono text-xs text-[var(--muted)]">{lesson.code}</span>
                                <span className="min-w-0 flex-1 text-white">{lesson.title}</span>
                                <span className="text-xs text-[var(--muted)]">{lesson.duration} min</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 flex items-center gap-2 border-t border-[var(--line)] pt-5 text-xs text-[#77838a]"><LockKeyhole size={14} /> 前提レベルの教材を順次公開します。</div>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <CurriculumStandard />
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-[#3a484e] bg-[#101416] px-4 py-3">
      <p className="text-[10px] text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
