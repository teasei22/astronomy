import { ExternalLink, GraduationCap } from "lucide-react";
import { availableLessons, levels } from "@/data/curriculum";
import { curriculumDomains, curriculumReferences } from "@/data/curriculum-standard";

export function CurriculumStandard() {
  return (
    <section className="mt-16 border-t border-[var(--line)] pt-12" aria-labelledby="standard-heading">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-xs font-semibold text-[var(--gold)]"><GraduationCap size={16} /> CURRICULUM STANDARD</p>
        <h2 id="standard-heading" className="mt-2 scroll-mt-24 text-2xl font-semibold text-white sm:text-3xl">ASTRAEAが「学部相当」と呼ぶ条件</h2>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">専門用語を掲載するだけでは学部相当としません。主要領域の説明、数式導出、定量問題、観測データ解析、論文評価、再現可能なCapstoneをすべて修了し、外部専門家のレビューを通過することを条件にします。</p>
      </div>

      <div className="mt-8 overflow-hidden border-y border-[var(--line)]">
        <div className="hidden grid-cols-[150px_1fr_240px_100px] gap-4 bg-[#101416] px-4 py-3 text-[10px] font-semibold text-[#7d898f] md:grid">
          <span>領域</span><span>到達内容</span><span>最低限の評価証拠</span><span>現在</span>
        </div>
        <div className="divide-y divide-[var(--line)]">
          {curriculumDomains.map((domain) => {
            const published = availableLessons.filter((lesson) => domain.mappedLevels.includes(Number(lesson.code[1]))).length;
            return (
              <div key={domain.title} className="grid gap-3 px-4 py-4 md:grid-cols-[150px_1fr_240px_100px] md:gap-4">
                <div>
                  <p className="text-[10px] text-[#718087] md:hidden">領域</p>
                  <p className="text-sm font-semibold text-white">{domain.title}</p>
                  <p className="mt-1 font-mono text-[10px] text-[var(--muted)]">Level {domain.mappedLevels.join(" / ")}</p>
                </div>
                <div><p className="text-[10px] text-[#718087] md:hidden">到達内容</p><p className="text-xs leading-5 text-[#c4cdca]">{domain.outcome}</p></div>
                <div><p className="text-[10px] text-[#718087] md:hidden">最低限の評価証拠</p><p className="text-xs leading-5 text-[var(--muted)]">{domain.minimumEvidence}</p></div>
                <div className="md:text-right"><span className={published ? "text-xs font-semibold text-[var(--cyan)]" : "text-xs text-[#6f7a80]"}>{published ? `関連公開 ${published}` : "設計中"}</span></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-white">公開・検証の進捗</h3>
        <p className="mt-2 text-xs leading-5 text-[var(--muted)]">計画教材数に対する公開比率です。学習者の習得率や、学部相当の達成率ではありません。</p>
        <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
          {levels.map((level) => {
            const published = availableLessons.filter((lesson) => Number(lesson.code[1]) === level.level).length;
            const percentage = Math.round(published / level.lessonCount * 100);
            return (
              <div key={level.level}>
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="flex items-center gap-2 font-semibold text-[#d7dddb]"><span className="size-2" style={{ backgroundColor: level.accent }} />Level {level.level} · {level.domain}</span>
                  <span className="font-mono text-[var(--muted)]">{published} / {level.lessonCount}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden bg-[#252c30]" role="meter" aria-label={`Level ${level.level} 公開進捗 ${percentage}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
                  <div className="h-full" style={{ width: `${percentage}%`, backgroundColor: level.accent }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 border-l-2 border-[#4b555a] pl-5">
        <p className="text-[10px] font-semibold text-[#7d898f]">REFERENCE CURRICULA · REVIEWED 2026-08-15</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          {curriculumReferences.map((reference) => <a key={reference.href} href={reference.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#b7dcd7] underline decoration-[#49615e] underline-offset-2 hover:text-white">{reference.title}<ExternalLink size={12} /></a>)}
        </div>
      </div>
    </section>
  );
}
