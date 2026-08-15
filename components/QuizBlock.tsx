"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { MasteryProfile } from "@/components/MasteryProfile";
import { type QuizDimension, type QuizQuestion, quizzes } from "@/data/quizzes";
import type { DimensionScore } from "@/lib/progress";
import { MASTERY_THRESHOLD, progressActions } from "@/lib/progress";

type Answer = number | string;

function isCorrect(question: QuizQuestion, answer: Answer | undefined) {
  if (question.kind === "numeric") {
    const value = typeof answer === "string" ? Number(answer) : answer;
    return typeof value === "number" && Number.isFinite(value) && Math.abs(value - question.answer) <= question.tolerance;
  }
  return answer === question.correct;
}

export function QuizBlock({ slug }: { slug: string }) {
  const questions = quizzes[slug] ?? [];
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  if (!questions.length) return null;
  const score = questions.reduce((sum, question, index) => sum + (isCorrect(question, answers[index]) ? 1 : 0), 0);
  const passed = score / questions.length >= MASTERY_THRESHOLD;
  const allAnswered = questions.every((_, index) => answers[index] !== undefined && answers[index] !== "");
  const dimensionScores = questions.reduce<Partial<Record<QuizDimension, DimensionScore>>>((results, question, index) => {
    const current = results[question.type] ?? { score: 0, total: 0 };
    results[question.type] = { score: current.score + (isCorrect(question, answers[index]) ? 1 : 0), total: current.total + 1 };
    return results;
  }, {});

  function submit() {
    setSubmitted(true);
    const reviewTopicIds = [...new Set(questions.filter((question, index) => !isCorrect(question, answers[index])).flatMap((question) => question.topicIds))];
    progressActions.saveQuiz({ lessonSlug: slug, score, total: questions.length, topicIds: [...new Set(questions.flatMap((question) => question.topicIds))], dimensionScores, reviewTopicIds, attemptedAt: new Date().toISOString() });
  }

  return (
    <section className="my-10 border border-[#3d494e] bg-[#101416]">
      <div className="border-b border-[var(--line)] p-5 sm:p-6">
        <p className="text-[10px] font-semibold text-[var(--gold)]">MASTERY CHECK · PASS {MASTERY_THRESHOLD * 100}%</p>
        <div className="mt-1 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">修了判定</h2>
          {submitted && <span className={clsx("font-mono text-sm", passed ? "text-[var(--cyan)]" : "text-[var(--coral)]")}>{score} / {questions.length}</span>}
        </div>
        <p className="mt-2 text-xs leading-5 text-[var(--muted)]">用語の再生だけでなく、概念・推論・数値計算を確認します。合格後にレッスンを完了できます。</p>
      </div>
      <div className="divide-y divide-[var(--line)]">
        {questions.map((question, index) => (
          <div key={question.prompt} className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="border border-[#556168] px-2 py-1 text-[10px] text-[var(--muted)]">{question.type}</span>
              <p className="text-sm font-semibold leading-6 text-white">{question.prompt}</p>
            </div>
            {question.kind === "numeric" ? (
              <div className="mt-4">
                <label className="block text-xs text-[var(--muted)]" htmlFor={`${slug}-numeric-${index}`}>数値を入力{question.unit ? `（${question.unit}）` : ""}</label>
                <div className="mt-2 flex max-w-sm border border-[#3d484e] bg-[#0c1012] focus-within:border-[var(--cyan)]">
                  <input
                    id={`${slug}-numeric-${index}`}
                    type="number"
                    step="any"
                    disabled={submitted}
                    value={typeof answers[index] === "string" ? answers[index] : ""}
                    onChange={(event) => setAnswers((current) => ({ ...current, [index]: event.target.value }))}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-white outline-none"
                  />
                  {question.unit && <span className="grid min-w-16 place-items-center border-l border-[#3d484e] px-3 text-xs text-[var(--muted)]">{question.unit}</span>}
                </div>
              </div>
            ) : (
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
            )}
            {submitted && answers[index] !== undefined && (
              <div className={clsx("mt-3 flex items-start gap-2 border-l-2 p-3 text-xs leading-5", isCorrect(question, answers[index]) ? "border-[#4c9b8e] bg-[#142520] text-[#b9ded7]" : "border-[#a55b43] bg-[#291915] text-[#e4beb0]")}>{isCorrect(question, answers[index]) ? <CheckCircle2 size={15} className="mt-0.5 shrink-0" /> : <XCircle size={15} className="mt-0.5 shrink-0" />}<span>{question.kind === "numeric" ? question.solution : question.explanations[Number(answers[index])]}</span></div>
            )}
          </div>
        ))}
      </div>
      {submitted && (
        <div className="border-t border-[var(--line)] bg-[#0d1113] p-5 sm:p-6">
          <p className="mb-4 text-[10px] font-semibold text-[var(--cyan)]">UNDERSTANDING PROFILE</p>
          <MasteryProfile scores={dimensionScores} />
        </div>
      )}
      {submitted && <div className={clsx("border-t border-[var(--line)] px-5 py-4 text-sm font-semibold", passed ? "bg-[#142520] text-[#a6e5db]" : "bg-[#291915] text-[#e4beb0]")} aria-live="polite">{passed ? "合格です。レッスンを完了できます。" : "未合格です。弱い軸の復習提案を確認して再挑戦してください。"}</div>}
      <div className="flex justify-end border-t border-[var(--line)] p-4">
        {submitted ? <button type="button" onClick={() => { setAnswers({}); setSubmitted(false); }} className="flex h-10 items-center gap-2 border border-[#3e494f] px-4 text-xs text-white"><RotateCcw size={15} /> もう一度</button> : <button type="button" disabled={!allAnswered} onClick={submit} className="h-10 bg-[var(--gold)] px-5 text-xs font-semibold text-[#171307] disabled:cursor-not-allowed disabled:opacity-35">採点する</button>}
      </div>
    </section>
  );
}
