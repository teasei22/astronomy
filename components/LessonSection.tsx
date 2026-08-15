import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownBody({ markdown }: { markdown: string }) {
  return <div className="prose-lesson"><ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown></div>;
}

export function LessonSection({ title, markdown, index }: { title: string; markdown: string; index: number }) {
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
