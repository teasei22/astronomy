"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { quizzes } from "@/data/quizzes";
import { progressActions } from "@/lib/progress";

export function QuizBlock({ slug }: { slug: string }) {
  const questions = quizzes[slug] ?? [];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  if (!questions.length) return null;
  const score = questions.reduce((sum, question, index) => sum + (answers[index] === question.correct ? 1 : 0), 0);

  function submit() {
    setSubmitted(true);
    progressActions.saveQuiz({ lessonSlug: slug, score, total: questions.length, topicIds: [...new Set(questions.flatMap((question) => question.topicIds))], attemptedAt: new Date().toISOString() });
  }

  return (
    <section className="my-10 border border-[#3d494e] bg-[#101416]">
      <div className="border-b border-[var(--line)] p-5 sm:p-6">
        <p className="text-[10px] font-semibold text-[var(--gold)]">CHECK YOUR UNDERSTANDING</p>
        <div className="mt-1 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">理解度チェック</h2>
          {submitted && <span className="font-mono text-sm text-[var(--gold)]">{score} / {questions.length}</span>}
        </div>
      </div>
      <div className="divide-y divide-[var(--line)]">
        {questions.map((question, index) => (
          <div key={question.prompt} className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="border border-[#556168] px-2 py-1 text-[10px] text-[var(--muted)]">{question.type}</span>
              <p className="text-sm font-semibold leading-6 text-white">{question.prompt}</p>
            </div>
            <div className="mt-4 grid gap-2">
              {question.options.map((option, optionIndex) => {
                const selected = answers[index] === optionIndex;
                const correct = question.correct === optionIndex;
                return (
                  <button key={option} type="button" disabled={submitted} onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className={clsx("flex min-h-11 items-center gap-3 border px-3 py-2 text-left text-sm", submitted && correct ? "border-[#438378] bg-[#19342f] text-white" : submitted && selected ? "border-[#8e503d] bg-[#321d17] text-white" : selected ? "border-[var(--cyan)] bg-[#172a28] text-white" : "border-[#30393e] text-[var(--muted)] hover:border-[#536067] hover:text-white")}> 
                    <span className="grid size-5 shrink-0 place-items-center rounded-full border border-current text-[10px]">{String.fromCharCode(65 + optionIndex)}</span>{option}
                  </button>
                );
              })}
            </div>
            {submitted && answers[index] !== undefined && (
              <div className={clsx("mt-3 flex items-start gap-2 border-l-2 p-3 text-xs leading-5", answers[index] === question.correct ? "border-[#4c9b8e] bg-[#142520] text-[#b9ded7]" : "border-[#a55b43] bg-[#291915] text-[#e4beb0]")}>{answers[index] === question.correct ? <CheckCircle2 size={15} className="mt-0.5 shrink-0" /> : <XCircle size={15} className="mt-0.5 shrink-0" />}<span>{question.explanations[answers[index]]}</span></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end border-t border-[var(--line)] p-4">
        {submitted ? <button type="button" onClick={() => { setAnswers({}); setSubmitted(false); }} className="flex h-10 items-center gap-2 border border-[#3e494f] px-4 text-xs text-white"><RotateCcw size={15} /> もう一度</button> : <button type="button" disabled={Object.keys(answers).length !== questions.length} onClick={submit} className="h-10 bg-[var(--gold)] px-5 text-xs font-semibold text-[#171307] disabled:cursor-not-allowed disabled:opacity-35">採点する</button>}
      </div>
    </section>
  );
}
