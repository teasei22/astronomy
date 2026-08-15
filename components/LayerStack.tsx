import { MarkdownBody } from "@/components/LessonSection";

export function LayerStack({ layers }: { layers: { title: string; markdown: string }[] }) {
  return (
    <section className="border-b border-[var(--line)] py-8 sm:py-10">
      <p className="text-[10px] font-semibold text-[var(--cyan)]">THREE LAYERS</p>
      <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">理解の深さを選ぶ</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Layer 1 だけでも次へ進めます。必要になったとき、同じ問いをより正確な言葉で見直してください。</p>
      <div className="mt-6 space-y-2">
        {layers.map((layer, index) => (
          <details key={layer.title} open={index === 0} className="group border border-[var(--line)] bg-[var(--panel)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-white sm:px-5">
              <span><span className="mr-3 font-mono text-[var(--cyan)]">0{index + 1}</span>{layer.title}</span>
              <span className="text-lg font-light text-[var(--muted)] group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-[var(--line)] px-4 py-5 sm:px-5"><MarkdownBody markdown={layer.markdown} /></div>
          </details>
        ))}
      </div>
    </section>
  );
}
