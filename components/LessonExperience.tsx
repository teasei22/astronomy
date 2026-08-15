"use client";

import { ArrowDown, CheckCircle2, Eye, ScanSearch, XCircle } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { lessonExperiences, type LessonExperience as Experience } from "@/data/lesson-experiences";

export function LessonExperience({ slug }: { slug: string }) {
  const experience = lessonExperiences[slug];
  if (!experience) return null;
  return experience.kind === "sequence"
    ? <SequenceExperience experience={experience} />
    : <PredictionExperience experience={experience} />;
}

function SequenceExperience({ experience }: { experience: Extract<Experience, { kind: "sequence" }> }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [evidenceCount, setEvidenceCount] = useState(0);
  const step = experience.steps[stepIndex];
  const correct = selected === step.correct;
  const complete = stepIndex === experience.steps.length - 1 && correct;
  const trail = [experience.steps[0].current, ...experience.steps.slice(0, stepIndex).map((item) => item.options[item.correct])];

  function advance() {
    if (!correct || complete) return;
    setStepIndex((current) => current + 1);
    setSelected(null);
  }

  return (
    <ExperienceShell title={experience.title} setup={experience.setup}>
      <div className="flex flex-wrap items-center gap-2" aria-label="現在までの宇宙住所">
        {trail.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            {index > 0 && <ArrowDown size={14} className="-rotate-90 text-[#66747a]" />}
            <span className={clsx("border px-3 py-2 text-xs", index === trail.length - 1 ? "border-[var(--cyan)] bg-[#152724] text-white" : "border-[#374148] text-[var(--muted)]")}>{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold leading-6 text-white">{step.prompt}</p>
      <ChoiceGrid options={step.options} selected={selected} correct={step.correct} locked={correct} onSelect={setSelected} />
      {selected !== null && <Feedback correct={correct} text={step.feedback[selected]} />}
      {correct && !complete && <button type="button" onClick={advance} className="mt-4 inline-flex h-10 items-center gap-2 bg-[var(--cyan)] px-4 text-xs font-semibold text-[#07110f]">もう一段 Zoom Out <ArrowDown size={15} /></button>}
      {complete && <EvidenceTrail experience={experience} count={evidenceCount} setCount={setEvidenceCount} />}
    </ExperienceShell>
  );
}

function PredictionExperience({ experience }: { experience: Extract<Experience, { kind: "prediction" }> }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [evidenceCount, setEvidenceCount] = useState(0);
  const answered = selected !== null;

  return (
    <ExperienceShell title={experience.title} setup={experience.setup}>
      <p className="text-sm font-semibold leading-6 text-white">{experience.prompt}</p>
      <ChoiceGrid options={experience.options} selected={selected} correct={experience.correct} locked={answered} onSelect={setSelected} />
      {answered && <Feedback correct={selected === experience.correct} text={experience.feedback[selected]} />}
      {answered && <EvidenceTrail experience={experience} count={evidenceCount} setCount={setEvidenceCount} />}
    </ExperienceShell>
  );
}

function ExperienceShell({ title, setup, children }: { title: string; setup: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 border border-[#41625f] bg-[#0e1717]">
      <div className="border-b border-[#293c3a] px-5 py-4 sm:px-6">
        <p className="flex items-center gap-2 text-[10px] font-semibold text-[var(--cyan)]"><ScanSearch size={14} /> PREDICT FIRST</p>
        <h2 className="mt-2 text-xl font-semibold leading-8 text-white sm:text-2xl">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#adb9b7]">{setup}</p>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function ChoiceGrid({ options, selected, correct, locked, onSelect }: { options: string[]; selected: number | null; correct: number; locked: boolean; onSelect: (index: number) => void }) {
  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-3">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          disabled={locked}
          onClick={() => onSelect(index)}
          aria-pressed={selected === index}
          className={clsx(
            "min-h-12 border px-3 py-2 text-left text-sm disabled:cursor-default",
            selected === index && index === correct ? "border-[#4f9e91] bg-[#19342f] text-white" :
              selected === index ? "border-[#a55b43] bg-[#321d17] text-white" :
                "border-[#354247] bg-[#101517] text-[#c2cbca] hover:border-[#66767b] hover:text-white",
          )}
        >
          <span className="mr-2 font-mono text-[10px] text-[var(--muted)]">{String.fromCharCode(65 + index)}</span>{option}
        </button>
      ))}
    </div>
  );
}

function Feedback({ correct, text }: { correct: boolean; text: string }) {
  return (
    <div className={clsx("mt-3 flex items-start gap-2 border-l-2 p-3 text-xs leading-5", correct ? "border-[#4c9b8e] bg-[#142520] text-[#b9ded7]" : "border-[#a55b43] bg-[#291915] text-[#e4beb0]")} aria-live="polite">
      {correct ? <CheckCircle2 size={15} className="mt-0.5 shrink-0" /> : <XCircle size={15} className="mt-0.5 shrink-0" />}
      <span>{text}</span>
    </div>
  );
}

function EvidenceTrail({ experience, count, setCount }: { experience: Experience; count: number; setCount: (count: number) => void }) {
  const complete = count === experience.evidence.length;
  return (
    <div className="mt-6 border-t border-[#293c3a] pt-5">
      <p className="flex items-center gap-2 text-xs font-semibold text-white"><Eye size={15} className="text-[var(--gold)]" /> {experience.evidenceQuestion}</p>
      {count > 0 && (
        <ol className="mt-4 grid gap-2 sm:grid-cols-2">
          {experience.evidence.slice(0, count).map((item, index) => (
            <li key={item.label} className="border-l-2 border-[#506460] bg-[#121b1b] px-4 py-3">
              <p className="text-xs font-semibold text-white"><span className="mr-2 font-mono text-[var(--cyan)]">{String(index + 1).padStart(2, "0")}</span>{item.label}</p>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{item.detail}</p>
            </li>
          ))}
        </ol>
      )}
      {!complete && <button type="button" onClick={() => setCount(count + 1)} className="mt-4 inline-flex h-10 items-center gap-2 border border-[var(--gold)] px-4 text-xs font-semibold text-[var(--gold)] hover:bg-[#292414]">証拠を1段見る <ArrowDown size={14} /></button>}
      {complete && <p className="mt-4 text-xs font-semibold text-[#a6e5db]" aria-live="polite">証拠の鎖がつながりました。予想と照らし合わせてから解説へ進みます。</p>}
    </div>
  );
}
