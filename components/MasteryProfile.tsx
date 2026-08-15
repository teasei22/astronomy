import { quizDimensionInfo, type QuizDimension } from "@/data/quizzes";
import type { DimensionScore } from "@/lib/progress";

const dimensions: QuizDimension[] = ["Recall", "Concept", "Reasoning", "Data"];

const reviewAdvice: Record<QuizDimension, string> = {
  Recall: "重要語を隠し、自分の言葉で一文ずつ説明してから確認します。",
  Concept: "直感レイヤーへ戻り、図を見ずに関係を描き直します。",
  Reasoning: "『よくある誤解』を読み、条件を一つ変えた場合を予測します。",
  Data: "例題またはインタラクティブ教材で、単位と軸を声に出して読みます。",
};

export function MasteryProfile({ scores, showAdvice = true }: { scores: Partial<Record<QuizDimension, DimensionScore>>; showAdvice?: boolean }) {
  const active = dimensions.filter((dimension) => (scores[dimension]?.total ?? 0) > 0);
  if (!active.length) return null;
  const weakest = active.reduce((lowest, dimension) => percentage(scores[dimension]) < percentage(scores[lowest]) ? dimension : lowest);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {active.map((dimension) => {
          const result = scores[dimension]!;
          const value = percentage(result);
          return (
            <div key={dimension}>
              <div className="mb-1.5 flex items-end justify-between gap-3 text-xs">
                <span className="font-semibold text-[#d9dfdd]">{quizDimensionInfo[dimension].label}</span>
                <span className="font-mono text-[var(--muted)]">{value}%</span>
              </div>
              <div className="h-2 overflow-hidden bg-[#293136]" role="meter" aria-label={`${quizDimensionInfo[dimension].label} ${value}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
                <div className="h-full bg-[var(--cyan)]" style={{ width: `${value}%` }} />
              </div>
              <p className="mt-1.5 text-[10px] leading-4 text-[#7f8b90]">{quizDimensionInfo[dimension].description}</p>
            </div>
          );
        })}
      </div>
      {showAdvice && (
        <div className="mt-4 border-l-2 border-[var(--gold)] bg-[#1b1912] px-4 py-3">
          <p className="text-[10px] font-semibold text-[var(--gold)]">NEXT REVIEW · {quizDimensionInfo[weakest].label}</p>
          <p className="mt-1 text-xs leading-5 text-[#d7cfb5]">{reviewAdvice[weakest]}</p>
        </div>
      )}
    </div>
  );
}

function percentage(result: DimensionScore | undefined) {
  return result?.total ? Math.round(result.score / result.total * 100) : 0;
}
