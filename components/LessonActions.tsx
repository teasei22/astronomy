"use client";

import { Bookmark, Check, Save } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { progressActions, useLearnerState } from "@/lib/progress";

export function LessonActions({ slug }: { slug: string }) {
  const learner = useLearnerState();
  const [draft, setDraft] = useState<string | null>(null);
  const complete = learner.completed.includes(slug);
  const bookmarked = learner.bookmarks.includes(slug);
  const note = draft ?? learner.notes[slug] ?? "";

  useEffect(() => {
    progressActions.visit(slug);
  }, [slug]);

  return (
    <aside className="space-y-3 lg:sticky lg:top-24">
      <button type="button" onClick={() => progressActions.toggleComplete(slug)} className={clsx("flex h-11 w-full items-center justify-center gap-2 border text-sm font-semibold", complete ? "border-[#438378] bg-[#21473f] text-[#a6e5db]" : "border-[var(--cyan)] bg-[var(--cyan)] text-[#07110f] hover:bg-[#83e6db]")}> <Check size={17} /> {complete ? "完了済み" : "レッスンを完了"}</button>
      <button type="button" onClick={() => progressActions.toggleBookmark(slug)} className={clsx("flex h-10 w-full items-center justify-center gap-2 border text-sm", bookmarked ? "border-[#806b37] bg-[#2a2418] text-[#f0d28a]" : "border-[var(--line)] text-[var(--muted)] hover:text-white")}><Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} /> {bookmarked ? "保存済み" : "ブックマーク"}</button>
      <div className="border border-[var(--line)] bg-[var(--panel)] p-4">
        <label htmlFor="lesson-note" className="text-xs font-semibold text-white">自分のノート</label>
        <textarea id="lesson-note" value={note} onChange={(event) => setDraft(event.target.value)} rows={6} placeholder="疑問、言い換え、あとで確認すること" className="mt-3 w-full resize-y border border-[#333d42] bg-[#0b0e10] p-3 text-xs leading-6 text-white outline-none placeholder:text-[#5f696e] focus:border-[var(--cyan)]" />
        <button type="button" onClick={() => { progressActions.saveNote(slug, note); setDraft(null); }} className="mt-2 flex h-9 w-full items-center justify-center gap-2 border border-[#3c474d] text-xs text-[#cad2d0] hover:border-[#657178] hover:text-white"><Save size={14} /> ノートを保存</button>
      </div>
      <p className="px-1 text-[10px] leading-5 text-[#667278]">進捗とノートはこのブラウザ内だけに保存されます。</p>
    </aside>
  );
}
