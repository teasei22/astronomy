import Link from "next/link";
import { ArrowRight, Calculator, Clock3 } from "lucide-react";
import { skillBridges } from "@/data/skill-bridges";

export function SkillBridge({ slug }: { slug: string }) {
  const bridge = skillBridges[slug];
  if (!bridge) return null;

  return (
    <section className="mt-4 border border-[#554d33] bg-[#17150f]">
      <div className="flex items-start gap-3 p-5 sm:p-6">
        <Calculator size={19} className="mt-0.5 shrink-0 text-[var(--gold)]" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold text-[var(--gold)]">JUST-IN-TIME MATH</p>
          <h2 className="mt-1 text-base font-semibold text-white">この先で使う道具: {bridge.title}</h2>
          <p className="mt-2 text-xs leading-5 text-[#aaa48f]">{bridge.reason}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {bridge.skills.map((skill) => <li key={skill} className="border border-[#49432f] px-2.5 py-1.5 text-[10px] text-[#d7cfb5]">{skill}</li>)}
          </ul>
        </div>
      </div>
      <details className="group border-t border-[#393520]">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-xs font-semibold text-[var(--gold)] sm:px-6">
          <Clock3 size={15} /> {bridge.duration}分で復習する
          <span className="ml-auto text-lg font-light transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="grid gap-px border-t border-[#393520] bg-[#393520] sm:grid-cols-3">
          {bridge.refreshers.map((item) => (
            <div key={item.label} className="bg-[#12130f] p-4">
              <p className="text-xs font-semibold text-white">{item.label}</p>
              <p className="mt-2 text-xs leading-5 text-[#aaa995]">{item.explanation}</p>
              <p className="mt-3 border-l-2 border-[#69603b] pl-3 text-[10px] leading-4 text-[#d8c989]">確認: {item.check}</p>
            </div>
          ))}
        </div>
        {bridge.related && <Link href={bridge.related.href} className="flex items-center justify-end gap-2 border-t border-[#393520] px-5 py-4 text-xs text-[#e3cf83] hover:text-white sm:px-6">{bridge.related.label} <ArrowRight size={14} /></Link>}
      </details>
    </section>
  );
}
