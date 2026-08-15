"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  CheckCircle2,
  Clock3,
  FlaskConical,
  Orbit,
  Ruler,
} from "lucide-react";
import { MasteryProfile } from "@/components/MasteryProfile";
import { availableLessons, levels } from "@/data/curriculum";
import { type QuizDimension, quizDimensionInfo } from "@/data/quizzes";
import { type DimensionScore, type QuizAttempt, useLearnerState } from "@/lib/progress";

const dimensions: QuizDimension[] = ["Recall", "Concept", "Reasoning", "Data"];
const reviewRoutes: Record<QuizDimension, { href: string; label: string }> = {
  Recall: { href: "/glossary", label: "用語集で定義を再生する" },
  Concept: { href: "/learn/cosmic-address", label: "直感レイヤーで関係を描き直す" },
  Reasoning: { href: "/learn/how-astronomy-knows", label: "証拠から推論する練習へ" },
  Data: { href: "/explore/scale", label: "スケール実験で数値を読む" },
};

export function Dashboard() {
  const learner = useLearnerState();
  const completedCount = learner.completed.length;
  const progress = Math.round((completedCount / availableLessons.length) * 100);
  const lastLesson = availableLessons.find((lesson) => lesson.slug === learner.lastVisited) ?? availableLessons[0];
  const lastLessonLevel = Number(lastLesson.code[1]);
  const lastLevel = levels.find((level) => level.level === lastLessonLevel) ?? levels[0];
  const profile = aggregateLatestAttempts(learner.quizAttempts);
  const weakestDimension = getWeakestDimension(profile);
  const review = weakestDimension ? reviewRoutes[weakestDimension] : null;

  return (
    <div>
      <section className="relative min-h-[390px] overflow-hidden border-b border-[var(--line)] sm:min-h-[430px]">
        <Image
          src="/images/cosmic-journey.png"
          alt="地球、太陽系、天の川、銀河、宇宙の網状構造へとスケールが広がる科学イメージ"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, calc(100vw - 256px)"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex min-h-[390px] max-w-7xl flex-col justify-center px-5 py-12 sm:min-h-[430px] sm:px-8 lg:px-12">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold text-[var(--cyan)]">
            <span className="h-px w-8 bg-[var(--cyan)]" />
            LEVEL 0 · YOUR COSMIC ADDRESS
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">ASTRAEA</h1>
          <p className="mt-3 max-w-xl text-xl font-medium text-white sm:text-2xl">宇宙を、証拠から学ぶ。</p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#c0c8c9] sm:text-base">
            地球から観測可能な宇宙へ。直感、観測、物理、データを一つの道筋でつなぎ、大学天文学の入口まで進みます。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/learn/${lastLesson.slug}`} className="inline-flex h-11 items-center gap-2 bg-[var(--cyan)] px-5 text-sm font-semibold text-[#06110f] hover:bg-[#83e6db]">
              {completedCount ? "続きから学ぶ" : "最初のレッスンへ"} <ArrowRight size={17} />
            </Link>
            <Link href="/roadmap" className="inline-flex h-11 items-center gap-2 border border-[#687378] bg-black/30 px-5 text-sm font-semibold text-white hover:bg-black/60">
              <Orbit size={17} /> 全体を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[#0f1315]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[var(--line)] px-5 sm:grid-cols-4 sm:px-8 lg:px-12">
          <Metric icon={CheckCircle2} label="完了" value={`${completedCount} lessons`} />
          <Metric icon={BarChart3} label="公開教材進捗" value={`${progress}%`} />
          <Metric icon={Bookmark} label="ブックマーク" value={`${learner.bookmarks.length}`} />
          <Metric icon={Clock3} label="次の学習" value={`${lastLesson.duration} min`} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section aria-labelledby="continue-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--gold)]">CURRENT PATH</p>
              <h2 id="continue-heading" className="mt-1 text-2xl font-semibold text-white">次に進む場所</h2>
            </div>
            <Link href="/roadmap" className="hidden text-sm text-[var(--muted)] hover:text-white sm:block">ロードマップを開く</Link>
          </div>
          <Link href={`/learn/${lastLesson.slug}`} className="group grid border border-[var(--line)] bg-[var(--panel)] hover:border-[#4a575c] md:grid-cols-[160px_1fr_auto]">
            <div className="flex min-h-32 flex-col justify-between bg-[#192320] p-5">
              <span className="text-xs font-bold text-[var(--cyan)]">{lastLesson.code}</span>
              <Orbit size={36} strokeWidth={1.2} className="text-[#5fb3aa]" />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs text-[var(--muted)]">Level {lastLevel.level} · {lastLevel.title}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{lastLesson.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{lastLevel.description}</p>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--line)] px-5 py-4 md:block md:border-l md:border-t-0 md:p-6">
              <span className="text-xs text-[var(--muted)]">約 {lastLesson.duration} 分</span>
              <ArrowRight className="text-[var(--cyan)] transition-transform group-hover:translate-x-1 md:mt-9" size={22} />
            </div>
          </Link>
        </section>

        <section className="mt-14 border-y border-[var(--line)] py-8" aria-labelledby="profile-heading">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div>
              <p className="text-xs font-semibold text-[var(--cyan)]">LEARNING DIAGNOSIS</p>
              <h2 id="profile-heading" className="mt-1 text-2xl font-semibold text-white">理解プロフィール</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">各レッスンの最新判定から、知識の量ではなく使い方を4軸で見ます。</p>
              <div className="mt-6 max-w-2xl">
                {weakestDimension ? <MasteryProfile scores={profile} showAdvice={false} /> : <p className="border-l-2 border-[#3d494e] px-4 py-3 text-sm text-[var(--muted)]">最初の修了判定を受けると、ここに用語・概念・推論・データの強弱が表示されます。</p>}
              </div>
            </div>
            <div className="border-l-2 border-[var(--gold)] bg-[#17160f] px-5 py-4">
              <p className="text-[10px] font-semibold text-[var(--gold)]">RECOMMENDED REVIEW</p>
              {review && weakestDimension ? (
                <>
                  <p className="mt-2 text-sm font-semibold text-white">{quizDimensionInfo[weakestDimension].label}を補強</p>
                  <Link href={review.href} className="mt-3 inline-flex items-center gap-2 text-xs text-[#ead387] hover:text-white">{review.label} <ArrowRight size={14} /></Link>
                </>
              ) : (
                <Link href="/learn/cosmic-address" className="mt-3 inline-flex items-center gap-2 text-sm text-[#ead387] hover:text-white">最初の体験へ <ArrowRight size={14} /></Link>
              )}
            </div>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="tools-heading">
          <p className="text-xs font-semibold text-[var(--coral)]">LEARN BY DOING</p>
          <h2 id="tools-heading" className="mt-1 text-2xl font-semibold text-white">読むだけで終わらせない</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <ToolLink href="/explore/scale" icon={Ruler} eyebrow="INTERACTIVE" title="宇宙スケール実験" description="10³ m から 10²⁶ m までを、対数のものさしで移動する。" color="#64d8cb" />
            <ToolLink href="/explore/timeline" icon={Orbit} eyebrow="TIMELINE" title="138億年を歩く" description="宇宙史を実時間と「1年間に圧縮」した暦で比較する。" color="#f6c85f" />
            <ToolLink href="/lab" icon={FlaskConical} eyebrow="PYTHON LAB" title="数値を宇宙の意味へ" description="AU と光年の変換から、公開データ解析へ進む。" color="#ef8354" />
          </div>
        </section>

        <section className="mt-14" aria-labelledby="levels-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--cyan)]">8 LEVELS · VALIDATED IN STAGES</p>
              <h2 id="levels-heading" className="mt-1 text-2xl font-semibold text-white">学びの全景</h2>
            </div>
            <p className="hidden max-w-md text-right text-sm leading-6 text-[var(--muted)] lg:block">数学と物理は、必要になる天文学の問いから接続します。</p>
          </div>
          <div className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {levels.map((level) => {
              const published = availableLessons.filter((lesson) => Number(lesson.code[1]) === level.level).length;
              return <Link key={level.level} href={`/roadmap#level-${level.level}`} className="group grid gap-3 py-5 hover:bg-[#111619] sm:grid-cols-[100px_1fr_auto] sm:items-center sm:px-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center border text-xs font-bold" style={{ borderColor: level.accent, color: level.accent }}>{level.level}</span>
                  <span className="text-[10px] text-[#6f7a80] sm:hidden">LEVEL</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{level.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{level.description}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                  {published ? `公開 ${published}` : "設計中"} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>;
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function aggregateLatestAttempts(attempts: QuizAttempt[]) {
  const latestByLesson = new Map<string, QuizAttempt>();
  attempts.forEach((attempt) => latestByLesson.set(attempt.lessonSlug, attempt));
  return [...latestByLesson.values()].reduce<Partial<Record<QuizDimension, DimensionScore>>>((profile, attempt) => {
    dimensions.forEach((dimension) => {
      const result = attempt.dimensionScores?.[dimension];
      if (!result) return;
      const current = profile[dimension] ?? { score: 0, total: 0 };
      profile[dimension] = { score: current.score + result.score, total: current.total + result.total };
    });
    return profile;
  }, {});
}

function getWeakestDimension(profile: Partial<Record<QuizDimension, DimensionScore>>) {
  const active = dimensions.filter((dimension) => (profile[dimension]?.total ?? 0) > 0);
  return active.length ? active.reduce((weakest, dimension) => scorePercent(profile[dimension]) < scorePercent(profile[weakest]) ? dimension : weakest) : null;
}

function scorePercent(result: DimensionScore | undefined) {
  return result?.total ? result.score / result.total : 0;
}

function Metric({ icon: Icon, label, value }: { icon: typeof CheckCircle2; label: string; value: string }) {
  return (
    <div className="flex min-h-24 items-center gap-3 px-3 py-4 first:pl-0 sm:px-5">
      <Icon size={18} className="shrink-0 text-[#718087]" />
      <div className="min-w-0">
        <p className="text-[10px] text-[#78858b]">{label}</p>
        <p className="mt-1 truncate text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function ToolLink({ href, icon: Icon, eyebrow, title, description, color }: { href: string; icon: typeof Ruler; eyebrow: string; title: string; description: string; color: string }) {
  return (
    <Link href={href} className="group min-h-48 border border-[var(--line)] bg-[var(--panel)] p-5 hover:border-[#4a565c]">
      <div className="flex items-start justify-between">
        <Icon size={27} strokeWidth={1.4} style={{ color }} />
        <ArrowRight size={18} className="text-[#657178] transition-transform group-hover:translate-x-1 group-hover:text-white" />
      </div>
      <p className="mt-8 text-[10px] font-semibold" style={{ color }}>{eyebrow}</p>
      <h3 className="mt-1 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
    </Link>
  );
}
