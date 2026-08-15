import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export function MarkdownBody({ markdown }: { markdown: string }) {
  return <div className="prose-lesson"><ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{markdown}</ReactMarkdown></div>;
}

export function LessonSection({ title, markdown, index, collapsible = false }: { title: string; markdown: string; index: number; collapsible?: boolean }) {
  if (collapsible) {
    return (
      <details className="group border-b border-[var(--line)] bg-[#0d1113]">
        <summary className="flex cursor-pointer list-none items-center gap-3 py-5 text-left">
          <span className="font-mono text-[10px] text-[#657178]">{String(index + 1).padStart(2, "0")}</span>
          <span className="min-w-0 flex-1 text-sm font-semibold text-[#d5dcda] sm:text-base">{title}</span>
          <span className="border border-[#394349] px-2 py-1 text-[9px] text-[var(--muted)]">深掘り</span>
          <span className="text-lg font-light text-[var(--muted)] transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="pb-8 pl-6 sm:pl-7"><MarkdownBody markdown={markdown} /></div>
      </details>
    );
  }

  return (
    <section className="border-b border-[var(--line)] py-8 last:border-0 sm:py-10">
      <div className="mb-5 flex items-start gap-3">
        <span className="mt-1 font-mono text-[10px] text-[#657178]">{String(index + 1).padStart(2, "0")}</span>
        <h2 className="text-xl font-semibold leading-8 text-white sm:text-2xl">{title}</h2>
      </div>
      <MarkdownBody markdown={markdown} />
    </section>
  );
}
